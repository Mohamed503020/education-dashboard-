import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Feature Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { LiveStreamModule } from './modules/live-stream/live-stream.module';
import { ChatModule } from './modules/chat/chat.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { ExamsModule } from './modules/exams/exams.module';
import { CertificatesModule } from './modules/certificates/certificates.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // MongoDB Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/education_platform',
      }),
      inject: [ConfigService],
    }),

    // Feature Modules
    AuthModule,
    UsersModule,
    CoursesModule,
    MaterialsModule,
    LiveStreamModule,
    ChatModule,
    NotificationsModule,
    EnrollmentModule,
    ExamsModule,
    CertificatesModule,
  ],
})
export class AppModule {}
