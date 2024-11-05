import { ConfigModule, ConfigType } from '@nestjs/config';
import { ethers } from 'ethers';
import config from 'src/config/config';

export const signerProvider = {
  imports: [ConfigModule.forFeature(config)],
  provide: 'SIGNER',
  useFactory: async (configuration: ConfigType<typeof config>) => {
    const signer = new ethers.Wallet(configuration.contracts.privateKey);

    return signer;
  },
  inject: [config.KEY],
};
