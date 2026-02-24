import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { NotificationType } from '../../../models/notification.model';

export class CreateNotificationDto {
  @IsString()
  recipient: string;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsString()
  @IsOptional()
  course?: string;

  @IsString()
  @IsOptional()
  liveStream?: string;

  @IsString()
  @IsOptional()
  material?: string;

  @IsString()
  @IsOptional()
  actionUrl?: string;
}

export class NotificationQueryDto {
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @IsEnum(NotificationType)
  @IsOptional()
  type?: NotificationType;

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 20;
}

export class BulkNotificationDto {
  @IsString({ each: true })
  recipients: string[];

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsString()
  @IsOptional()
  course?: string;

  @IsString()
  @IsOptional()
  liveStream?: string;

  @IsString()
  @IsOptional()
  actionUrl?: string;
}
