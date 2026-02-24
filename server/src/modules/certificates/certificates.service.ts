import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Certificate, CertificateDocument } from '../../models/certificate.model';
import { Course, CourseDocument } from '../../models/course.model';
import { ExamAttempt, ExamAttemptDocument, AttemptStatus } from '../../models/exam.model';
import { User, UserDocument } from '../../models/user.model';
import { Enrollment, EnrollmentDocument, EnrollmentStatus } from '../../models/enrollment.model';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectModel(Certificate.name) private certificateModel: Model<CertificateDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(ExamAttempt.name) private attemptModel: Model<ExamAttemptDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Enrollment.name) private enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  private generateCertificateNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `CERT-${timestamp}-${random}`;
  }

  async issueCertificate(courseId: string, studentId: string, examAttemptId?: string): Promise<CertificateDocument> {
    // Check if certificate already exists
    const existing = await this.certificateModel.findOne({
      student: new Types.ObjectId(studentId),
      course: new Types.ObjectId(courseId),
    });

    if (existing) {
      throw new ConflictException('Certificate already issued for this course');
    }

    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const student = await this.userModel.findById(studentId);
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // Check enrollment
    if (!course.enrolledStudents.some(s => s.toString() === studentId)) {
      throw new BadRequestException('Student is not enrolled in this course');
    }

    let examScore = 0;
    let examId: Types.ObjectId | undefined;

    // If exam attempt provided, validate it
    if (examAttemptId) {
      const attempt = await this.attemptModel.findById(examAttemptId);
      if (!attempt) {
        throw new NotFoundException('Exam attempt not found');
      }

      if (attempt.student.toString() !== studentId) {
        throw new BadRequestException('This attempt does not belong to this student');
      }

      if (attempt.status !== AttemptStatus.COMPLETED || !attempt.passed) {
        throw new BadRequestException('Exam must be completed and passed to issue certificate');
      }

      examScore = attempt.score;
      examId = attempt.exam as Types.ObjectId;
    }

    const certificate = new this.certificateModel({
      certificateNumber: this.generateCertificateNumber(),
      student: new Types.ObjectId(studentId),
      course: new Types.ObjectId(courseId),
      exam: examId,
      examAttempt: examAttemptId ? new Types.ObjectId(examAttemptId) : undefined,
      studentName: `${student.firstName} ${student.lastName}`,
      courseName: course.title,
      examScore,
      issueDate: new Date(),
    });

    const saved = await certificate.save();

    // Update enrollment with certificate info
    await this.enrollmentModel.findOneAndUpdate(
      { student: new Types.ObjectId(studentId), course: new Types.ObjectId(courseId) },
      {
        $set: {
          status: EnrollmentStatus.COMPLETED,
          completedAt: new Date(),
          certificateUrl: `/certificates/${saved._id}`,
          finalGrade: examScore,
        },
      },
    );

    return saved;
  }

  async findByStudent(studentId: string): Promise<CertificateDocument[]> {
    return this.certificateModel.find({ student: new Types.ObjectId(studentId) })
      .populate('course', 'title thumbnail stage')
      .sort({ issueDate: -1 });
  }

  async findById(id: string): Promise<CertificateDocument> {
    const cert = await this.certificateModel.findById(id)
      .populate('student', 'firstName lastName email')
      .populate('course', 'title description thumbnail stage');

    if (!cert) {
      throw new NotFoundException('Certificate not found');
    }
    return cert;
  }

  async verify(certificateNumber: string): Promise<CertificateDocument> {
    const cert = await this.certificateModel.findOne({ certificateNumber })
      .populate('student', 'firstName lastName')
      .populate('course', 'title');

    if (!cert) {
      throw new NotFoundException('Certificate not found');
    }
    return cert;
  }

  async findByCourse(courseId: string): Promise<CertificateDocument[]> {
    return this.certificateModel.find({ course: new Types.ObjectId(courseId) })
      .populate('student', 'firstName lastName email')
      .sort({ issueDate: -1 });
  }
}
