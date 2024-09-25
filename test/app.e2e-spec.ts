import {
  Auth0Provider,
  Auth0ProviderMock,
  JwtStrategy,
  JwtStrategyMock,
  NewRelicService,
  NewRelicServiceMock,
  TestLogger,
  mockJwtVerify,
} from '@creditcardscom/nestjs-shared';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import { AppConfigService } from '../src/config/config.service';
import { AppConfigServiceMock } from './mocks/app-config-service.mock';

jest.mock('jsonwebtoken');

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const testLogger = new TestLogger();

    mockJwtVerify();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .setLogger(testLogger)
      .overrideProvider(Auth0Provider)
      .useClass(Auth0ProviderMock)
      .overrideProvider(AppConfigService)
      .useClass(AppConfigServiceMock)
      .overrideProvider(NewRelicService)
      .useClass(NewRelicServiceMock)
      .overrideProvider(JwtStrategy)
      .useClass(JwtStrategyMock)
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
