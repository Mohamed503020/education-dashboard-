import { IsString, IsEnum, IsOptional, IsNumber, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { MaterialType } from '../../../models/material.model';

export class CreateMaterialDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(MaterialType)
  type: MaterialType;

  @IsString()
  course: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;

  @IsString()
  @IsOptional()
  fileName?: string;

  @IsNumber()
  @IsOptional()
  fileSize?: number;

  @IsString()
  @IsOptional()
  mimeType?: string;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean = true;

  // Assignment specific
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @IsNumber()
  @IsOptional()
  maxScore?: number;
}

export class UpdateMaterialDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @IsNumber()
  @IsOptional()
  maxScore?: number;
}

export class SubmitAssignmentDto {
  @IsString()
  fileUrl: string;

  @IsString()
  fileName: string;
}

export class GradeAssignmentDto {
  @IsString()
  studentId: string;

  @IsNumber()
  score: number;

  @IsString()
  @IsOptional()
  feedback?: string;
}

export class MaterialQueryDto {
  @IsString()
  @IsOptional()
  course?: string;

  @IsEnum(MaterialType)
  @IsOptional()
  type?: MaterialType;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 10;
}
