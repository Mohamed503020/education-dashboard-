import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument, UserRole } from '../../models/user.model';
import { UpdateUserDto, AdminUpdateUserDto, UserQueryDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll(query: UserQueryDto): Promise<{ users: UserDocument[]; total: number }> {
    const { search, role, isActive, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (role) {
      filter.role = role;
    }

    if (typeof isActive === 'boolean') {
      filter.isActive = isActive;
    }

    const [users, total] = await Promise.all([
      this.userModel.find(filter)
        .select('-password')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      this.userModel.countDocuments(filter),
    ]);

    return { users, total };
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).select('-password');
  }

  async findTeachers(): Promise<UserDocument[]> {
    return this.userModel.find({ role: UserRole.TEACHER, isActive: true })
      .select('-password')
      .sort({ firstName: 1 });
  }

  async findStudents(): Promise<UserDocument[]> {
    return this.userModel.find({ role: UserRole.STUDENT, isActive: true })
      .select('-password')
      .sort({ firstName: 1 });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { $set: updateUserDto },
      { new: true },
    ).select('-password');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async adminUpdate(id: string, adminUpdateUserDto: AdminUpdateUserDto): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { $set: adminUpdateUserDto },
      { new: true },
    ).select('-password');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async delete(id: string): Promise<{ message: string }> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  async deactivate(id: string): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true },
    ).select('-password');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getStudentsByCourse(courseId: string): Promise<UserDocument[]> {
    return this.userModel.find({
      role: UserRole.STUDENT,
      enrolledCourses: new Types.ObjectId(courseId),
      isActive: true,
    }).select('-password');
  }
}
