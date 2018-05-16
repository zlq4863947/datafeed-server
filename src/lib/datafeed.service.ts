import { Component, HttpStatus } from '@nestjs/common';

import * as IDatafeed from './datafeed-api.type';
import * as IDatafeedServ from './datafeeder.type';

export interface UdfCompatibleConfiguration extends IDatafeed.DatafeedConfiguration {
  supports_search?: boolean;
  supports_group_request?: boolean;
}

export { IDatafeed };

@Component()
export class DatafeedService implements IDatafeedServ.IDatafeeder {
  supported_resolutions = ['1', '5', '15', '30', '60', '1D', '1W', '1M'];

  getConfig(): UdfCompatibleConfiguration {
    return {
      supports_search: true,
      supports_group_request: false,
      supported_resolutions: this.supported_resolutions,
      supports_marks: false,
      supports_time: true,
    };
  }

  getServerTime(): string {
    return Math.floor(Date.now() / 1000) + '';
  }

  async resolveSymbol(symbolName: string): Promise<IDatafeed.LibrarySymbolInfo | undefined> {
    return;
  }

  async getHistory(symbolName: string, from: number, to: number, resolution: string) {
    return;
  }

  async searchSymbols(
    userInput: string,
    exchange: string,
    symbolType: string,
    maxRecords?: number,
  ): Promise<IDatafeed.SearchSymbolResultItem[] | undefined> {
    return;
  }
}
