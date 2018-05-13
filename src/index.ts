import { NestFactory } from '@nestjs/core';
import { AppModule } from './lib/app.module';
import { HttpExceptionFilter } from './lib/http-exception.filter';

const config = require('config');

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(config.server.port ? config.server.port : 8888);
})();
