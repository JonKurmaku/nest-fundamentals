import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { seedData } from 'db/seeds/seed-data';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  const seedService = app.get(SeedService)
  await seedService.seed()

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
