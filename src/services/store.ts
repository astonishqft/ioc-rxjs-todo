import { injectable } from 'inversify'
import type { Store } from '@/interfaces/store'

@injectable()
export class StoreService implements Store {
  store(namespace: string): any
  store(namespace: string, data: any): void
  store(namespace: string, data?: any): void | any {
    if (data) {
      return localStorage.setItem(namespace, JSON.stringify(data))
    } else {
      const store = localStorage.getItem(namespace)
      return (store && JSON.parse(store)) || []
    }
  }
}
