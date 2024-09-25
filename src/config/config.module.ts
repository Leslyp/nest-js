import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';

import config from './app.config';
import { AppConfigService } from './config.service';
import { validationSchema } from './validation.schema';

type ConfigSchema = Pick<
  ConfigModuleOptions,
  'validationSchema' | 'validationOptions' | 'expandVariables'
>;

/**
 * Main configuration for the config service (heh).
 *
 * See the `ConfigModuleOptions` type above and NestJS configuration
 * documentation for additional options.
 *
 * https://docs.nestjs.com/techniques/configuration
 */
const configSchema: ConfigSchema = {
  validationSchema,
  validationOptions: {
    allowUnknown: true,
    abortEarly: false,
  },
  expandVariables: true,
};

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      ...configSchema,
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
