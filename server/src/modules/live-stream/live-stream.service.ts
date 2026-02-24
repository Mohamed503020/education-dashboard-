import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { LiveStream, LiveStreamDocument, LiveStreamStatus } from '../../models/live-stream.model';
import { Course, CourseDocument } from '../../models/course.model';
import { UserRole } from '../../models/user.model';
import { CreateLiveStreamDto, UpdateLiveStreamDto, LiveStreamQueryDto } from './dto/live-stream.dto';

@Injectable()
export class LiveStreamService {
  constructor(
    @InjectModel(LiveStream.name) private liveStreamModel: Model<LiveStreamDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(createDto: CreateLiveStreamDto, teacherId: string): Promise<LiveStreamDocument> {
    const { course: courseId, ...rest } = createDto;

    // Verify course exists and teacher owns it
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.teacher.toString() !== teacherId) {
      throw new ForbiddenException('You are not authorized to create a live stream for this course');
    }

    const liveStream = new this.liveStreamModel({
      ...rest,
      course: new Types.ObjectId(courseId),
      teacher: new Types.ObjectId(teacherId),
      roomId: uuid(),
    });

    const savedLiveStream = await liveStream.save();

    // Add to course
    await this.courseModel.findByIdAndUpdate(courseId, {
      $push: { liveStreams: savedLiveStream._id },
    });

    return savedLiveStream.populate(['course', 'teacher']);
  }

  async findAll(query: LiveStreamQueryDto): Promise<{ liveStreams: LiveStreamDocument[]; total: number }> {
    const { course, teacher, status, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (course) {
      filter.course = new Types.ObjectId(course);
    }

    if (teacher) {
      filter.teacher = new Types.ObjectId(teacher);
    }

    if (status) {
      filter.status = status;
    }

    const [liveStreams, total] = await Promise.all([
      this.liveStreamModel.find(filter)
        .populate('course')
        .populate('teacher', '-password')
        .skip(skip)
        .limit(limit)
        .sort({ scheduledStartTime: -1 }),
      this.liveStreamModel.countDocuments(filter),
    ]);

    return { liveStreams, total };
  }

  async findById(id: string): Promise<LiveStreamDocument> {
    const liveStream = await this.liveStreamModel.findById(id)
      .populate('course')
      .populate('teacher', '-password')
      .populate('participants', '-password');

    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }

    return liveStream;
  }

  async findByRoomId(roomId: string): Promise<LiveStreamDocument> {
    const liveStream = await this.liveStreamModel.findOne({ roomId })
      .populate('course')
      .populate('teacher', '-password')
      .populate('participants', '-password');

    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }

