import { IsString, IsEnum, IsOptional, IsBoolean, IsNumber, IsArray, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { CourseStatus, CourseLevel, CourseStage } from '../../../models/course.model';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsEnum(CourseLevel)
  @IsOptional()
  level?: CourseLevel = CourseLevel.BEGINNER;

  @IsString()
  @IsOptional()
  category?: string;

  @IsEnum(CourseStage)
  @IsOptional()
  stage?: CourseStage;

  @IsNumber()
  @IsOptional()
  grade?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsNumber()
  @IsOptional()
  price?: number = 0;

  @IsBoolean()
  @IsOptional()
  isFree?: boolean = true;

  @IsEnum(CourseStatus)
  @IsOptional()
  status?: CourseStatus = CourseStatus.DRAFT;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class UpdateCourseDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsEnum(CourseStatus)
  @IsOptional()
  status?: CourseStatus;

  @IsEnum(CourseLevel)
  @IsOptional()
  level?: CourseLevel;

  @IsString()
  @IsOptional()
  category?: string;

  @IsEnum(CourseStage)
  @IsOptional()
  stage?: CourseStage;

  @IsNumber()
  @IsOptional()
  grade?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsBoolean()
  @IsOptional()
  isFree?: boolean;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class CourseQueryDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsEnum(CourseStatus)
  @IsOptional()
  status?: CourseStatus;

  @IsEnum(CourseLevel)
  @IsOptional()
  level?: CourseLevel;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  teacher?: string;

  @IsEnum(CourseStage)
  @IsOptional()
  stage?: CourseStage;

  @IsBoolean()
  @IsOptional()
  isFree?: boolean;

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 10;
}
