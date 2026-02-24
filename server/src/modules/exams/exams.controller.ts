import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto, UpdateExamDto, SubmitExamDto } from './dto/exam.dto';
import { JwtAuthGuard } from '../../middleware/guards/jwt-auth.guard';
import { RolesGuard } from '../../middleware/guards/roles.guard';
import { Roles } from '../../middleware/decorators/roles.decorator';
import { CurrentUser } from '../../middleware/decorators/current-user.decorator';
import { Public } from '../../middleware/decorators/public.decorator';
import { UserDocument, UserRole } from '../../models/user.model';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async create(
    @Body() createExamDto: CreateExamDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.examsService.create(createExamDto, user._id.toString());
  }

  @Public()
  @Get('course/:courseId')
  async findByCourse(@Param('courseId') courseId: string) {
    return this.examsService.findByCourse(courseId);
  }

  @Get('my-exams')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER)
  async findMyExams(@CurrentUser() user: UserDocument) {
    return this.examsService.findByTeacher(user._id.toString());
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @CurrentUser() user: UserDocument) {
    if (user.role === UserRole.STUDENT) {
      return this.examsService.findByIdForStudent(id);
    }
    return this.examsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateExamDto: UpdateExamDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.examsService.update(id, updateExamDto, user._id.toString(), user.role);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.examsService.delete(id, user._id.toString(), user.role);
  }

  // --- Attempts ---

  @Post(':id/start')
  @UseGuards(JwtAuthGuard)
  async startAttempt(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.examsService.startAttempt(id, user._id.toString());
  }

  @Post('attempts/:attemptId/submit')
  @UseGuards(JwtAuthGuard)
  async submitAttempt(
    @Param('attemptId') attemptId: string,
    @Body() submitDto: SubmitExamDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.examsService.submitAttempt(attemptId, user._id.toString(), submitDto);
  }

  @Get(':id/attempts')
  @UseGuards(JwtAuthGuard)
  async getMyAttempts(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.examsService.getStudentAttempts(id, user._id.toString());
  }

  @Get('attempts/:attemptId')
  @UseGuards(JwtAuthGuard)
  async getAttempt(
    @Param('attemptId') attemptId: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.examsService.getAttemptById(attemptId, user._id.toString());
  }

  @Get('course/:courseId/results')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async getCourseResults(@Param('courseId') courseId: string) {
    return this.examsService.getCourseExamResults(courseId);
  }
}
