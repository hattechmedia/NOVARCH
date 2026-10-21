import mongoose, { Schema } from 'mongoose';
import { createHash } from 'crypto';
import type { Options } from 'express-rate-limit';
import { connectDatabase } from '../config/database.js';

const schema = new Schema({ _id: String, hits: { type: Number, default: 0 }, expiresAt: { type: Date, index: { expires: 0 } } });
const Counter = mongoose.models.SecurityCounter || mongoose.model('SecurityCounter', schema);

/** Atomic counters shared by API instances. Expired buckets cannot extend a limit. */
export class MongoRateStore {
  localKeys = false;
  readonly prefix: string;
  private windowMs = 900000;
  constructor(private namespace: string) { this.prefix = `${namespace}:`; }
  init(options: Options) { this.windowMs = options.windowMs; }
  private id(key: string) { return `${this.namespace}:${Math.floor(Date.now() / this.windowMs)}:${createHash('sha256').update(key).digest('hex')}`; }
  async increment(key: string) {
    await connectDatabase();
    const resetTime = new Date((Math.floor(Date.now() / this.windowMs) + 1) * this.windowMs);
    const id = this.id(key);
    const update = { $inc: { hits: 1 }, $setOnInsert: { expiresAt: resetTime } };
    let result;
    try { result = await Counter.findOneAndUpdate({ _id: id }, update, { upsert: true, new: true }).lean(); }
    catch (error) {
      if ((error as { code?: number }).code !== 11000) throw error;
      result = await Counter.findOneAndUpdate({ _id: id }, { $inc: { hits: 1 } }, { new: true }).lean();
    }
    return { totalHits: Number((result as { hits?: number } | null)?.hits || 1), resetTime };
  }
  async decrement(key: string) { await Counter.updateOne({ _id: this.id(key), hits: { $gt: 0 } }, { $inc: { hits: -1 } }); }
  async resetKey(key: string) { await Counter.deleteOne({ _id: this.id(key) }); }
}
