import { IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCertificateDto {
  @IsString()
  courseId: string;

  @IsString()
  @IsOptional()
  examAttemptId?: string;
}

export class VerifyCertificateDto {
  @IsString()
  certificateNumber: string;
}
