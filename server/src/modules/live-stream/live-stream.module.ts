import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LiveStreamController } from './live-stream.controller';
import { LiveStreamService } from './live-stream.service';
import { LiveStreamGateway } from '../../sockets/live-stream.gateway';
import { LiveStream, LiveStreamSchema } from '../../models/live-stream.model';
import { Course, CourseSchema } from '../../models/course.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LiveStream.name, schema: LiveStreamSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'default-secret',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [LiveStreamController],
  providers: [LiveStreamService, LiveStreamGateway],
  exports: [LiveStreamService, LiveStreamGateway],
})
export class LiveStreamModule {}
