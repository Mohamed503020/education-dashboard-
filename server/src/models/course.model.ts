import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

export enum CourseStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum CourseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum CourseStage {
  PRIMARY = 'primary',         // ابتدائي
  PREPARATORY = 'preparatory', // اعدادي
  SECONDARY = 'secondary',    // ثانوي
}

@Schema({ timestamps: true })
export class Course {
  _id?: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  shortDescription?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  teacher: Types.ObjectId;

  @Prop()
  thumbnail?: string;

  @Prop({ enum: CourseStatus, default: CourseStatus.DRAFT })
  status: CourseStatus;

  @Prop({ enum: CourseLevel, default: CourseLevel.BEGINNER })
  level: CourseLevel;

  @Prop()
  category?: string;

  @Prop({ enum: CourseStage })
  stage?: CourseStage;

  @Prop()
  grade?: number; // e.g. 1-6 primary, 1-3 preparatory, 1-3 secondary

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: 0 })
  price: number;

  @Prop({ default: true })
  isFree: boolean;

  @Prop({ default: 0 })
  duration: number; // in minutes

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  enrolledStudents: Types.ObjectId[];

  @Prop({ default: 0 })
  enrollmentCount: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Material' }], default: [] })
  materials: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'LiveStream' }], default: [] })
  liveStreams: Types.ObjectId[];

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  ratingCount: number;

  @Prop()
  startDate?: Date;

  @Prop()
  endDate?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

// Indexes
CourseSchema.index({ teacher: 1 });
CourseSchema.index({ status: 1 });
CourseSchema.index({ category: 1 });
CourseSchema.index({ stage: 1 });
CourseSchema.index({ title: 'text', description: 'text' });
