import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { DatafeedService } from './datafeed.service';
import { HttpExceptionFilter } from './http-exception.filter';
import { IDatafeeder } from './datafeeder.type';
import * as cors from 'cors';

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
      service.supported_resolutions = datafeeder.supported_resolutions;
    }
    if (datafeeder.getConfig) {
      service.getConfig = datafeeder.getConfig;
    }
    if (datafeeder.getServerTime) {
      service.getServerTime = datafeeder.getServerTime;
    }
    if (datafeeder.custom) {
      service.custom = datafeeder.custom;
    }
    service.resolveSymbol = datafeeder.resolveSymbol;
    service.getHistory = datafeeder.getHistory;
    service.searchSymbols = datafeeder.searchSymbols;
    const keys = Object.keys(datafeeder);
    for (const key of keys) {
      service[key] = datafeeder[key];
    }
  }

  async start() {
    this.app = await NestFactory.create(AppModule);
    this.app.use(cors());
    // this.app.enableCors();
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
