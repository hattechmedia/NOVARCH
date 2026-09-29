import mongoose, { Schema, Document } from 'mongoose';
import { CommunityMember, CommunityStatus } from '../types/community.types.js';

export interface CommunityDocument extends Document, Omit<CommunityMember, 'id'> {
  _id: mongoose.Types.ObjectId;
}

const CommunitySchema = new Schema<CommunityDocument>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    contactNumber: { type: String, trim: true },
    countryCode: { type: String, trim: true },
    organization: { type: String, trim: true },
    role: { type: String, trim: true },
    interests: [{ type: String, trim: true }],
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Resolved'],
      default: 'New',
    },
    source: {
      type: String,
      enum: ['Website Form'],
      default: 'Website Form',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

CommunitySchema.index({ status: 1 });
CommunitySchema.index({ createdAt: -1 });
CommunitySchema.index({ email: 1 });
CommunitySchema.index({ status: 1, createdAt: -1 });

export const CommunityModel =
  mongoose.models.Community || mongoose.model<CommunityDocument>('Community', CommunitySchema);
