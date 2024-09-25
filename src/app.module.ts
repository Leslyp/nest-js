import { Auth0Module, NewRelicModule } from '@creditcardscom/nestjs-shared';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    AppConfigModule,
    Auth0Module.registerAsync({
      imports: [AppConfigModule],
      useFactory: (appConfigService: AppConfigService) => ({
        useValuesDirectly: true,
        audienceKey: appConfigService.config.app.gateway.audience,
        issuerKey: appConfigService.config.app.gateway.issuer,
      }),
      inject: [AppConfigService],
    }),
    NewRelicModule,
    HttpModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
