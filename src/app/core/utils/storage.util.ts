export class StorageUtil {
  static getJSON<T>(key: string, fallback: T): T {
    try { return JSON.parse(localStorage.getItem(key) || '') as T; }
    catch { return fallback; }
  }
  static setJSON(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
