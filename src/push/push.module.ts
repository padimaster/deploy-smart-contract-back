import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { pushSignerProvider, pushUserProvider } from './push.providers';
import { PushService } from './push.service';
import pushConfig from 'src/config/push.config';

@Module({
  imports: [ConfigModule.forFeature(pushConfig)],
  providers: [pushSignerProvider, pushUserProvider, PushService],
  exports: ['PUSH_SIGNER', 'PUSH_USER', PushService],
})
export class PushModule {}
