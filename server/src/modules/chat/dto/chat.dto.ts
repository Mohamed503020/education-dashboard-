import { IsString, IsOptional, IsEnum } from 'class-validator';
import { MessageType } from '../../../models/chat-message.model';

export class SendMessageDto {
  @IsString()
  liveStreamId: string;

  @IsString()
  content: string;

  @IsEnum(MessageType)
  @IsOptional()
  type?: MessageType = MessageType.TEXT;

  @IsString()
  @IsOptional()
  replyTo?: string;
}

export class GetMessagesDto {
  @IsString()
  liveStreamId: string;

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 50;
}
