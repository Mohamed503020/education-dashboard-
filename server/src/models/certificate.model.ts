import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CertificateDocument = Certificate & Document;

@Schema({ timestamps: true })
export class Certificate {
  _id?: Types.ObjectId;

  @Prop({ required: true, unique: true })
  certificateNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  student: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Exam' })
  exam?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ExamAttempt' })
  examAttempt?: Types.ObjectId;

  @Prop({ required: true })
  studentName: string;

  @Prop({ required: true })
  courseName: string;

  @Prop({ default: 0 })
  examScore: number;

  @Prop({ required: true })
  issueDate: Date;

  @Prop()
  expiryDate?: Date;

  @Prop({ default: true })
  isValid: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const CertificateSchema = SchemaFactory.createForClass(Certificate);

CertificateSchema.index({ student: 1 });
CertificateSchema.index({ course: 1 });
CertificateSchema.index({ certificateNumber: 1 }, { unique: true });
CertificateSchema.index({ student: 1, course: 1 });