    return liveStream;
  }

  async findByTeacher(teacherId: string): Promise<LiveStreamDocument[]> {
    return this.liveStreamModel.find({ teacher: new Types.ObjectId(teacherId) })
      .populate('course')
      .populate('teacher', '-password')
      .sort({ createdAt: -1 });
  }

  async findByCourse(courseId: string): Promise<LiveStreamDocument[]> {
    return this.liveStreamModel.find({
      course: new Types.ObjectId(courseId),
      status: { $ne: LiveStreamStatus.CANCELLED },
    })
      .populate('course')
      .populate('teacher', '-password')
      .sort({ scheduledStartTime: -1 });
  }

  async findUpcoming(courseId?: string): Promise<LiveStreamDocument[]> {
    const filter: any = {
      status: { $in: [LiveStreamStatus.SCHEDULED, LiveStreamStatus.LIVE] },
      scheduledStartTime: { $gte: new Date() },
    };

    if (courseId) {
      filter.course = new Types.ObjectId(courseId);
    }

    return this.liveStreamModel.find(filter)
      .populate('course')
      .populate('teacher', '-password')
      .sort({ scheduledStartTime: 1 })
      .limit(10);
  }

  async findLive(): Promise<LiveStreamDocument[]> {
    return this.liveStreamModel.find({ status: LiveStreamStatus.LIVE })
      .populate('course')
      .populate('teacher', '-password')
      .sort({ actualStartTime: -1 });
  }

  async update(id: string, updateDto: UpdateLiveStreamDto, userId: string, userRole: UserRole): Promise<LiveStreamDocument> {
    const liveStream = await this.liveStreamModel.findById(id);

    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }

    if (userRole !== UserRole.ADMIN && liveStream.teacher.toString() !== userId) {
      throw new ForbiddenException('You are not authorized to update this live stream');
    }

    const updatedLiveStream = await this.liveStreamModel.findByIdAndUpdate(
      id,
      { $set: updateDto },
      { new: true },
    ).populate(['course', 'teacher']);

    return updatedLiveStream;
  }

  async start(id: string, teacherId: string): Promise<LiveStreamDocument> {
    const liveStream = await this.liveStreamModel.findById(id);

    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }

    if (liveStream.teacher.toString() !== teacherId) {
      throw new ForbiddenException('You are not authorized to start this live stream');
    }

    if (liveStream.status === LiveStreamStatus.LIVE) {
      throw new BadRequestException('Live stream is already live');
    }

    if (liveStream.status === LiveStreamStatus.ENDED) {
      throw new BadRequestException('This live stream has already ended');
    }

    liveStream.status = LiveStreamStatus.LIVE;
    liveStream.actualStartTime = new Date();
    await liveStream.save();

    return liveStream.populate(['course', 'teacher']);
  }

  async end(id: string, teacherId: string): Promise<LiveStreamDocument> {
    const liveStream = await this.liveStreamModel.findById(id);

    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }

    if (liveStream.teacher.toString() !== teacherId) {
      throw new ForbiddenException('You are not authorized to end this live stream');
    }

    if (liveStream.status !== LiveStreamStatus.LIVE) {
      throw new BadRequestException('Live stream is not currently live');
    }

    liveStream.status = LiveStreamStatus.ENDED;
    liveStream.endTime = new Date();
    
    // Calculate duration
    if (liveStream.actualStartTime) {
      liveStream.duration = Math.round(
        (liveStream.endTime.getTime() - liveStream.actualStartTime.getTime()) / 60000
      );
    }

    await liveStream.save();
    return liveStream.populate(['course', 'teacher']);
  }

  async join(roomId: string, userId: string): Promise<LiveStreamDocument> {
    const liveStream = await this.liveStreamModel.findOne({ roomId });

    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }

    if (liveStream.status !== LiveStreamStatus.LIVE) {
      throw new BadRequestException('Live stream is not currently live');
    }

    // Add participant if not already joined
    if (!liveStream.participants.some(p => p.toString() === userId)) {
      liveStream.participants.push(new Types.ObjectId(userId));
      liveStream.participantCount = liveStream.participants.length;
      await liveStream.save();
    }

    return liveStream.populate(['course', 'teacher', 'participants']);
  }

  async leave(roomId: string, userId: string): Promise<LiveStreamDocument> {
    const liveStream = await this.liveStreamModel.findOne({ roomId });

    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }

    // Remove participant
    liveStream.participants = liveStream.participants.filter(
      p => p.toString() !== userId
    );
    liveStream.participantCount = liveStream.participants.length;
    await liveStream.save();

    return liveStream;
  }

  async raiseHand(roomId: string, studentId: string): Promise<LiveStreamDocument> {
    const liveStream = await this.liveStreamModel.findOne({ roomId });

    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }

    if (liveStream.status !== LiveStreamStatus.LIVE) {
      throw new BadRequestException('Live stream is not currently live');
    }

    // Check if hand is already raised
    const existingHand = liveStream.raisedHands.find(
      h => h.student.toString() === studentId && !h.isAnswered
    );

    if (existingHand) {
      throw new BadRequestException('Hand is already raised');
    }

    liveStream.raisedHands.push({
      student: new Types.ObjectId(studentId),
      raisedAt: new Date(),
      isAnswered: false,
    });

    await liveStream.save();
    return liveStream.populate('raisedHands.student');
  }

  async lowerHand(roomId: string, studentId: string): Promise<LiveStreamDocument> {
    const liveStream = await this.liveStreamModel.findOne({ roomId });

    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }

    // Remove the raised hand
    liveStream.raisedHands = liveStream.raisedHands.filter(
      h => !(h.student.toString() === studentId && !h.isAnswered)
    );

    await liveStream.save();
    return liveStream;
  }

  async answerHand(roomId: string, studentId: string, teacherId: string): Promise<LiveStreamDocument> {
    const liveStream = await this.liveStreamModel.findOne({ roomId });

    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }

    if (liveStream.teacher.toString() !== teacherId) {
      throw new ForbiddenException('Only the teacher can answer raised hands');
    }

    const hand = liveStream.raisedHands.find(
      h => h.student.toString() === studentId && !h.isAnswered
    );

    if (hand) {
      hand.isAnswered = true;
      hand.answeredAt = new Date();
      await liveStream.save();
    }

    return liveStream.populate('raisedHands.student');
  }

  async getParticipants(roomId: string): Promise<any[]> {
    const liveStream = await this.liveStreamModel.findOne({ roomId })
      .populate('participants', '-password');

    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }

    return liveStream.participants;
  }

  async delete(id: string, userId: string, userRole: UserRole): Promise<{ message: string }> {
    const liveStream = await this.liveStreamModel.findById(id);

    if (!liveStream) {
      throw new NotFoundException('Live stream not found');
    }

    if (userRole !== UserRole.ADMIN && liveStream.teacher.toString() !== userId) {
      throw new ForbiddenException('You are not authorized to delete this live stream');
    }

    // Remove from course
    await this.courseModel.findByIdAndUpdate(liveStream.course, {
      $pull: { liveStreams: liveStream._id },
    });

    await this.liveStreamModel.findByIdAndDelete(id);

    return { message: 'Live stream deleted successfully' };
  }
}
