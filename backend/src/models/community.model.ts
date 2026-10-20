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
    country: { type: String, trim: true },
    city: { type: String, trim: true },
    contactNumber: { type: String, trim: true },
    countryCode: { type: String, trim: true },
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
      type: Schema.Types.Mixed,
    },
    // Consent fields (all optional; absence = opted-out; server sets timestamps)
    marketingConsent: { type: Boolean, default: false },
    marketingConsentAt: { type: Date, default: null },
    marketingConsentVersion: { type: String, trim: true },
    marketingConsentWithdrawnAt: { type: Date, default: null },
    photoConsent: { type: Boolean, default: false },
    photoConsentAt: { type: Date, default: null },
    photoConsentVersion: { type: String, trim: true },
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
CommunitySchema.index({ marketingConsent: 1, applicationType: 1 });

export const CommunityModel =
  mongoose.models.Community || mongoose.model<CommunityDocument>('Community', CommunitySchema);
