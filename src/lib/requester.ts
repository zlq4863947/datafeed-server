const fetch = require('node-fetch');

export interface RequestParams {
  [paramName: string]: string | string[] | number;
}

export class Requester {
  private _headers: HeadersInit | undefined;

  public constructor(headers?: HeadersInit) {
    if (headers) {
      this._headers = headers;
    }
  }

  public send<T>(datafeedUrl: string, urlPath: string, params?: RequestParams): Promise<T> {
    if (params !== undefined) {
      const paramKeys = Object.keys(params);
      if (paramKeys.length !== 0) {
        urlPath += '?';
      }

      urlPath += paramKeys
        .map((key: string) => {
          return `${encodeURIComponent(key)}=${encodeURIComponent(params[key].toString())}`;
        })
        .join('&');
    }

    // Send user cookies if the URL is on the same origin as the calling script.
    const options: RequestInit = { credentials: 'same-origin' };

    if (this._headers !== undefined) {
      options.headers = this._headers;
    }

    return fetch(`${datafeedUrl}${urlPath}`, options)
      .then((response: Response) => response.text())
      .then((responseTest: string) => JSON.parse(responseTest));
  }
}
