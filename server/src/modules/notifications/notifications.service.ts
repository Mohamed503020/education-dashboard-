import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument, NotificationType } from '../../models/notification.model';
import { Enrollment, EnrollmentDocument } from '../../models/enrollment.model';
import { CreateNotificationDto, NotificationQueryDto, BulkNotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    @InjectModel(Enrollment.name) private enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  async create(createDto: CreateNotificationDto): Promise<NotificationDocument> {
    const notification = new this.notificationModel({
      ...createDto,
      recipient: new Types.ObjectId(createDto.recipient),
      course: createDto.course ? new Types.ObjectId(createDto.course) : undefined,
      liveStream: createDto.liveStream ? new Types.ObjectId(createDto.liveStream) : undefined,
      material: createDto.material ? new Types.ObjectId(createDto.material) : undefined,
    });

    return notification.save();
  }

  async createBulk(bulkDto: BulkNotificationDto): Promise<NotificationDocument[]> {
    const notifications = bulkDto.recipients.map(recipientId => ({
      recipient: new Types.ObjectId(recipientId),
      title: bulkDto.title,
      message: bulkDto.message,
      type: bulkDto.type,
      course: bulkDto.course ? new Types.ObjectId(bulkDto.course) : undefined,
      liveStream: bulkDto.liveStream ? new Types.ObjectId(bulkDto.liveStream) : undefined,
      actionUrl: bulkDto.actionUrl,
    }));

    return this.notificationModel.insertMany(notifications);
  }

  async findByUser(userId: string, query: NotificationQueryDto): Promise<{ notifications: NotificationDocument[]; total: number; unreadCount: number }> {
    const { isRead, type, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const filter: any = { recipient: new Types.ObjectId(userId) };

    if (typeof isRead === 'boolean') {
      filter.isRead = isRead;
    }

    if (type) {
      filter.type = type;
    }

    const [notifications, total, unreadCount] = await Promise.all([
      this.notificationModel.find(filter)
        .populate('course')
        .populate('liveStream')
        .populate('material')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      this.notificationModel.countDocuments(filter),
      this.notificationModel.countDocuments({
        recipient: new Types.ObjectId(userId),
        isRead: false,
      }),
    ]);

    return { notifications, total, unreadCount };
  }

  async markAsRead(notificationId: string, userId: string): Promise<NotificationDocument> {
    const notification = await this.notificationModel.findOneAndUpdate(
      { _id: notificationId, recipient: new Types.ObjectId(userId) },
      { $set: { isRead: true, readAt: new Date() } },
      { new: true },
    );

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }

  async markAllAsRead(userId: string): Promise<{ message: string }> {
    await this.notificationModel.updateMany(
      { recipient: new Types.ObjectId(userId), isRead: false },
      { $set: { isRead: true, readAt: new Date() } },
    );

    return { message: 'All notifications marked as read' };
  }

  async delete(notificationId: string, userId: string): Promise<{ message: string }> {
    const notification = await this.notificationModel.findOneAndDelete({
      _id: notificationId,
      recipient: new Types.ObjectId(userId),
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return { message: 'Notification deleted' };
  }

  async deleteAll(userId: string): Promise<{ message: string }> {
    await this.notificationModel.deleteMany({
      recipient: new Types.ObjectId(userId),
    });

    return { message: 'All notifications deleted' };
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationModel.countDocuments({
      recipient: new Types.ObjectId(userId),
      isRead: false,
    });
  }

  // Helper methods for specific notification types
  async notifyLiveStreamStarting(courseId: string, liveStreamId: string, title: string): Promise<void> {
    // Get all enrolled students
    const enrollments = await this.enrollmentModel.find({
      course: new Types.ObjectId(courseId),
      status: 'active',
    });

    if (enrollments.length > 0) {
      await this.createBulk({
        recipients: enrollments.map(e => e.student.toString()),
        title: 'البث المباشر قريباً - Live Stream Starting Soon',
        message: `البث المباشر "${title}" سيبدأ قريباً!`,
        type: NotificationType.LIVE_STREAM_STARTING,
        course: courseId,
        liveStream: liveStreamId,
        actionUrl: `/live-stream/${liveStreamId}`,
      });
    }
  }

  async notifyLiveStreamStarted(courseId: string, liveStreamId: string, title: string): Promise<void> {
    const enrollments = await this.enrollmentModel.find({
      course: new Types.ObjectId(courseId),
      status: 'active',
    });

    if (enrollments.length > 0) {
      await this.createBulk({
        recipients: enrollments.map(e => e.student.toString()),
        title: 'البث المباشر بدأ - Live Stream Started',
        message: `البث المباشر "${title}" بدأ الآن! انضم الآن!`,
        type: NotificationType.LIVE_STREAM_STARTED,
        course: courseId,
        liveStream: liveStreamId,
        actionUrl: `/live-stream/${liveStreamId}`,
      });
    }
  }

  async notifyNewMaterial(courseId: string, materialId: string, materialTitle: string): Promise<void> {
    const enrollments = await this.enrollmentModel.find({
      course: new Types.ObjectId(courseId),
      status: 'active',
    });

    if (enrollments.length > 0) {
      await this.createBulk({
        recipients: enrollments.map(e => e.student.toString()),
        title: 'محتوى جديد - New Material',
        message: `تم إضافة محتوى جديد: "${materialTitle}"`,
        type: NotificationType.NEW_MATERIAL,
        course: courseId,
        actionUrl: `/courses/${courseId}/materials/${materialId}`,
      });
    }
  }

  async notifyAssignmentGraded(studentId: string, courseId: string, materialId: string, score: number): Promise<void> {
    await this.create({
      recipient: studentId,
      title: 'تم تصحيح الواجب - Assignment Graded',
      message: `تم تصحيح واجبك. درجتك: ${score}`,
      type: NotificationType.ASSIGNMENT_GRADED,
      course: courseId,
      material: materialId,
      actionUrl: `/courses/${courseId}/assignments/${materialId}`,
    });
  }
}
