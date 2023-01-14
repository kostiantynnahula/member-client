import { AuthDetails } from '../models/auth';

export class LocalStorageService {

  public static setItem<T>(key: string, data: T | Record<string, string>): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public static getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    }

    return null;
  }

  public static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public static setAuth(data: AuthDetails) {
    LocalStorageService.setItem<AuthDetails>('auth', data);
  }
  
  public static getAuth(): AuthDetails | null {
    return LocalStorageService.getItem<AuthDetails>('auth');
  }
}