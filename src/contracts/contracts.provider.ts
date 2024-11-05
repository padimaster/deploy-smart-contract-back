import { ConfigModule, ConfigType } from '@nestjs/config';
import { ethers } from 'ethers';
import config from 'src/config/config';

export const providerProvider = {
  imports: [ConfigModule.forFeature(config)],
  provide: 'PROVIDER',
  useFactory: async (configuration: ConfigType<typeof config>) => {
    const provider = new ethers.providers.JsonRpcProvider(
      configuration.contracts.providerURL,
    );

    console.log(
      'provider',
      await provider.getCode(configuration.contracts.publicAddess),
    );

    console.log(configuration.contracts.publicAddess);

    return provider;
  },
  inject: [config.KEY],
};

export const signerProvider = {
  imports: [ConfigModule.forFeature(config)],
  provide: 'SIGNER',
  useFactory: async (
    configuration: ConfigType<typeof config>,
    provider: ethers.providers.JsonRpcProvider,
  ) => {
    const signer = new ethers.Wallet(
      configuration.contracts.privateKey,
      provider,
    );

    console.log('signer', await signer.getChainId());

    return signer;
  },
  inject: [config.KEY, 'PROVIDER'],
};
