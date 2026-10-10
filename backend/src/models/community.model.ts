import mongoose, { Schema, Document } from 'mongoose';
import { CommunityMember } from '../types/community.types.js';

export interface CommunityDocument extends Document, Omit<CommunityMember, 'id'> {
  _id: mongoose.Types.ObjectId;
}

const CommunitySchema = new Schema<CommunityDocument>(
  {
    applicationType: {
      type: String,
      enum: ['community', 'winter-arc'],
      default: 'community',
    },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
<<<<<<< HEAD
    city: { type: String, trim: true },
    contactNumber: { type: String, trim: true },
    countryCode: { type: String, trim: true },
=======
    country: { type: String, trim: true },
>>>>>>> 0012bb70fb6e204fdc1908085e0044bf69df976b
    organization: { type: String, trim: true },
    role: { type: String, trim: true },
    whatYouDo: { type: String, trim: true },
    whatCanYouOffer: { type: String, trim: true },
    whatAreYouLookingFor: { type: String, trim: true },
    linkedinUrl: { type: String, trim: true },
    portfolioUrl: { type: String, trim: true },
    proposedGuest: { type: String, trim: true },
    interests: [{ type: String, trim: true }],
    message: { type: String, trim: true },
    referral: { type: String, trim: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Resolved', 'Pending', 'Reviewing', 'Selected', 'Rejected'],
      default: 'New',
    },
    source: {
      type: String,
      default: 'Website Form',
    },
    referral: {
      utmSource: { type: String, trim: true },
      utmMedium: { type: String, trim: true },
      utmCampaign: { type: String, trim: true },
      utmContent: { type: String, trim: true },
      referrer: { type: String, trim: true },
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
CommunitySchema.index({ applicationType: 1 });
CommunitySchema.index({ createdAt: -1 });
CommunitySchema.index({ email: 1 });
CommunitySchema.index({ applicationType: 1, status: 1, createdAt: -1 });

export const CommunityModel =
  mongoose.models.Community || mongoose.model<CommunityDocument>('Community', CommunitySchema);
