import { Body, Controller, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseNotificationDTO } from './dto/course-notification.dto';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Post('start')
  start(@Body() courseNotificationDTO: CourseNotificationDTO) {
    return this.coursesService.start(courseNotificationDTO);
  }
}
