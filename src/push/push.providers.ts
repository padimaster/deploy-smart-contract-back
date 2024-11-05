import { ConfigModule } from '@nestjs/config';
import { PushAPI } from '@pushprotocol/restapi';

import { CONSTANTS } from '@pushprotocol/restapi';
import { ethers } from 'ethers';
import config from 'src/config/config';

export const pushUserProvider = {
  imports: [ConfigModule.forFeature(config)],
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
  inject: ['SIGNER'],
};
