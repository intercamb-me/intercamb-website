export class StorageUtils {

  private static readonly API_TOKEN: string = 'API_TOKEN';
  private static readonly MEMORY_STORAGE: any = {};

  public static set(key: string, value: string): void {
    try {
      if (localStorage) {
        localStorage.setItem(key, value);
      } else {
        StorageUtils.MEMORY_STORAGE[key] = value;
      }
    } catch (err) {
      StorageUtils.MEMORY_STORAGE[key] = value;
    }
  }

  public static get(key: string): string {
    let value;
    if (localStorage) {
      value = localStorage.getItem(key) || StorageUtils.MEMORY_STORAGE[key];
    } else {
      value = StorageUtils.MEMORY_STORAGE[key];
    }
    return value || null;
  }

  public static remove(key: string): void {
    if (localStorage) {
      localStorage.removeItem(key);
    }
    delete StorageUtils.MEMORY_STORAGE[key];
  }

  public static setApiToken(apiToken: string): void {
    StorageUtils.set(StorageUtils.API_TOKEN, apiToken);
  }

  public static getApiToken(): string {
    return StorageUtils.get(StorageUtils.API_TOKEN);
  }

  public static removeApiToken(): void {
    StorageUtils.remove(StorageUtils.API_TOKEN);
  }

  private constructor() {

  }
}
