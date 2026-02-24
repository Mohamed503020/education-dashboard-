import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamsController } from './exams.controller';
import { ExamsService } from './exams.service';
import { Exam, ExamSchema, ExamAttempt, ExamAttemptSchema } from '../../models/exam.model';
import { Course, CourseSchema } from '../../models/course.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exam.name, schema: ExamSchema },
      { name: ExamAttempt.name, schema: ExamAttemptSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService],
})
export class ExamsModule {}
