import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    exposedHeaders: 'Location'
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(
    session({
      secret: '1234',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge:6000
      }
      
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // Configure Swagger options
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for the application')
    .setVersion('1.0')
    //.addBearerAuth() // Optional: Adds authorization header
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger module
  SwaggerModule.setup('api', app, document);


  const PORT = process.env.PORT || 3001;
  await app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
}
bootstrap();
