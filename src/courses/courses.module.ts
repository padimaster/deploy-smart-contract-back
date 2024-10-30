import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseStartedListener } from './listeners/course-started.event';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, CourseStartedListener],
})
export class CoursesModule {}
