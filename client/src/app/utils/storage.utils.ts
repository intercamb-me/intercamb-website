export class StorageUtils {

  private static readonly API_TOKEN: string = 'API_TOKEN';

  public static setApiToken(apiToken: string): void {
    localStorage.setItem(StorageUtils.API_TOKEN, apiToken);
  }

  public static getApiToken(): string {
    return localStorage.getItem(StorageUtils.API_TOKEN);
  }

  public static removeApiToken(): void {
    localStorage.removeItem(StorageUtils.API_TOKEN);
  }

  private constructor() {

  }
}
