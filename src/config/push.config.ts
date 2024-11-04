import { registerAs } from '@nestjs/config';

export default registerAs('signer', () => ({
  privateKey: process.env.PRIVATE_KEY,
}));
