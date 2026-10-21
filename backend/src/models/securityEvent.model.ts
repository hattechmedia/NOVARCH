import mongoose, { Schema } from 'mongoose';
const schema = new Schema({
  actor: String, action: String, resource: String, resourceId: String,
  status: String, timestamp: { type: Date, default: Date.now },
  metadata: Schema.Types.Mixed,
});
export const SecurityEventModel = mongoose.models.SecurityEvent || mongoose.model('SecurityEvent', schema);
