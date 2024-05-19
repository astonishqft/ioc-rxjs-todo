import { Subject } from 'rxjs'
import { injectable } from 'inversify'

@injectable()
export class RouterService {
  router$ = new Subject<string>()

  constructor() {
    window.addEventListener('hashchange', (e) => {
      const url = e.newURL
      const segment = url.split('#')[1] || '/'

      this.router$.next(segment)
    })
  }
}
