import * as fs from 'fs';

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// This needs to look at `dist/` because the Nest CLI adds OpenAPI annotations
// to the transpiled code.
// Ignore this warning because otherwise you can't build to generate this directory
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AppModule } from '../dist/app.module';
import { API_DOCS_CONFIG } from '../src/api-docs/api-docs.constants';

/**
 * Generates an OpenAPI 3.0 spec JSON file based on NestJS's built-in OpenAPI
 * documentation generation using decorators.
 *
 * For more information, see https://docs.nestjs.com/openapi/introduction.
 */
function generateOpenAPISpec(app: INestApplication, filename: string): void {
  const docsOptions = new DocumentBuilder()
    .setTitle(API_DOCS_CONFIG.title)
    .setDescription(API_DOCS_CONFIG.description)
    .setVersion(API_DOCS_CONFIG.version)
    .setExternalDoc(
      API_DOCS_CONFIG.externalDoc.description,
      API_DOCS_CONFIG.externalDoc.url,
    )
    .build();
  const document = SwaggerModule.createDocument(app, docsOptions);
  fs.writeFileSync(`./${filename}`, JSON.stringify(document, null, 2));
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  generateOpenAPISpec(app, 'REPLACE-APPLICATION-NAME-swagger.json');
}

bootstrap();
