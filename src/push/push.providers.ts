import { ConfigModule, ConfigType } from '@nestjs/config';
import { PushAPI } from '@pushprotocol/restapi';

import { CONSTANTS } from '@pushprotocol/restapi';
import { ethers } from 'ethers';
import pushConfig from 'src/config/push.config';

export const pushSignerProvider = {
  imports: [ConfigModule.forFeature(pushConfig)],
  provide: 'PUSH_SIGNER',
  useFactory: async (config: ConfigType<typeof pushConfig>) => {
    const signer = new ethers.Wallet(config.privateKey);

    return signer;
  },
  inject: [pushConfig.KEY],
};

export const pushUserProvider = {
  imports: [ConfigModule.forFeature(pushConfig)],
  provide: 'PUSH_USER',
  useFactory: async (signer: ethers.Wallet) => {
    const user = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });

    if (user.errors.length > 0) {
      console.error('Error initializing PushAPI:', user.errors);
      throw new Error('Error initializing');
    }

    return user;
  },
  inject: ['PUSH_SIGNER'],
};
