import { IsString, IsOptional, IsNumber, IsArray, IsBoolean, IsEnum, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '../../../models/exam.model';

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsEnum(QuestionType)
  @IsOptional()
  type?: QuestionType = QuestionType.MULTIPLE_CHOICE;

  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsNumber()
  correctAnswer: number;

  @IsNumber()
  @IsOptional()
  points?: number = 1;
}

export class CreateExamDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  courseId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  passingScore?: number = 60;

  @IsNumber()
  @IsOptional()
  timeLimit?: number = 30;

  @IsNumber()
  @IsOptional()
  maxAttempts?: number = 3;

  @IsBoolean()
  @IsOptional()
  showResults?: boolean = false;
}

export class UpdateExamDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  @IsOptional()
  questions?: CreateQuestionDto[];

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  passingScore?: number;

  @IsNumber()
  @IsOptional()
  timeLimit?: number;

  @IsNumber()
  @IsOptional()
  maxAttempts?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  showResults?: boolean;
}

export class SubmitExamDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}

export class AnswerDto {
  @IsNumber()
  questionIndex: number;

  @IsNumber()
  selectedAnswer: number;
}

export { CreateQuestionDto as QuestionDto };
