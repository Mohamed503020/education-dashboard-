import { Controller, Get, Post, Patch, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationQueryDto } from './dto/notification.dto';
import { JwtAuthGuard } from '../../middleware/guards/jwt-auth.guard';
import { CurrentUser } from '../../middleware/decorators/current-user.decorator';
import { UserDocument } from '../../models/user.model';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async findAll(
    @CurrentUser() user: UserDocument,
    @Query() query: NotificationQueryDto,
  ) {
    return this.notificationsService.findByUser(user._id.toString(), query);
  }

  @Get('unread-count')
  async getUnreadCount(@CurrentUser() user: UserDocument) {
    const count = await this.notificationsService.getUnreadCount(user._id.toString());
    return { count };
  }

  @Patch(':id/read')
  async markAsRead(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.notificationsService.markAsRead(id, user._id.toString());
  }

  @Post('mark-all-read')
  async markAllAsRead(@CurrentUser() user: UserDocument) {
    return this.notificationsService.markAllAsRead(user._id.toString());
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.notificationsService.delete(id, user._id.toString());
  }

  @Delete()
  async deleteAll(@CurrentUser() user: UserDocument) {
    return this.notificationsService.deleteAll(user._id.toString());
  }
}
