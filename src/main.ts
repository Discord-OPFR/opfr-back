import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    abortOnError: false,
  });

  const config = new DocumentBuilder()
    .setTitle('OPFR API')
    .setDescription('OPFR Fabulous API')
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_, method) => method,
  };
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'docs/json',
  });

  app.use(cookieParser(process.env.COOKIE_SECRET));

  app.enableCors({
    origin: process.env.HOST,
    credentials: true,
  });

  app.setGlobalPrefix('/api');

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
