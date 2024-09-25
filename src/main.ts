require('newrelic');

import {
  NewRelicInterceptor,
  getLogLevel,
} from '@creditcardscom/nestjs-shared';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { API_DOCS_CONFIG } from './api-docs/api-docs.constants';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevel(),
  });

  app.useGlobalInterceptors(new NewRelicInterceptor());

  if (process.env.APP_ENV === 'local') {
    // Setup Swagger API docs
    const options = new DocumentBuilder()
      .setTitle(API_DOCS_CONFIG.title)
      .setDescription(API_DOCS_CONFIG.description)
      .setVersion(API_DOCS_CONFIG.version)
      .setExternalDoc(
        API_DOCS_CONFIG.externalDoc.description,
        API_DOCS_CONFIG.externalDoc.url,
      )
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document, {
      customSiteTitle: 'REPLACE APPLICAITON NAME Docs',
      customCssUrl:
        'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-flattop.css',
      swaggerOptions: {
        supportedSubmitMethods: [],
      },
    });
  }

  await app.listen(3000);
}
bootstrap();
