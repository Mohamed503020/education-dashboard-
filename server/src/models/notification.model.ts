import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

export enum NotificationType {
  LIVE_STREAM_STARTING = 'live_stream_starting',
  LIVE_STREAM_STARTED = 'live_stream_started',
  LIVE_STREAM_ENDED = 'live_stream_ended',
  NEW_MATERIAL = 'new_material',
  ASSIGNMENT_DUE = 'assignment_due',
  ASSIGNMENT_GRADED = 'assignment_graded',
  COURSE_ENROLLED = 'course_enrolled',
  COURSE_UPDATE = 'course_update',
  SYSTEM = 'system',
}

@Schema({ timestamps: true })
export class Notification {
  _id?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  recipient: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ enum: NotificationType, required: true })
  type: NotificationType;

  @Prop({ default: false })
  isRead: boolean;

  @Prop()
  readAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Course' })
  course?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'LiveStream' })
  liveStream?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Material' })
  material?: Types.ObjectId;

  @Prop()
  actionUrl?: string;

  @Prop({ type: Object })
  metadata?: Record<string, any>;

  createdAt?: Date;
  updatedAt?: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

// Indexes
NotificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
NotificationSchema.index({ type: 1 });
