import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger 세팅
 */
export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Deskting Back-end Api Docs')
    .setDescription('The test API description')
    .setVersion('1.0')
    .addTag('users')
    .addTag('schools')
    .addTag('news')
    .addTag('newsfeeds')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
