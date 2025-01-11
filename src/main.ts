import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfigService } from './config/app/config.service';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);
  const appConfigService: AppConfigService = app.get(AppConfigService);
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: '1',
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    forbidNonWhitelisted: true,
  }))
  app.useGlobalFilters(new HttpExceptionFilter());
  app.listen(appConfigService.port);
}
bootstrap();
