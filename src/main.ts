import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './environments';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
