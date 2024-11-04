import { COURSE_EVENT } from '../lib/courses.lib';

export class CourseNotificationDTO {
  user: {
    name: string;
  };
  course: {
    id: string;
  };
  event: {
    name: COURSE_EVENT;
  };
}
