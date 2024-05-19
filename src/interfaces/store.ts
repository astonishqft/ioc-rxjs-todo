export interface Store {
  store(namespace: string): any
  store(namespace: string, data: any): void
}
