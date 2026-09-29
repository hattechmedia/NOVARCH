import mongoose, { Schema, Document } from 'mongoose';
import { Project, ProjectCategory, ProjectStatus } from '../types/project.types.js';

export interface ProjectDocument extends Document, Omit<Project, 'id'> {
  _id: mongoose.Types.ObjectId;
}

const ProjectSchema = new Schema<ProjectDocument>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['venture', 'client', 'lab', 'internal', 'case-study'],
      default: 'venture',
      index: true,
    },
    period: { type: String, required: true, trim: true },
    summary: { type: String, trim: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      index: true,
    },
    isSample: { type: Boolean, default: false },
    image: { type: String, trim: true },
    liveUrl: { type: String, trim: true },
    websiteUrl: { type: String, trim: true },
    githubUrl: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    techStack: [{ type: String, trim: true }],
    metrics: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    links: [
      {
        label: { type: String, required: true },
        url: { type: String, required: true },
        isExternal: { type: Boolean, default: true },
      },
    ],
    featured: { type: Boolean, default: false, index: true },
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

ProjectSchema.index({ status: 1, category: 1 });
ProjectSchema.index({ status: 1, createdAt: -1 });

export const ProjectModel =
  mongoose.models.Project || mongoose.model<ProjectDocument>('Project', ProjectSchema);
