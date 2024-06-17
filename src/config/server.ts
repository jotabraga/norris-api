// import { registerAs } from '@nestjs/config';

// export interface ServerConfig {
//   port: number;
//   keepAliveTimeout: number;
//   account: IAccount;
//   env: string;
//   allowExternalProviders: string;
//   gptActiveEventRefreshCronTime: string;
//   gptActiveTotal: number;
//   allowGptActiveTotal: boolean;
//   allowGptActive: boolean;
//   eventCloseCronTime: string;
//   sentryDns: string;
// }

// export const loadConfigFromEnv = (): ServerConfig => ({
//   port: parseInt(process.env.PORT, 10) || 3000,
// });

// export default registerAs('server', loadConfigFromEnv);
