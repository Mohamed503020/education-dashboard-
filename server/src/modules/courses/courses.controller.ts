import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto, UpdateCourseDto, CourseQueryDto } from './dto/course.dto';
import { JwtAuthGuard } from '../../middleware/guards/jwt-auth.guard';
import { RolesGuard } from '../../middleware/guards/roles.guard';
import { Roles } from '../../middleware/decorators/roles.decorator';
import { Public } from '../../middleware/decorators/public.decorator';
import { CurrentUser } from '../../middleware/decorators/current-user.decorator';
import { UserDocument, UserRole } from '../../models/user.model';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.coursesService.create(createCourseDto, user._id.toString());
  }

  @Public()
  @Get()
  async findAll(@Query() query: CourseQueryDto) {
    return this.coursesService.findPublished(query);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAllCourses(@Query() query: CourseQueryDto) {
    return this.coursesService.findAll(query);
  }

  @Get('my-courses')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER)
  async findMyCourses(@CurrentUser() user: UserDocument) {
    return this.coursesService.findByTeacher(user._id.toString());
  }

  @Get('enrolled')
  @UseGuards(JwtAuthGuard)
  async findEnrolledCourses(@CurrentUser() user: UserDocument) {
    return this.coursesService.findEnrolledCourses(user._id.toString());
  }

  @Get('categories')
  @Public()
  async getCategories() {
    return this.coursesService.getCategories();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Get(':id/students')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async getEnrolledStudents(@Param('id') id: string) {
    return this.coursesService.getEnrolledStudents(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.coursesService.update(id, updateCourseDto, user._id.toString(), user.role);
  }

  @Patch(':id/publish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async publish(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.coursesService.publish(id, user._id.toString(), user.role);
  }

  @Patch(':id/archive')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async archive(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.coursesService.archive(id, user._id.toString(), user.role);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.coursesService.delete(id, user._id.toString(), user.role);
  }
}
