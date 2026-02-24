import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MaterialDocument = Material & Document;

export enum MaterialType {
  VIDEO = 'video',
  PDF = 'pdf',
  ASSIGNMENT = 'assignment',
  DOCUMENT = 'document',
  LINK = 'link',
}

export enum AssignmentStatus {
  NOT_SUBMITTED = 'not_submitted',
  SUBMITTED = 'submitted',
  GRADED = 'graded',
  LATE = 'late',
}

@Schema({ timestamps: true })
export class Material {
  _id?: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ enum: MaterialType, required: true })
  type: MaterialType;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  uploadedBy: Types.ObjectId;

  @Prop()
  fileUrl?: string;

  @Prop()
  fileName?: string;

  @Prop()
  fileSize?: number; // in bytes

  @Prop()
  mimeType?: string;

  @Prop()
  duration?: number; // for videos, in seconds

  @Prop()
  thumbnail?: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isPublished: boolean;

  // Assignment specific fields
  @Prop()
  dueDate?: Date;

  @Prop()
  maxScore?: number;

  @Prop({ type: [{ 
    student: { type: Types.ObjectId, ref: 'User' },
    fileUrl: String,
    fileName: String,
    submittedAt: Date,
    score: Number,
    feedback: String,
    status: { type: String, enum: Object.values(AssignmentStatus) }
  }], default: [] })
  submissions?: Array<{
    student: Types.ObjectId;
    fileUrl: string;
    fileName: string;
    submittedAt: Date;
    score?: number;
    feedback?: string;
    status: AssignmentStatus;
  }>;

  // For tracking views/progress
  @Prop({ type: [{ 
    student: { type: Types.ObjectId, ref: 'User' },
    completedAt: Date,
    progress: Number
  }], default: [] })
  completions?: Array<{
    student: Types.ObjectId;
    completedAt: Date;
    progress: number; // percentage
  }>;

  createdAt?: Date;
  updatedAt?: Date;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);

// Indexes
MaterialSchema.index({ course: 1 });
MaterialSchema.index({ type: 1 });
MaterialSchema.index({ uploadedBy: 1 });
