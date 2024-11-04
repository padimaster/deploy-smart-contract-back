import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CourseEvent } from './events/course.event';
import { CourseNotificationDTO } from './dto/course-notification.dto';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDTO } from './dto/create-course.dto';
import { PushService } from 'src/push/push.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    private eventEmitter: EventEmitter2,
    private readonly pushService: PushService,
  ) {}

  async emitEvent(courseNotificationDTO: CourseNotificationDTO) {
    const courseEvent = new CourseEvent(courseNotificationDTO);

    return await this.eventEmitter.emit('user_enrolment_created', courseEvent);
  }

  async create(courseDTO: CreateCourseDTO) {
    const {
      course: { name, id: moodleID },
    } = courseDTO;

    const pushGroupID = await this.pushService.createGroup(name);

    console.log('Push Group ID:', pushGroupID);

    const newCourse: Course = this.coursesRepository.create({
      name,
      moodleID,
      pushGroupID,
    });

    return await this.coursesRepository.save(newCourse);
  }

  async findOne(id: number): Promise<Course | null> {
    return await this.coursesRepository.findOneBy({ id });
  }

  async findByMoodleID(moodleID: string): Promise<Course | null> {
    return await this.coursesRepository.findOneBy({ moodleID });
  }

  async remove(id: number): Promise<void> {
    await this.coursesRepository.delete(id);
  }
}
