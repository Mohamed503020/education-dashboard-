import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const isProduction = configService.get('NODE_ENV') === 'production';

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS configuration
  const corsOrigin = configService.get('CORS_ORIGIN') || 'http://localhost:4200';
  app.enableCors({
    origin: isProduction
      ? corsOrigin.split(',')
      : ['http://localhost:4200', 'http://localhost:4201'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Static files for uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // API prefix
  app.setGlobalPrefix('api');

  // In production, serve Angular frontend
  const frontendPath = join(__dirname, '..', '..', 'dist', 'education-dashboard', 'browser');
  if (isProduction && existsSync(frontendPath)) {
    app.useStaticAssets(frontendPath);
    // SPA fallback — serve index.html for non-API routes
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.get(/^\/(?!api|uploads).*/, (_req: any, res: any) => {
      res.sendFile(join(frontendPath, 'index.html'));
    });
  }

  const port = configService.get('PORT') || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server is running on: http://localhost:${port}`);
  console.log(`📚 Environment: ${isProduction ? 'production' : 'development'}`);
}

bootstrap();
