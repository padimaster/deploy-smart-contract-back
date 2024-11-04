import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseNotificationDTO } from './dto/course-notification.dto';
import { CreateCourseDTO } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Post('event')
  emitEvent(@Body() courseNotificationDTO: CourseNotificationDTO) {
    return this.coursesService.emitEvent(courseNotificationDTO);
  }

  @Post('create')
  create(@Body() createCourseDTO: CreateCourseDTO) {
    return this.coursesService.create(createCourseDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }
}
