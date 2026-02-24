import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CertificatesController } from './certificates.controller';
import { CertificatesService } from './certificates.service';
import { Certificate, CertificateSchema } from '../../models/certificate.model';
import { Course, CourseSchema } from '../../models/course.model';
import { ExamAttempt, ExamAttemptSchema } from '../../models/exam.model';
import { User, UserSchema } from '../../models/user.model';
import { Enrollment, EnrollmentSchema } from '../../models/enrollment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Certificate.name, schema: CertificateSchema },
      { name: Course.name, schema: CourseSchema },
      { name: ExamAttempt.name, schema: ExamAttemptSchema },
      { name: User.name, schema: UserSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
    ]),
  ],
  controllers: [CertificatesController],
  providers: [CertificatesService],
  exports: [CertificatesService],
})
export class CertificatesModule {}
