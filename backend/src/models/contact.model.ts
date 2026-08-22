import mongoose, { Schema, Document } from 'mongoose';
import { ContactInquiry, LeadStatus, SubmissionType } from '../types/contact.types.js';

export interface ContactDocument extends Document, Omit<ContactInquiry, 'id'> {
  _id: mongoose.Types.ObjectId;
}

const ContactSchema = new Schema<ContactDocument>(
  {
    submissionType: {
      type: String,
      enum: ['service_lead', 'message'],
      default: 'message',
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    countryCode: { type: String, trim: true },
    company: { type: String, trim: true },
    planName: { type: String, trim: true },
    planTier: { type: String, enum: ['Basic', 'Premium'] },
    planPrice: { type: String, trim: true },
    performances: [{ type: String, trim: true }],
    news: { type: String, trim: true },
    serviceType: { type: String, default: 'General Inquiry' },
    preferredService: { type: String },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Proposal Sent', 'Closed'],
      default: 'New',
    },
    estimatedValue: { type: Number, default: 15000 },
    source: {
      type: String,
      enum: ['Website Form', 'Service Package', 'Direct API', 'Referral'],
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

ContactSchema.index({ status: 1 });
ContactSchema.index({ submissionType: 1 });
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ email: 1 });
// Compound indexes for combined status/submissionType filtering and createdAt descending sorting
ContactSchema.index({ status: 1, createdAt: -1 });
ContactSchema.index({ submissionType: 1, createdAt: -1 });

export const ContactModel =
  mongoose.models.Contact || mongoose.model<ContactDocument>('Contact', ContactSchema);
