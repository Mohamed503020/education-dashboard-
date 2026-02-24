import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExamDocument = Exam & Document;

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
}

@Schema()
export class ExamQuestion {
  @Prop({ required: true })
  text: string;

  @Prop({ enum: QuestionType, default: QuestionType.MULTIPLE_CHOICE })
  type: QuestionType;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ required: true })
  correctAnswer: number; // index of correct option

  @Prop({ default: 1 })
  points: number;
}

export const ExamQuestionSchema = SchemaFactory.createForClass(ExamQuestion);

@Schema({ timestamps: true })
export class Exam {
  _id?: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  teacher: Types.ObjectId;

  @Prop({ type: [ExamQuestionSchema], default: [] })
  questions: ExamQuestion[];

  @Prop({ default: 60 })
  passingScore: number; // percentage

  @Prop({ default: 30 })
  timeLimit: number; // in minutes

  @Prop({ default: 3 })
  maxAttempts: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  showResults: boolean; // show correct answers after submission

  createdAt?: Date;
  updatedAt?: Date;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);

ExamSchema.index({ course: 1 });
ExamSchema.index({ teacher: 1 });

// --- Exam Attempt ---

export type ExamAttemptDocument = ExamAttempt & Document;

export enum AttemptStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  TIMED_OUT = 'timed_out',
}

@Schema()
export class QuestionAnswer {
  @Prop({ required: true })
  questionIndex: number;

  @Prop({ required: true })
  selectedAnswer: number;

  @Prop()
  isCorrect?: boolean;
}

export const QuestionAnswerSchema = SchemaFactory.createForClass(QuestionAnswer);

@Schema({ timestamps: true })
export class ExamAttempt {
  _id?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Exam', required: true })
  exam: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  student: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ type: [QuestionAnswerSchema], default: [] })
  answers: QuestionAnswer[];

  @Prop({ default: 0 })
  score: number; // percentage

  @Prop({ default: 0 })
  totalPoints: number;

  @Prop({ default: 0 })
  earnedPoints: number;

  @Prop({ enum: AttemptStatus, default: AttemptStatus.IN_PROGRESS })
  status: AttemptStatus;

  @Prop({ default: false })
  passed: boolean;

  @Prop()
  startedAt: Date;

  @Prop()
  completedAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ExamAttemptSchema = SchemaFactory.createForClass(ExamAttempt);

ExamAttemptSchema.index({ exam: 1, student: 1 });
ExamAttemptSchema.index({ course: 1, student: 1 });
ExamAttemptSchema.index({ student: 1, status: 1 });
