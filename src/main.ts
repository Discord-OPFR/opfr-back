import { ERROR_TYPES } from '@auth/schemas/auth.schema';
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

const URL_WHITELIST = ['https://dashboard.onepiecefr.com'];
const DEV_URL_WHITELIST = ['http://localhost:5173', 'http://localhost:3000'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    abortOnError: false,
  });
  const server = app.getHttpAdapter().getInstance();

  server.set('trust proxy', 1);
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('OPFR API')
    .setDescription('OPFR Fabulous API')
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_, method) => method,
    // ignoreGlobalPrefix: true,
  };
  const documentFactory = () => {
    const document = SwaggerModule.createDocument(app, config, options);
    document.components = document.components || {};
    document.components.schemas = document.components.schemas || {};
    document.components.schemas['ERROR_TYPES'] = {
      type: 'string',
      enum: Object.values(ERROR_TYPES),
    };
    return document;
  };
  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'docs/json',
    useGlobalPrefix: true,
  });

  app.use(cookieParser(process.env.COOKIE_SECRET));

  app.enableCors({
    origin: (
      origin: string,
      callback: (error: null | Error, options?: boolean) => void,
    ) => {
      const whitelist =
        process.env.NODE_ENV !== 'production'
          ? DEV_URL_WHITELIST
          : URL_WHITELIST;

      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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
