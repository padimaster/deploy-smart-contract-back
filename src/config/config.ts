import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  contracts: {
    publicAddress: process.env.PUBLIC_ADDRESS,
    privateKey: process.env.PRIVATE_KEY,
    providerURL: process.env.PROVIDER_URL,
    providerProjectId: process.env.PROVIDER_PROJECT_ID,
    providerApiKey: process.env.PROVIDER_API_KEY,
  },
}));
