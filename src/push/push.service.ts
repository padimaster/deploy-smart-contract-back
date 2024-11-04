import { Injectable, Inject } from '@nestjs/common';
import { PushAPI } from '@pushprotocol/restapi';

@Injectable()
export class PushService {
  private readonly user: PushAPI;

  constructor(@Inject('PUSH_USER') user: PushAPI) {
    this.user = user;
  }

  async sendToGroup(groupID: string, type: 'Text', content: string) {
    const messageToGroup = await this.user.chat.send(groupID, {
      type,
      content,
    });

    return messageToGroup;
  }

  async createGroup(name: string): Promise<string> {
    const response = await this.user.chat.group.create(name, {
      image:
        'https://pbs.twimg.com/profile_images/1792524075849699328/VDHE39b8_400x400.jpg',
    });

    return response.chatId;
  }
}
