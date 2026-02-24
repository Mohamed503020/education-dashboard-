import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument, CourseStatus } from '../../models/course.model';
import { User, UserDocument, UserRole } from '../../models/user.model';
import { Material, MaterialDocument } from '../../models/material.model';
import { CreateCourseDto, UpdateCourseDto, CourseQueryDto } from './dto/course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Material.name) private materialModel: Model<MaterialDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto, teacherId: string): Promise<CourseDocument> {
    const course = new this.courseModel({
      ...createCourseDto,
      teacher: new Types.ObjectId(teacherId),
    });

    const savedCourse = await course.save();

    // Add course to teacher's teaching courses
    await this.userModel.findByIdAndUpdate(teacherId, {
      $push: { teachingCourses: savedCourse._id },
    });

    return savedCourse.populate('teacher', '-password');
  }

  async findAll(query: CourseQueryDto): Promise<{ courses: CourseDocument[]; total: number }> {
    const { search, status, level, category, teacher, isFree, stage, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    if (level) {
      filter.level = level;
    }

    if (category) {
      filter.category = category;
    }

    if (stage) {
      filter.stage = stage;
    }

    if (teacher) {
      filter.teacher = new Types.ObjectId(teacher);
    }

    if (typeof isFree === 'boolean') {
      filter.isFree = isFree;
    }

    const [courses, total] = await Promise.all([
      this.courseModel.find(filter)
        .populate('teacher', '-password')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      this.courseModel.countDocuments(filter),
    ]);

    return { courses, total };
  }

  async findPublished(query: CourseQueryDto): Promise<{ courses: CourseDocument[]; total: number }> {
    return this.findAll({ ...query, status: CourseStatus.PUBLISHED });
  }

  async findById(id: string): Promise<any> {
    const course = await this.courseModel.findById(id)
      .populate('teacher', '-password')
      .populate('enrolledStudents', '-password');

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Manually populate materials since cross-module populate can be unreliable
    const materials = await this.materialModel.find({
      course: new Types.ObjectId(id),
      isPublished: true,
    }).sort({ order: 1, createdAt: -1 });

    const courseObj = course.toObject();
    courseObj.materials = materials as any;
    return courseObj;
  }

  async findByTeacher(teacherId: string): Promise<CourseDocument[]> {
    return this.courseModel.find({ teacher: new Types.ObjectId(teacherId) })
      .populate('teacher', '-password')
      .sort({ createdAt: -1 });
  }

  async findEnrolledCourses(studentId: string): Promise<CourseDocument[]> {
    return this.courseModel.find({
      enrolledStudents: new Types.ObjectId(studentId),
    })
      .populate('teacher', '-password')
      .sort({ createdAt: -1 });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, userId: string, userRole: UserRole): Promise<CourseDocument> {
    const course = await this.courseModel.findById(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Check authorization
    if (userRole !== UserRole.ADMIN && course.teacher.toString() !== userId) {
      throw new ForbiddenException('You are not authorized to update this course');
    }

    const updatedCourse = await this.courseModel.findByIdAndUpdate(
      id,
      { $set: updateCourseDto },
      { new: true },
    ).populate('teacher', '-password');

    return updatedCourse;
  }

  async publish(id: string, userId: string, userRole: UserRole): Promise<CourseDocument> {
    return this.update(id, { status: CourseStatus.PUBLISHED }, userId, userRole);
  }

  async archive(id: string, userId: string, userRole: UserRole): Promise<CourseDocument> {
    return this.update(id, { status: CourseStatus.ARCHIVED }, userId, userRole);
  }

  async delete(id: string, userId: string, userRole: UserRole): Promise<{ message: string }> {
    const course = await this.courseModel.findById(id);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Check authorization
    if (userRole !== UserRole.ADMIN && course.teacher.toString() !== userId) {
      throw new ForbiddenException('You are not authorized to delete this course');
    }

    await this.courseModel.findByIdAndDelete(id);

    // Remove from teacher's teaching courses
    await this.userModel.findByIdAndUpdate(course.teacher, {
      $pull: { teachingCourses: course._id },
    });

    return { message: 'Course deleted successfully' };
  }

  async getEnrolledStudents(courseId: string): Promise<UserDocument[]> {
    const course = await this.courseModel.findById(courseId)
      .populate('enrolledStudents', '-password');

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course.enrolledStudents as unknown as UserDocument[];
  }

  async getCategories(): Promise<string[]> {
    const categories = await this.courseModel.distinct('category');
    return categories.filter(Boolean);
  }
}
