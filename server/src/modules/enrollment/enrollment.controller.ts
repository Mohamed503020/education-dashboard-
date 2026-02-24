import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards, Patch } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollCourseDto, EnrollmentQueryDto } from './dto/enrollment.dto';
import { JwtAuthGuard } from '../../middleware/guards/jwt-auth.guard';
import { RolesGuard } from '../../middleware/guards/roles.guard';
import { Roles } from '../../middleware/decorators/roles.decorator';
import { CurrentUser } from '../../middleware/decorators/current-user.decorator';
import { UserDocument, UserRole } from '../../models/user.model';

@Controller('enrollments')
@UseGuards(JwtAuthGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  async enroll(
    @Body() enrollDto: EnrollCourseDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.enrollmentService.enroll(enrollDto, user._id.toString());
  }

  @Delete(':courseId')
  async unenroll(
    @Param('courseId') courseId: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.enrollmentService.unenroll(courseId, user._id.toString());
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  async findAll(@Query() query: EnrollmentQueryDto) {
    return this.enrollmentService.findAll(query);
  }

  @Get('my-enrollments')
  async findMyEnrollments(@CurrentUser() user: UserDocument) {
    return this.enrollmentService.findByStudent(user._id.toString());
  }

  @Get('course/:courseId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  async findByCourse(@Param('courseId') courseId: string) {
    return this.enrollmentService.findByCourse(courseId);
  }

  @Get('check/:courseId')
  async checkEnrollment(
    @Param('courseId') courseId: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.enrollmentService.checkEnrollment(courseId, user._id.toString());
  }

  @Patch(':courseId/progress')
  async updateProgress(
    @Param('courseId') courseId: string,
    @Body('progress') progress: number,
    @CurrentUser() user: UserDocument,
  ) {
    return this.enrollmentService.updateProgress(courseId, user._id.toString(), progress);
  }

  @Post(':courseId/complete-material/:materialId')
  async markMaterialComplete(
    @Param('courseId') courseId: string,
    @Param('materialId') materialId: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.enrollmentService.markMaterialComplete(
      courseId,
      user._id.toString(),
      materialId,
    );
  }

  @Get('my-stats')
  async getMyStats(@CurrentUser() user: UserDocument) {
    return this.enrollmentService.getStudentStats(user._id.toString());
  }

  @Get('course/:courseId/stats')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  async getCourseStats(@Param('courseId') courseId: string) {
    return this.enrollmentService.getCourseStats(courseId);
  }
}
