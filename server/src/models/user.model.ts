import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  TEACHER = 'teacher',
  STUDENT = 'student',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  _id?: Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @Prop()
  avatar?: string;

  @Prop()
  phone?: string;

  @Prop()
  bio?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  lastLogin?: Date;

  // For students
  @Prop()
  studentId?: string;

  @Prop()
  enrollmentDate?: Date;

  // For teachers
  @Prop()
  department?: string;

  @Prop()
  specialization?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  enrolledCourses?: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  teachingCourses?: Types.ObjectId[];

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Index for faster queries
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
