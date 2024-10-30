import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CourseStartedEvent } from './events/course-started.event';
import { CourseNotificationDTO } from './dto/course-notification.dto';

@Injectable()
export class CoursesService {
  constructor(private eventEmitter: EventEmitter2) {}

  start(courseNotificationDTO: CourseNotificationDTO) {
    const courseStartedEvent = new CourseStartedEvent(courseNotificationDTO);

    this.eventEmitter.emit('course.started', courseStartedEvent);

    return courseStartedEvent;
  }
}
