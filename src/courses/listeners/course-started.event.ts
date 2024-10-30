import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CourseStartedEvent } from '../events/course-started.event';

import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import { ethers } from 'ethers';

@Injectable()
export class CourseStartedListener {
  @OnEvent('course.started')
  async handleOrderCreatedEvent(event: CourseStartedEvent) {
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY);

    const user = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });

    const messageToGroup = await user.chat.send(event.group.id, {
      type: 'Text',
      content: `${event.user.name} has been started the ${event.course.name} course`,
    });

    return messageToGroup;
  }
}
