import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Exam, ExamDocument, ExamAttempt, ExamAttemptDocument, AttemptStatus } from '../../models/exam.model';
import { Course, CourseDocument } from '../../models/course.model';
import { UserRole } from '../../models/user.model';
import { CreateExamDto, UpdateExamDto, SubmitExamDto } from './dto/exam.dto';

@Injectable()
export class ExamsService {
  constructor(
    @InjectModel(Exam.name) private examModel: Model<ExamDocument>,
    @InjectModel(ExamAttempt.name) private attemptModel: Model<ExamAttemptDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(createExamDto: CreateExamDto, teacherId: string): Promise<ExamDocument> {
    const course = await this.courseModel.findById(createExamDto.courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.teacher.toString() !== teacherId) {
      throw new ForbiddenException('You can only create exams for your own courses');
    }

    const exam = new this.examModel({
      title: createExamDto.title,
      description: createExamDto.description,
      course: new Types.ObjectId(createExamDto.courseId),
      teacher: new Types.ObjectId(teacherId),
      questions: createExamDto.questions,
      passingScore: createExamDto.passingScore,
      timeLimit: createExamDto.timeLimit,
      maxAttempts: createExamDto.maxAttempts,
      showResults: createExamDto.showResults,
    });

    return exam.save();
  }

  async findByCourse(courseId: string): Promise<ExamDocument[]> {
    return this.examModel.find({ course: new Types.ObjectId(courseId), isActive: true })
      .select('-questions.correctAnswer') // Don't expose answers
      .sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<ExamDocument> {
    const exam = await this.examModel.findById(id)
      .populate('course', 'title')
      .populate('teacher', 'firstName lastName');

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
    return exam;
  }

  async findByIdForStudent(id: string): Promise<any> {
    const exam = await this.examModel.findById(id)
      .populate('course', 'title')
      .select('-questions.correctAnswer'); // Hide correct answers

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
    return exam;
  }

  async findByTeacher(teacherId: string): Promise<ExamDocument[]> {
    return this.examModel.find({ teacher: new Types.ObjectId(teacherId) })
      .populate('course', 'title')
      .sort({ createdAt: -1 });
  }

  async update(id: string, updateExamDto: UpdateExamDto, userId: string, userRole: UserRole): Promise<ExamDocument> {
    const exam = await this.examModel.findById(id);
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    if (userRole !== UserRole.ADMIN && exam.teacher.toString() !== userId) {
      throw new ForbiddenException('You are not authorized to update this exam');
    }

    return this.examModel.findByIdAndUpdate(id, { $set: updateExamDto }, { new: true });
  }

  async delete(id: string, userId: string, userRole: UserRole): Promise<{ message: string }> {
    const exam = await this.examModel.findById(id);
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    if (userRole !== UserRole.ADMIN && exam.teacher.toString() !== userId) {
      throw new ForbiddenException('You are not authorized to delete this exam');
    }

    await this.examModel.findByIdAndDelete(id);
    return { message: 'Exam deleted successfully' };
  }

  // --- Exam Attempts ---

  async startAttempt(examId: string, studentId: string): Promise<ExamAttemptDocument> {
    const exam = await this.examModel.findById(examId);
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    if (!exam.isActive) {
      throw new BadRequestException('This exam is not active');
    }

    // Check if student is enrolled in the course
    const course = await this.courseModel.findById(exam.course);
    if (!course.enrolledStudents.some(s => s.toString() === studentId)) {
      throw new ForbiddenException('You must be enrolled in this course to take the exam');
    }

    // Check max attempts
    const previousAttempts = await this.attemptModel.countDocuments({
      exam: new Types.ObjectId(examId),
      student: new Types.ObjectId(studentId),
      status: { $in: [AttemptStatus.COMPLETED, AttemptStatus.TIMED_OUT] },
    });

    if (previousAttempts >= exam.maxAttempts) {
      throw new BadRequestException(`Maximum attempts (${exam.maxAttempts}) reached`);
    }

    // Check if there's an in-progress attempt
    const inProgressAttempt = await this.attemptModel.findOne({
      exam: new Types.ObjectId(examId),
      student: new Types.ObjectId(studentId),
      status: AttemptStatus.IN_PROGRESS,
    });

    if (inProgressAttempt) {
      return inProgressAttempt;
    }

    const attempt = new this.attemptModel({
      exam: new Types.ObjectId(examId),
      student: new Types.ObjectId(studentId),
      course: exam.course,
      startedAt: new Date(),
    });

    return attempt.save();
  }

  async submitAttempt(attemptId: string, studentId: string, submitDto: SubmitExamDto): Promise<ExamAttemptDocument> {
    const attempt = await this.attemptModel.findById(attemptId);
    if (!attempt) {
      throw new NotFoundException('Attempt not found');
    }

    if (attempt.student.toString() !== studentId) {
      throw new ForbiddenException('This is not your attempt');
    }

    if (attempt.status !== AttemptStatus.IN_PROGRESS) {
      throw new BadRequestException('This attempt has already been submitted');
    }

    const exam = await this.examModel.findById(attempt.exam);
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    // Grade the exam
    let earnedPoints = 0;
    let totalPoints = 0;
    const gradedAnswers = submitDto.answers.map(answer => {
      const question = exam.questions[answer.questionIndex];
      if (!question) return { ...answer, isCorrect: false };

      totalPoints += question.points;
      const isCorrect = answer.selectedAnswer === question.correctAnswer;
      if (isCorrect) {
        earnedPoints += question.points;
      }

      return {
        questionIndex: answer.questionIndex,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
      };
    });

    // Add points for unanswered questions to total
    exam.questions.forEach((q, i) => {
      if (!submitDto.answers.find(a => a.questionIndex === i)) {
        totalPoints += q.points;
      }
    });

    const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = score >= exam.passingScore;

    attempt.answers = gradedAnswers;
    attempt.score = score;
    attempt.totalPoints = totalPoints;
    attempt.earnedPoints = earnedPoints;
    attempt.status = AttemptStatus.COMPLETED;
    attempt.passed = passed;
    attempt.completedAt = new Date();

    return attempt.save();
  }

  async getStudentAttempts(examId: string, studentId: string): Promise<ExamAttemptDocument[]> {
    return this.attemptModel.find({
      exam: new Types.ObjectId(examId),
      student: new Types.ObjectId(studentId),
    }).sort({ createdAt: -1 });
  }

  async getAttemptById(attemptId: string, studentId: string): Promise<ExamAttemptDocument> {
    const attempt = await this.attemptModel.findById(attemptId)
      .populate('exam', 'title passingScore showResults questions');

    if (!attempt) {
      throw new NotFoundException('Attempt not found');
    }

    if (attempt.student.toString() !== studentId) {
      throw new ForbiddenException('This is not your attempt');
    }

    return attempt;
  }

  async getCourseExamResults(courseId: string): Promise<any[]> {
    return this.attemptModel.find({
      course: new Types.ObjectId(courseId),
      status: AttemptStatus.COMPLETED,
    })
      .populate('student', 'firstName lastName email')
      .populate('exam', 'title')
      .sort({ score: -1 });
  }
}
