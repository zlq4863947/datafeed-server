import { DatafeedApp, IDatafeeder } from '../src/index';

(async () => {
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

  setTimeout(async () => {
    await app.close();
  }, 1500);
})();
