import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { connectToServices } from '@opfr/services';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    abortOnError: false,
  });

  app.setGlobalPrefix('/api');

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

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  connectToServices(`${process.env.DB_URI}/${process.env.DB_NAME}`);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
