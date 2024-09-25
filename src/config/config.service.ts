import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig, appConfig } from './app.config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get config(): AppConfig {
    return this.configService.get('config', appConfig());
  }
}
