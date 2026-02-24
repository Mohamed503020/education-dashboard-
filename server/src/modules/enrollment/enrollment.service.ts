import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Enrollment, EnrollmentDocument, EnrollmentStatus } from '../../models/enrollment.model';
import { Course, CourseDocument, CourseStatus } from '../../models/course.model';
import { User, UserDocument, UserRole } from '../../models/user.model';
import { EnrollCourseDto, UpdateEnrollmentDto, EnrollmentQueryDto } from './dto/enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectModel(Enrollment.name) private enrollmentModel: Model<EnrollmentDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async enroll(enrollDto: EnrollCourseDto, studentId: string): Promise<EnrollmentDocument> {
    const { courseId } = enrollDto;

    // Check if course exists and is published
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.status !== CourseStatus.PUBLISHED) {
      throw new ForbiddenException('Cannot enroll in an unpublished course');
    }

    // Check if already enrolled
    const existingEnrollment = await this.enrollmentModel.findOne({
      student: new Types.ObjectId(studentId),
      course: new Types.ObjectId(courseId),
    });

    if (existingEnrollment) {
      if (existingEnrollment.status === EnrollmentStatus.ACTIVE) {
        throw new ConflictException('Already enrolled in this course');
      }
      // Re-activate if previously dropped
      existingEnrollment.status = EnrollmentStatus.ACTIVE;
      existingEnrollment.enrolledAt = new Date();
      return existingEnrollment.save();
    }

    // Create enrollment
    const enrollment = new this.enrollmentModel({
      student: new Types.ObjectId(studentId),
      course: new Types.ObjectId(courseId),
      enrolledAt: new Date(),
    });

    const savedEnrollment = await enrollment.save();

    // Update course enrollments
    await this.courseModel.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledStudents: new Types.ObjectId(studentId) },
      $inc: { enrollmentCount: 1 },
    });

    // Update student's enrolled courses
    await this.userModel.findByIdAndUpdate(studentId, {
      $addToSet: { enrolledCourses: new Types.ObjectId(courseId) },
    });

    return savedEnrollment.populate(['student', 'course']);
  }

  async unenroll(courseId: string, studentId: string): Promise<{ message: string }> {
    const enrollment = await this.enrollmentModel.findOne({
      student: new Types.ObjectId(studentId),
      course: new Types.ObjectId(courseId),
      status: EnrollmentStatus.ACTIVE,
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    enrollment.status = EnrollmentStatus.DROPPED;
    await enrollment.save();

    // Update course enrollments
    await this.courseModel.findByIdAndUpdate(courseId, {
      $pull: { enrolledStudents: new Types.ObjectId(studentId) },
      $inc: { enrollmentCount: -1 },
    });

    // Update student's enrolled courses
    await this.userModel.findByIdAndUpdate(studentId, {
      $pull: { enrolledCourses: new Types.ObjectId(courseId) },
    });

    return { message: 'Successfully unenrolled from course' };
  }

  async findAll(query: EnrollmentQueryDto): Promise<{ enrollments: EnrollmentDocument[]; total: number }> {
    const { student, course, status, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (student) {
      filter.student = new Types.ObjectId(student);
    }

    if (course) {
      filter.course = new Types.ObjectId(course);
    }

    if (status) {
      filter.status = status;
    }

    const [enrollments, total] = await Promise.all([
      this.enrollmentModel.find(filter)
        .populate('student', '-password')
        .populate('course')
        .skip(skip)
        .limit(limit)
        .sort({ enrolledAt: -1 }),
      this.enrollmentModel.countDocuments(filter),
    ]);

    return { enrollments, total };
  }

  async findByStudent(studentId: string): Promise<EnrollmentDocument[]> {
    return this.enrollmentModel.find({
      student: new Types.ObjectId(studentId),
      status: EnrollmentStatus.ACTIVE,
    })
      .populate('course')
      .sort({ enrolledAt: -1 });
  }

  async findByCourse(courseId: string): Promise<EnrollmentDocument[]> {
    return this.enrollmentModel.find({
      course: new Types.ObjectId(courseId),
      status: EnrollmentStatus.ACTIVE,
    })
      .populate('student', '-password')
      .sort({ enrolledAt: -1 });
  }

  async checkEnrollment(courseId: string, studentId: string): Promise<{ isEnrolled: boolean; enrollment?: EnrollmentDocument }> {
    const enrollment = await this.enrollmentModel.findOne({
      student: new Types.ObjectId(studentId),
      course: new Types.ObjectId(courseId),
      status: EnrollmentStatus.ACTIVE,
    });

    return {
      isEnrolled: !!enrollment,
      enrollment: enrollment || undefined,
    };
  }

  async updateProgress(courseId: string, studentId: string, progress: number): Promise<EnrollmentDocument> {
    const enrollment = await this.enrollmentModel.findOne({
      student: new Types.ObjectId(studentId),
      course: new Types.ObjectId(courseId),
      status: EnrollmentStatus.ACTIVE,
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    enrollment.progress = Math.min(100, Math.max(0, progress));
    enrollment.lastAccessedAt = new Date();

    if (enrollment.progress >= 100 && enrollment.status === EnrollmentStatus.ACTIVE) {
      enrollment.status = EnrollmentStatus.COMPLETED;
      enrollment.completedAt = new Date();
    }

    return enrollment.save();
  }

  async markMaterialComplete(courseId: string, studentId: string, materialId: string): Promise<EnrollmentDocument> {
    const enrollment = await this.enrollmentModel.findOne({
      student: new Types.ObjectId(studentId),
      course: new Types.ObjectId(courseId),
      status: EnrollmentStatus.ACTIVE,
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    // Add to completed materials if not already there
    if (!enrollment.completedMaterials.some(m => m.toString() === materialId)) {
      enrollment.completedMaterials.push(new Types.ObjectId(materialId));
    }

    enrollment.lastAccessedAt = new Date();
    return enrollment.save();
  }

  async getStudentStats(studentId: string): Promise<any> {
    const enrollments = await this.enrollmentModel.find({
      student: new Types.ObjectId(studentId),
    });

    const stats = {
      totalEnrolled: enrollments.length,
      active: enrollments.filter(e => e.status === EnrollmentStatus.ACTIVE).length,
      completed: enrollments.filter(e => e.status === EnrollmentStatus.COMPLETED).length,
      dropped: enrollments.filter(e => e.status === EnrollmentStatus.DROPPED).length,
      totalTimeSpent: enrollments.reduce((sum, e) => sum + (e.totalTimeSpent || 0), 0),
      averageProgress: enrollments.length > 0
        ? enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / enrollments.length
        : 0,
    };

    return stats;
  }

  async getCourseStats(courseId: string): Promise<any> {
    const enrollments = await this.enrollmentModel.find({
      course: new Types.ObjectId(courseId),
    });

    const stats = {
      totalEnrolled: enrollments.length,
      active: enrollments.filter(e => e.status === EnrollmentStatus.ACTIVE).length,
      completed: enrollments.filter(e => e.status === EnrollmentStatus.COMPLETED).length,
      dropped: enrollments.filter(e => e.status === EnrollmentStatus.DROPPED).length,
      averageProgress: enrollments.length > 0
        ? enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / enrollments.length
        : 0,
      completionRate: enrollments.length > 0
        ? (enrollments.filter(e => e.status === EnrollmentStatus.COMPLETED).length / enrollments.length) * 100
        : 0,
    };

    return stats;
  }
}
