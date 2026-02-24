import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Material, MaterialDocument, MaterialType, AssignmentStatus } from '../../models/material.model';
import { Course, CourseDocument } from '../../models/course.model';
import { UserRole } from '../../models/user.model';
import { CreateMaterialDto, UpdateMaterialDto, SubmitAssignmentDto, GradeAssignmentDto, MaterialQueryDto } from './dto/material.dto';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(Material.name) private materialModel: Model<MaterialDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(createMaterialDto: CreateMaterialDto, uploadedById: string): Promise<MaterialDocument> {
    const { course: courseId, ...rest } = createMaterialDto;

    // Verify course exists
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const material = new this.materialModel({
      ...rest,
      course: new Types.ObjectId(courseId),
      uploadedBy: new Types.ObjectId(uploadedById),
    });

    const savedMaterial = await material.save();

    // Add material to course
    await this.courseModel.findByIdAndUpdate(courseId, {
      $push: { materials: savedMaterial._id },
    });

    return savedMaterial.populate(['course', 'uploadedBy']);
  }

  async findAll(query: MaterialQueryDto): Promise<{ materials: MaterialDocument[]; total: number }> {
    const { course, type, isPublished, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (course) {
      filter.course = new Types.ObjectId(course);
    }

    if (type) {
      filter.type = type;
    }

    if (typeof isPublished === 'boolean') {
      filter.isPublished = isPublished;
    }

    const [materials, total] = await Promise.all([
      this.materialModel.find(filter)
        .populate('course')
        .populate('uploadedBy', '-password')
        .skip(skip)
        .limit(limit)
        .sort({ order: 1, createdAt: -1 }),
      this.materialModel.countDocuments(filter),
    ]);

    return { materials, total };
  }

  async findByCourse(courseId: string): Promise<MaterialDocument[]> {
    return this.materialModel.find({ 
      course: new Types.ObjectId(courseId),
      isPublished: true,
    })
      .populate('uploadedBy', '-password')
      .sort({ order: 1, createdAt: -1 });
  }

  async findById(id: string): Promise<MaterialDocument> {
    const material = await this.materialModel.findById(id)
      .populate('course')
      .populate('uploadedBy', '-password');

    if (!material) {
      throw new NotFoundException('Material not found');
    }

    return material;
  }

  async findVideosByCourse(courseId: string): Promise<MaterialDocument[]> {
    return this.materialModel.find({
      course: new Types.ObjectId(courseId),
      type: MaterialType.VIDEO,
      isPublished: true,
    }).sort({ order: 1 });
  }

  async findPdfsByCourse(courseId: string): Promise<MaterialDocument[]> {
    return this.materialModel.find({
      course: new Types.ObjectId(courseId),
      type: MaterialType.PDF,
      isPublished: true,
    }).sort({ order: 1 });
  }

  async findAssignmentsByCourse(courseId: string): Promise<MaterialDocument[]> {
    return this.materialModel.find({
      course: new Types.ObjectId(courseId),
      type: MaterialType.ASSIGNMENT,
      isPublished: true,
    }).sort({ dueDate: 1 });
  }

  async update(id: string, updateMaterialDto: UpdateMaterialDto, userId: string, userRole: UserRole): Promise<MaterialDocument> {
    const material = await this.materialModel.findById(id).populate('course');

    if (!material) {
      throw new NotFoundException('Material not found');
    }

    // Check authorization
    const course = material.course as unknown as CourseDocument;
    if (userRole !== UserRole.ADMIN && course.teacher.toString() !== userId) {
      throw new ForbiddenException('You are not authorized to update this material');
    }

    const updatedMaterial = await this.materialModel.findByIdAndUpdate(
      id,
      { $set: updateMaterialDto },
      { new: true },
    ).populate(['course', 'uploadedBy']);

    return updatedMaterial;
  }

  async delete(id: string, userId: string, userRole: UserRole): Promise<{ message: string }> {
    const material = await this.materialModel.findById(id).populate('course');

    if (!material) {
      throw new NotFoundException('Material not found');
    }

    // Check authorization
    const course = material.course as unknown as CourseDocument;
    if (userRole !== UserRole.ADMIN && course.teacher.toString() !== userId) {
      throw new ForbiddenException('You are not authorized to delete this material');
    }

    // Remove from course
    await this.courseModel.findByIdAndUpdate(material.course, {
      $pull: { materials: material._id },
    });

    await this.materialModel.findByIdAndDelete(id);

    return { message: 'Material deleted successfully' };
  }

  async submitAssignment(materialId: string, studentId: string, submitDto: SubmitAssignmentDto): Promise<MaterialDocument> {
    const material = await this.materialModel.findById(materialId);

    if (!material) {
      throw new NotFoundException('Assignment not found');
    }

    if (material.type !== MaterialType.ASSIGNMENT) {
      throw new BadRequestException('This material is not an assignment');
    }

    // Check if already submitted
    const existingSubmission = material.submissions?.find(
      s => s.student.toString() === studentId
    );

    if (existingSubmission) {
      // Update existing submission
      existingSubmission.fileUrl = submitDto.fileUrl;
      existingSubmission.fileName = submitDto.fileName;
      existingSubmission.submittedAt = new Date();
      existingSubmission.status = material.dueDate && new Date() > material.dueDate 
        ? AssignmentStatus.LATE 
        : AssignmentStatus.SUBMITTED;
    } else {
      // Add new submission
      material.submissions = material.submissions || [];
      material.submissions.push({
        student: new Types.ObjectId(studentId),
        fileUrl: submitDto.fileUrl,
        fileName: submitDto.fileName,
        submittedAt: new Date(),
        status: material.dueDate && new Date() > material.dueDate 
          ? AssignmentStatus.LATE 
          : AssignmentStatus.SUBMITTED,
      });
    }

    await material.save();
    return material;
  }

  async gradeAssignment(materialId: string, gradeDto: GradeAssignmentDto, teacherId: string): Promise<MaterialDocument> {
    const material = await this.materialModel.findById(materialId).populate('course');

    if (!material) {
      throw new NotFoundException('Assignment not found');
    }

    // Verify teacher owns this course
    const course = material.course as unknown as CourseDocument;
    if (course.teacher.toString() !== teacherId) {
      throw new ForbiddenException('You are not authorized to grade this assignment');
    }

    const submission = material.submissions?.find(
      s => s.student.toString() === gradeDto.studentId
    );

    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    submission.score = gradeDto.score;
    submission.feedback = gradeDto.feedback;
    submission.status = AssignmentStatus.GRADED;

    await material.save();
    return material;
  }

  async markAsCompleted(materialId: string, studentId: string, progress: number = 100): Promise<MaterialDocument> {
    const material = await this.materialModel.findById(materialId);

    if (!material) {
      throw new NotFoundException('Material not found');
    }

    // Check if already completed
    const existingCompletion = material.completions?.find(
      c => c.student.toString() === studentId
    );

    if (existingCompletion) {
      existingCompletion.progress = progress;
      existingCompletion.completedAt = progress >= 100 ? new Date() : existingCompletion.completedAt;
    } else {
      material.completions = material.completions || [];
      material.completions.push({
        student: new Types.ObjectId(studentId),
        completedAt: progress >= 100 ? new Date() : null,
        progress,
      });
    }

    await material.save();
    return material;
  }

  async getStudentProgress(courseId: string, studentId: string): Promise<any> {
    const materials = await this.materialModel.find({
      course: new Types.ObjectId(courseId),
      isPublished: true,
    });

    const totalMaterials = materials.length;
    let completedCount = 0;

    const progress = materials.map(material => {
      const completion = material.completions?.find(
        c => c.student.toString() === studentId
      );

      if (completion && completion.progress >= 100) {
        completedCount++;
      }

      return {
        materialId: material._id,
        title: material.title,
        type: material.type,
        progress: completion?.progress || 0,
        completedAt: completion?.completedAt,
      };
    });

    return {
      totalMaterials,
      completedCount,
      overallProgress: totalMaterials > 0 ? (completedCount / totalMaterials) * 100 : 0,
      materials: progress,
    };
  }
}
