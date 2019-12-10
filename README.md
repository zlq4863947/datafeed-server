# datafeed-server
tradingview data server

## 安装

```
npm install datafeed-server
```

## 启动

```
import { DatafeedApp, IDatafeeder } from 'datafeed-server';

(async function bootstrap() {
  const datafeeder: IDatafeeder = {
    getServerTime: () => {
      return 'get test time';
    },
    resolveSymbol: () => {
      return Promise.resolve(undefined);
    },
    getHistory: () => {
      return Promise.resolve(undefined);
    },
    searchSymbols: () => {
      return Promise.resolve(undefined);
    },
  };
  const app = new DatafeedApp({
    port: 3000,
    datafeeder,
  });
  await app.start();
})();
```

## rest-api 请求功能

```
  import { RequestParams, Requester } from 'datafeed-server';

  const getHuobiHistory = async () => {
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

```

## 自定义接口功能

````
import { DatafeedApp, IDatafeeder } from 'datafeed-server';

(async function bootstrap() {
  const datafeeder: IDatafeeder = {
    custom: async (json: string) => {
      console.log('custom, json:', JSON.parse(json));
    },
    ...
  };
  const app = new DatafeedApp({
    port: 3000,
    datafeeder,
  });
  await app.start();
})();
```

请求例： http://127.0.0.1:3000/custom?json={"a":1,"b":"sss"}
控制台输出：custom, json: { a: 1, b: 'sss' }
