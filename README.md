# datafeed-server
tradingview data server

## 安装

```
npm install datafeed-server
```

## 启动

```
import { DatafeedApp, IDatafeeder } from '../src/index';

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
