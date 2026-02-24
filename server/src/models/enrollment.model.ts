import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EnrollmentDocument = Enrollment & Document;

export enum EnrollmentStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  DROPPED = 'dropped',
  SUSPENDED = 'suspended',
}

@Schema({ timestamps: true })
export class Enrollment {
  _id?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  student: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ enum: EnrollmentStatus, default: EnrollmentStatus.ACTIVE })
  status: EnrollmentStatus;

  @Prop()
  enrolledAt: Date;

  @Prop()
  completedAt?: Date;

  @Prop({ default: 0 })
  progress: number; // percentage

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Material' }], default: [] })
  completedMaterials: Types.ObjectId[];

  @Prop({ default: 0 })
  totalTimeSpent: number; // in minutes

  @Prop()
  lastAccessedAt?: Date;

  @Prop()
  certificateUrl?: string;

  @Prop()
  finalGrade?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);

// Compound index to ensure unique enrollment
EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
EnrollmentSchema.index({ status: 1 });
