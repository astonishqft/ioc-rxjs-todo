import { Observable } from 'rxjs'

export interface Router {
  router$: Observable<string>
}
