import * as IDatafeed from './datafeed-api.d';
import { UdfCompatibleConfiguration } from './datafeed.service';

export interface ISimpleDatafeedService {
    supported_resolutions: string[];
    resolveSymbol(symbolName: string): Promise<IDatafeed.LibrarySymbolInfo | undefined>;
    getHistory(symbolName: string, from: number, to: number, resolution: string);
    searchSymbols(
      userInput: string,
      exchange: string,
      symbolType: string,
      maxRecords?: number,
    ): Promise<IDatafeed.SearchSymbolResultItem[] | undefined>;
}

export interface IDatafeedService extends ISimpleDatafeedService {
  supported_resolutions: string[];
  getConfig(): UdfCompatibleConfiguration;
  getServerTime(): string;
}
