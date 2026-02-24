import { 
  Controller, Get, Post, Patch, Delete, Param, Body, Query, 
  UseGuards, UseInterceptors, UploadedFile 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { MaterialsService } from './materials.service';
import { 
  CreateMaterialDto, UpdateMaterialDto, SubmitAssignmentDto, 
  GradeAssignmentDto, MaterialQueryDto 
} from './dto/material.dto';
import { JwtAuthGuard } from '../../middleware/guards/jwt-auth.guard';
import { RolesGuard } from '../../middleware/guards/roles.guard';
import { Roles } from '../../middleware/decorators/roles.decorator';
import { CurrentUser } from '../../middleware/decorators/current-user.decorator';
import { UserDocument, UserRole } from '../../models/user.model';

// Multer storage configuration
const storage = diskStorage({
  destination: './uploads/materials',
  filename: (req, file, callback) => {
    const uniqueName = `${uuid()}${extname(file.originalname)}`;
    callback(null, uniqueName);
  },
});

@Controller('materials')
@UseGuards(JwtAuthGuard)
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async create(
    @Body() createMaterialDto: CreateMaterialDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.materialsService.create(createMaterialDto, user._id.toString());
  }

  @Post('upload')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      fileUrl: `/uploads/materials/${file.filename}`,
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
    };
  }

  @Get()
  async findAll(@Query() query: MaterialQueryDto) {
    return this.materialsService.findAll(query);
  }

  @Get('course/:courseId')
  async findByCourse(@Param('courseId') courseId: string) {
    return this.materialsService.findByCourse(courseId);
  }

  @Get('course/:courseId/videos')
  async findVideosByCourse(@Param('courseId') courseId: string) {
    return this.materialsService.findVideosByCourse(courseId);
  }

  @Get('course/:courseId/pdfs')
  async findPdfsByCourse(@Param('courseId') courseId: string) {
    return this.materialsService.findPdfsByCourse(courseId);
  }

  @Get('course/:courseId/assignments')
  async findAssignmentsByCourse(@Param('courseId') courseId: string) {
    return this.materialsService.findAssignmentsByCourse(courseId);
  }

  @Get('course/:courseId/progress')
  async getStudentProgress(
    @Param('courseId') courseId: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.materialsService.getStudentProgress(courseId, user._id.toString());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.materialsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.materialsService.update(id, updateMaterialDto, user._id.toString(), user.role);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.materialsService.delete(id, user._id.toString(), user.role);
  }

  @Post(':id/submit')
  @UseGuards(RolesGuard)
  @Roles(UserRole.STUDENT)
  async submitAssignment(
    @Param('id') id: string,
    @Body() submitDto: SubmitAssignmentDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.materialsService.submitAssignment(id, user._id.toString(), submitDto);
  }

  @Post(':id/grade')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER)
  async gradeAssignment(
    @Param('id') id: string,
    @Body() gradeDto: GradeAssignmentDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.materialsService.gradeAssignment(id, gradeDto, user._id.toString());
  }

  @Patch(':id/complete')
  async markAsCompleted(
    @Param('id') id: string,
    @Body('progress') progress: number,
    @CurrentUser() user: UserDocument,
  ) {
    return this.materialsService.markAsCompleted(id, user._id.toString(), progress);
  }
}
