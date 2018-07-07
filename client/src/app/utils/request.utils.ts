import {HttpHeaders} from '@angular/common/http';

import {StorageUtils} from 'app/utils/storage.utils';

interface HttpOptions {
  headers: HttpHeaders;
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

  private constructor() {

  }
}
