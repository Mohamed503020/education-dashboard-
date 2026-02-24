import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LiveStreamDocument = LiveStream & Document;

export enum LiveStreamStatus {
  SCHEDULED = 'scheduled',
  LIVE = 'live',
  ENDED = 'ended',
  CANCELLED = 'cancelled',
}

@Schema({ timestamps: true })
export class LiveStream {
  _id?: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  teacher: Types.ObjectId;

  @Prop({ enum: LiveStreamStatus, default: LiveStreamStatus.SCHEDULED })
  status: LiveStreamStatus;

  @Prop()
  scheduledStartTime?: Date;

  @Prop()
  actualStartTime?: Date;

  @Prop()
  endTime?: Date;

  @Prop()
  duration?: number; // in minutes

  @Prop({ unique: true })
  roomId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  participants: Types.ObjectId[];

  @Prop({ default: 0 })
  participantCount: number;

  @Prop({ default: 0 })
  maxParticipants: number;

  @Prop({ type: [{ 
    student: { type: Types.ObjectId, ref: 'User' },
    raisedAt: Date,
    answeredAt: Date,
    isAnswered: Boolean
  }], default: [] })
  raisedHands: Array<{
    student: Types.ObjectId;
    raisedAt: Date;
    answeredAt?: Date;
    isAnswered: boolean;
  }>;

  @Prop()
  recordingUrl?: string;

  @Prop({ default: false })
  isRecorded: boolean;

  @Prop({ default: true })
  chatEnabled: boolean;

  @Prop()
  thumbnail?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const LiveStreamSchema = SchemaFactory.createForClass(LiveStream);

// Indexes
LiveStreamSchema.index({ course: 1 });
LiveStreamSchema.index({ teacher: 1 });
LiveStreamSchema.index({ status: 1 });
LiveStreamSchema.index({ roomId: 1 });
LiveStreamSchema.index({ scheduledStartTime: 1 });
