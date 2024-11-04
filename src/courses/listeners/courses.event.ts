import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PushService } from 'src/push/push.service';
import { CoursesService } from '../courses.service';
import { CourseEvent } from '../events/course.event';
import { Course } from '../entities/course.entity';
import { getCourseEventMessage } from '../lib/courses.lib';

export const enum COURSE_EVENT {
  USER_ENROLMENT_CREATED = 'user_enrolment_created',
  COURSE_MODULE_VIEWED = 'course_module_viewed',
  ATTEMPT_SUBMITTED = 'attempt_submitted',
  COURSE_COMPLETED = 'course_completed',
}

@Injectable()
export class CoursesEventsListener {
  constructor(
    private readonly pushService: PushService,
    private readonly coursesService: CoursesService,
  ) {}

  @OnEvent(COURSE_EVENT.USER_ENROLMENT_CREATED)
  async handleUserEnrolled({ event, course, user }: CourseEvent) {
    const currentCourse: Course = await this.coursesService.findByMoodleID(
      course.id,
    );
    if (!currentCourse) {
      throw new Error('Course not found');
    }

    const messageToGroup = await this.pushService.sendToGroup(
      currentCourse.pushGroupID,
      'Text',
      getCourseEventMessage(event.name, user.name, currentCourse.name),
    );
    return messageToGroup;
  }

  @OnEvent(COURSE_EVENT.COURSE_MODULE_VIEWED)
  async handleCourseModuleViewed({ event, course, user }: CourseEvent) {
    const currentCourse: Course = await this.coursesService.findByMoodleID(
      course.id,
    );
    if (!currentCourse) {
      throw new Error('Course not found');
    }

    const messageToGroup = await this.pushService.sendToGroup(
      currentCourse.pushGroupID,
      'Text',
      getCourseEventMessage(event.name, user.name, currentCourse.name),
    );
    return messageToGroup;
  }

  @OnEvent(COURSE_EVENT.ATTEMPT_SUBMITTED)
  async handleAttemptSubmitted({ event, course, user }: CourseEvent) {
    const currentCourse: Course = await this.coursesService.findByMoodleID(
      course.id,
    );
    if (!currentCourse) {
      throw new Error('Course not found');
    }

    const messageToGroup = await this.pushService.sendToGroup(
      currentCourse.pushGroupID,
      'Text',
      getCourseEventMessage(event.name, user.name, currentCourse.name),
    );
    return messageToGroup;
  }

  @OnEvent(COURSE_EVENT.COURSE_COMPLETED)
  async handleCourseCompleted({ event, course, user }: CourseEvent) {
    const currentCourse: Course = await this.coursesService.findByMoodleID(
      course.id,
    );
    if (!currentCourse) {
      throw new Error('Course not found');
    }

    const messageToGroup = await this.pushService.sendToGroup(
      currentCourse.pushGroupID,
      'Text',
      getCourseEventMessage(event.name, user.name, currentCourse.name),
    );
    return messageToGroup;
  }
}
