import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { signerProvider } from './contracts.provider';
import config from 'src/config/config';

@Module({
  imports: [ConfigModule.forFeature(config)],
  providers: [signerProvider],
  exports: ['SIGNER'],
})
export class ContractsModule {}
