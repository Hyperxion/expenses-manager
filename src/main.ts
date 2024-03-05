import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });
  await app.listen(3000);
  console.log('App listening on port 3000');
  console.log(`Current stage is ${process.env.DB_PORT}`);
}
bootstrap();
