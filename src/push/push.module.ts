import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { pushUserProvider } from './push.providers';
import { PushService } from './push.service';
import { ContractsModule } from 'src/contracts/contracts.module';
import config from 'src/config/config';

@Module({
  imports: [ConfigModule.forFeature(config), ContractsModule],
  providers: [pushUserProvider, PushService],
  exports: ['PUSH_USER', PushService],
})
export class PushModule {}
