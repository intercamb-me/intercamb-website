import {HttpHeaders, HttpParams} from '@angular/common/http';

import {StorageUtils} from 'app/utils/storage.utils';

interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  observe?: 'body';
}

export class RequestUtils {

  private static readonly HEADER_AUTHORIZATION = 'Authorization';

  public static getApiUrl(url: string): string {
    return process.env.API_URL + url;
  }

  public static getJsonOptions(customHeaders?: any): HttpOptions {
    return RequestUtils.getOptions({
      ...customHeaders,
      'Content-Type': 'application/json',
    });
  }

  public static getOptions(customHeaders?: any): HttpOptions {
    const headers: any = {...customHeaders};
    const apiToken = StorageUtils.getApiToken();
    if (apiToken) {
      headers[RequestUtils.HEADER_AUTHORIZATION] = `Bearer ${apiToken}`;
    }
    return {headers: new HttpHeaders(headers)};
  }

  public static fillOptionsParams(httpParams: HttpParams, options: any): HttpParams {
    let filledParams = httpParams;
    if (options) {
      if (options.populate) {
        filledParams = filledParams.set('populate', options.populate);
      }
      if (options.select) {
        filledParams = filledParams.set('select', options.select);
      }
    }
    return filledParams;
  }

  private constructor() {

  }
}
