import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });

  /**
   * Now we can run
   *
   * `npm run start -- --seed`
   *
   * or if there is `package.json` seed script:
   *
   * `npm run seed`
   */
  if (process.argv.includes('--seed')) {
    const seeder = app.get(SeedService);
    await seeder.seedDatabase();
    await app.close();
    return;
  }

  const config = new DocumentBuilder()
    .setTitle('Expenses Manager API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const port: number | null = +process.env.APP_PORT!;
  await app.listen(port);
  console.log(`Application listening on port ${port}`);
}
bootstrap();
