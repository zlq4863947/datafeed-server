import { Get, Response, Query, Controller, HttpStatus, UseFilters, HttpException } from '@nestjs/common';

import { DatafeedService } from './datafeed.service';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller()
export class DatafeedController {
  constructor(private datafeedService: DatafeedService) { }

  private setDefaultHeader(res: any) {
    res.header('Access-Control-Allow-Origin', '*');
    // list of methods (e.g GET,HEAD,PUT,PATCH,POST,DELETE)
    res.header('Access-Control-Allow-Methods', 'GET');
  }

  @Get('time')
  time(@Response() res: any) {
    console.log(new Date().toLocaleString(), '- GET time');
    try {
      this.setDefaultHeader(res);
      const time = this.datafeedService.getServerTime();
      res.status(HttpStatus.OK).send(time);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.OK);
    }
  }

  @Get('config')
  config(@Response() res: any) {
    console.log(new Date().toLocaleString(), '- GET config');
    try {
      this.setDefaultHeader(res);
      const config = this.datafeedService.getConfig();
      res.status(HttpStatus.OK).send(config);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.OK);
    }
  }

  @Get('symbols')
  async symbols(@Response() res: any, @Query('symbol') symbol: string) {
    console.log(new Date().toLocaleString(), '- GET symbols, symbol: ', symbol);
    try {
      this.setDefaultHeader(res);
      const symbolInfo = await this.datafeedService.resolveSymbol(symbol);
      res.status(HttpStatus.OK).send(symbolInfo);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.OK);
    }
  }

  @Get('history')
  async history(
    @Response() res: any,
    @Query('symbol') symbol: string,
    @Query('from') from: number,
    @Query('to') to: number,
    @Query('resolution') resolution: string,
  ) {
    console.log(new Date().toLocaleString(), '- GET history, symbol: ', symbol, ' from: ', from, ' to: ', to, ' resolution: ', resolution);
    try {
      this.setDefaultHeader(res);
      const history = await this.datafeedService.getHistory(symbol, from, to, resolution);
      res.status(HttpStatus.OK).send(history);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.OK);
    }
  }

  @Get('search')
  async search(
    @Response() res: any,
    @Query('query') query: string,
    @Query('type') type: string,
    @Query('exchange') exchange: string,
    @Query('limit') limit: number,
  ) {
    console.log(new Date().toLocaleString(), '- GET search, query: ', query, ' type: ', type, ' exchange: ', exchange, ' limit: ', limit);
    try {
      this.setDefaultHeader(res);
      const searchRes = await this.datafeedService.searchSymbols(query, exchange, type, limit);
      res.status(HttpStatus.OK).send(searchRes);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.OK);
    }
  }
}
