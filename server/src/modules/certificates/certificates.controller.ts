import { Controller, Get, Post, Param, Body, UseGuards, Query } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto, VerifyCertificateDto } from './dto/certificate.dto';
import { JwtAuthGuard } from '../../middleware/guards/jwt-auth.guard';
import { RolesGuard } from '../../middleware/guards/roles.guard';
import { Roles } from '../../middleware/decorators/roles.decorator';
import { Public } from '../../middleware/decorators/public.decorator';
import { CurrentUser } from '../../middleware/decorators/current-user.decorator';
import { UserDocument, UserRole } from '../../models/user.model';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async issueCertificate(
    @Body() dto: CreateCertificateDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.certificatesService.issueCertificate(
      dto.courseId,
      user._id.toString(),
      dto.examAttemptId,
    );
  }

  @Get('my-certificates')
  @UseGuards(JwtAuthGuard)
  async getMyCertificates(@CurrentUser() user: UserDocument) {
    return this.certificatesService.findByStudent(user._id.toString());
  }

  @Public()
  @Get('verify/:certificateNumber')
  async verify(@Param('certificateNumber') certificateNumber: string) {
    return this.certificatesService.verify(certificateNumber);
  }

  @Get('course/:courseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async findByCourse(@Param('courseId') courseId: string) {
    return this.certificatesService.findByCourse(courseId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.certificatesService.findById(id);
  }
}
