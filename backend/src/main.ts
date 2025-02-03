import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'], // Aumenta o log
  });
  const configService = app.get(ConfigService);
  
  // Configuração mais permissiva do CORS
  app.enableCors({
    origin: '*', // Permite todas as origens
    methods: '*',
    allowedHeaders: '*',
  });
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  
  const port = configService.get<number>('PORT') || 3000;
  
  // Adiciona um log para confirmar que o servidor iniciou
  console.log(`Application is running on: http://localhost:${port}`);
  
  await app.listen(port, '0.0.0.0');
}
bootstrap();