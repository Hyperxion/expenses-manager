import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });
  app.useGlobalPipes(new ValidationPipe());
  const port: number | null = +process.env.PORT!;
  await app.listen(port);
  console.log(`Application listening on port ${port}`);
  // await app.listen(3000);
  // console.log('App listening on port 3000');
}
bootstrap();
