import * as IDatafeed from './datafeed-api.type';
import { UdfCompatibleConfiguration } from './datafeed.service';

export interface ISimpleDatafeeder {
  resolveSymbol(symbolName: string): Promise<IDatafeed.LibrarySymbolInfo | undefined>;
  getHistory(symbolName: string, from: number, to: number, resolution: string);
  searchSymbols(
    userInput: string,
    exchange: string,
    symbolType: string,
    maxRecords?: number,
  ): Promise<IDatafeed.SearchSymbolResultItem[] | undefined>;
}

export interface IDatafeeder extends ISimpleDatafeeder {
  supported_resolutions?: string[];
  getConfig?: () => UdfCompatibleConfiguration;
  getServerTime?: () => string;
}
