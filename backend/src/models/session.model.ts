import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  tokenId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  credentialVersion: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});
export const SessionModel = mongoose.models.AdminSession || mongoose.model('AdminSession', schema);
