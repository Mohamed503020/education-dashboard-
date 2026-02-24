import { IsString, IsOptional, IsDate, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLiveStreamDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  course: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  scheduledStartTime?: Date;

  @IsNumber()
  @IsOptional()
  maxParticipants?: number;

  @IsBoolean()
  @IsOptional()
  chatEnabled?: boolean = true;

  @IsString()
  @IsOptional()
  thumbnail?: string;
}

export class UpdateLiveStreamDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  scheduledStartTime?: Date;

  @IsNumber()
  @IsOptional()
  maxParticipants?: number;

  @IsBoolean()
  @IsOptional()
  chatEnabled?: boolean;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsString()
  @IsOptional()
  recordingUrl?: string;
}

export class LiveStreamQueryDto {
  @IsString()
  @IsOptional()
  course?: string;

  @IsString()
  @IsOptional()
  teacher?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 10;
}
