import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { Material, MaterialSchema } from '../../models/material.model';
import { Course, CourseSchema } from '../../models/course.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Material.name, schema: MaterialSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
    MulterModule.register({
      dest: './uploads/materials',
    }),
  ],
  controllers: [MaterialsController],
  providers: [MaterialsService],
  exports: [MaterialsService],
})
export class MaterialsModule {}
