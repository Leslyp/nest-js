import { Injectable } from '@nestjs/common';

import { AppConfig } from '../../src/config/app.config';

@Injectable()
export class AppConfigServiceMock {
  get config(): AppConfig {
    return {
      app: {
        name: 'approval-odds-api-test',
        environment: 'test',
        gateway: {
          audience: 'test_audience',
          clientId: 'test_clientId',
          clientSecret: 'test_clientSecret',
          domain: 'test_domain',
          issuer: 'fake_issuer',
        },
      },
      dataPipeline: {
        enabled: 'true',
      },
    };
  }
}
