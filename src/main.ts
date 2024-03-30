import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });

  // Setting up swagger
  const config = new DocumentBuilder()
    .setTitle('Expenses Manager API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());
  //app.useLogger(app.get(WINSTON_MODULE_PROVIDER));

  const port: number | null = +process.env.APP_PORT!;
  await app.listen(port);
  console.log(`Application listening on port ${port}`);
}
bootstrap();
