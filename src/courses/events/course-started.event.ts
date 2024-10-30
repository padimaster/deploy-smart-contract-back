import { CourseNotificationDTO } from '../dto/course-notification.dto';

export class CourseStartedEvent {
  user: {
    name: string;
  };
  course: {
    name: string;
  };
  group: {
    id: string;
  };

  constructor(data: CourseNotificationDTO) {
    this.user = data.user;
    this.course = data.course;
    this.group = data.group;
  }
}
