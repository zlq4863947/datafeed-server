import * as assert from 'power-assert';
import { RequestParams, Requester } from '../src/lib/requester';


const testHuobiHistory = async () => {
  const apiUrl = 'https://api.huobipro.com';


  const requestParams: RequestParams = {
    symbol: 'btcusdt',
    period: '1day',
    size: 200
  };

  const requester = new Requester();
  const res = await requester.send(apiUrl, '/market/history/kline', requestParams);
  console.log(res);
};

describe('Rest-API测试', () => {
  it('火币行情接口测试', testHuobiHistory);
});
