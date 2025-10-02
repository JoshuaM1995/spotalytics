declare module "localstorage-ttl" {
  interface LocalStorageTTL {
    get(key: string): any;
    set(key: string, value: any, ttl?: number): void;
    remove(key: string): void;
    clear(): void;
  }

  const localStorageTTL: LocalStorageTTL;
  export default localStorageTTL;
}
