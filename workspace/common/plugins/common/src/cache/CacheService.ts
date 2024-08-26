export class CacheService<T> {
  private cache: Map<string, T> = new Map();

  set(key: string, value: T): void {
    this.cache.set(key, value);
    console.info(`Data cached for key: ${key}`);
  }

  get(key: string): T | undefined {
    return this.cache.get(key);
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}
