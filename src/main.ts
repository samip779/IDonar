import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MODE, PORT } from './environments';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DataSource } from 'typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/v1/api');

  if (MODE === 'dev') {
    // OpenAPI integration
    const config = new DocumentBuilder()
      .setTitle('IDonar')
      .setDescription('IDonar API Specification')
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  // global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // helmet helps secure apps by setting HTTP response headers
  app.use(helmet());

  // CORS setup
  app.enableCors();

  process.on('SIGTERM', () => {
    app.close();
    const dataSource: DataSource = app.get(DataSource);
    dataSource.destroy();
    process.exit(0);
  });

  await app.listen(PORT);
}
bootstrap();
