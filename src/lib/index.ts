import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { DatafeedService } from './datafeed.service';
import { HttpExceptionFilter } from './http-exception.filter';
import { IDatafeeder } from './datafeeder.type';

export * from './datafeed-api.type';
export * from './datafeeder.type';
export * from './datafeed.service';
export * from './requester';

export interface IDatafeedAppOptions {
  port?: number;
  datafeeder: IDatafeeder;
}

export class DatafeedApp {
  options: IDatafeedAppOptions;
  datafeeder: IDatafeeder;
  app?: INestApplication;

  constructor(options: IDatafeedAppOptions) {
    this.options = options;
    this.datafeeder = options.datafeeder;
  }

  private initService(service: DatafeedService) {
    const datafeeder = this.datafeeder;
    if (datafeeder.supported_resolutions) {
      service.supported_resolutions = service.supported_resolutions;
    }
    if (datafeeder.getConfig) {
      service.getConfig = datafeeder.getConfig;
    }
    if (datafeeder.getServerTime) {
      service.getServerTime = datafeeder.getServerTime;
    }
    service.resolveSymbol = datafeeder.resolveSymbol;
    service.getHistory = service.getHistory;
    service.searchSymbols = service.searchSymbols;
  }

  async start() {
    this.app = await NestFactory.create(AppModule);
    this.app.useGlobalFilters(new HttpExceptionFilter());
    const service = this.app.select(AppModule).get(DatafeedService);
    this.initService(service);
    await this.app.listen(this.options.port ? this.options.port : 8888);
  }

  async close() {
    if (this.app) {
      await this.app.close();
    }
  }
}
