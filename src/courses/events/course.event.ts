import { CourseNotificationDTO } from '../dto/course-notification.dto';
import { COURSE_EVENT } from '../lib/courses.lib';

export class CourseEvent {
  user: {
    name: string;
  };
  course: {
    id: string;
  };
  event: {
    name: COURSE_EVENT;
  };

  constructor(data: CourseNotificationDTO) {
    this.user = data.user;
    this.course = data.course;
    this.event = data.event;
  }
}
