import { registerAs } from '@nestjs/config';

import env from './util/env';

export interface DataPipelineConfig {
  enabled: string;
}

export interface GatewayConfig {
  audience: string;
  clientId: string;
  clientSecret: string;
  domain: string;
  issuer: string;
}

export interface AppConfig {
  app: {
    name: string;
    environment: string;
    gateway: GatewayConfig;
  };
  dataPipeline: DataPipelineConfig;
}

export const appConfig = (): AppConfig => ({
  app: {
    name: env('APP_NAME', 'REPLACE-APPLICATION-NAME'),
    environment: env('APP_ENV', 'local'),
    gateway: {
      audience: env(
        'REPLACE_APPLICATION_NAME_AUTH0_AUDIENCE',
        'qa-rv-atx-internal-gateway-resource',
      ),
      clientId: env('REPLACE_APPLICATION_NAME_AUTH0_CLIENT_ID', ''),
      clientSecret: env('REPLACE_APPLICATION_NAME_AUTH0_CLIENT_SECRET', ''),
      domain: env(
        'REPLACE_APPLICATION_NAME_AUTH0_DOMAIN',
        'redventures-dev.auth0.com',
      ),
      issuer: env(
        'REPLACE_APPLICATION_NAME_AUTH0_ISSUER',
        'https://redventures-dev.auth0.com/',
      ),
    },
  },
  dataPipeline: {
    enabled: env('MAKE_EVENTS_ENABLED', 'false'),
  },
});

// Registering the config so it is accessible via
// this.configService.get('config')
export default registerAs('config', appConfig);
