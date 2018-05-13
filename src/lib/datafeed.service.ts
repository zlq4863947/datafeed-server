import { Component, HttpStatus } from '@nestjs/common';

import * as IDatafeed from './datafeed-api.d';
import * as fetch from 'isomorphic-fetch';
import * as IDatafeedServ from './datafeed.service.d';

export interface UdfCompatibleConfiguration extends IDatafeed.DatafeedConfiguration {
  supports_search?: boolean;
  supports_group_request?: boolean;
}

export { IDatafeed };

@Component()
export class DatafeedService implements IDatafeedServ.IDatafeedService {
  supported_resolutions = ['1', '5', '15', '30', '60', '1D', '1W', '1M'];
  dataFeeder: IDatafeedServ.IDatafeedService;

  constructor(dataFeeder: IDatafeedServ.IDatafeedService | IDatafeedServ.ISimpleDatafeedService) {
    this.dataFeeder = <IDatafeedServ.IDatafeedService>dataFeeder;
  }

  getConfig(): UdfCompatibleConfiguration {
    if (this.dataFeeder.getConfig) {
      return this.dataFeeder.getConfig()
    }
    return {
      supports_search: true,
      supports_group_request: false,
      supported_resolutions: this.supported_resolutions,
      supports_marks: false,
      supports_time: true
    };
  }

  getServerTime(): string {
    if (this.dataFeeder.getServerTime) {
      return this.dataFeeder.getServerTime()
    }
    return Math.floor(Date.now() / 1000) + '';
  }

  async resolveSymbol(symbolName: string): Promise<IDatafeed.LibrarySymbolInfo | undefined> {
    return await this.dataFeeder.resolveSymbol(symbolName);
  }

  async getHistory(symbolName: string, from: number, to: number, resolution: string) {
    return await this.dataFeeder.getHistory(symbolName, from, to, resolution);
  }

  async searchSymbols(
    userInput: string,
    exchange: string,
    symbolType: string,
    maxRecords?: number,
  ): Promise<IDatafeed.SearchSymbolResultItem[] | undefined> {
    return await this.dataFeeder.searchSymbols(userInput, exchange, symbolType, maxRecords);
  }

}
