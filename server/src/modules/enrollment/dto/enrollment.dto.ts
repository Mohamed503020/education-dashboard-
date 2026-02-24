import { IsString, IsOptional, IsEnum } from 'class-validator';
import { EnrollmentStatus } from '../../../models/enrollment.model';

export class EnrollCourseDto {
  @IsString()
  courseId: string;
}

export class UpdateEnrollmentDto {
  @IsEnum(EnrollmentStatus)
  @IsOptional()
  status?: EnrollmentStatus;

  @IsOptional()
  progress?: number;
}

export class EnrollmentQueryDto {
  @IsString()
  @IsOptional()
  student?: string;

  @IsString()
  @IsOptional()
  course?: string;

  @IsEnum(EnrollmentStatus)
  @IsOptional()
  status?: EnrollmentStatus;

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 10;
}
