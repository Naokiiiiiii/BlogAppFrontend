export class StorageHelper {
  private storage: Storage | undefined;

  constructor(storage: Storage | undefined = undefined) {
    if (!storage && typeof window !== 'undefined') {
      this.storage = window.localStorage;
    } else {
      this.storage = storage;
    }
  }

  has(key: string): boolean {
    return this.storage?.getItem(key) != null;
  }

  get(key: string): string | undefined {
    // nullは利用せず `undefined` を返す
    return this.storage?.getItem(key) ?? undefined;
  }

  set(key: string, value: string): void {
    this.storage?.setItem(key, value);
  }

  remove(key: string): void {
    this.storage?.removeItem(key);
  }
}