import {HttpHeaders} from '@angular/common/http';

import {StorageUtils} from 'app/utils/storage.utils';

interface HttpOptions {
  headers: HttpHeaders;
}

export class RequestUtils {

  public static getApiUrl(url: string): string {
    return process.env.API_URL + url;
  }

  public static getJsonOptions(): HttpOptions {
    const headers: any = {'Content-Type': 'application/json'};
    const apiToken = StorageUtils.getApiToken();
    if (apiToken) {
      headers.authorization = `Bearer ${apiToken}`;
    }
    return {headers: new HttpHeaders(headers)};
  }

  public static getOptions(): HttpOptions {
    const headers = new HttpHeaders({});
    const apiToken = StorageUtils.getApiToken();
    if (apiToken) {
      headers.set('Authorization', `Bearer ${apiToken}`);
    }
    return {headers};
  }

  private constructor() {

  }
}
