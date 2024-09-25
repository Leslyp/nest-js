import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AppConfigService } from './config.service';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [AppConfigService],
    }).compile();

    service = await module.resolve<AppConfigService>(AppConfigService);

    configService = await module.resolve<ConfigService>(ConfigService);
  });

  it('returns config', () => {
    const mockConfigObject = {
      app: {
        things: 'stuff',
      },
      database: {
        port: '1234',
      },
    };

    const mockConfigService = jest
      .spyOn(configService, 'get')
      .mockReturnValue(mockConfigObject);

    const appConfig = service.config;

    expect(mockConfigService).toBeCalledTimes(1);
    expect(appConfig).toEqual(mockConfigObject);
  });
});
