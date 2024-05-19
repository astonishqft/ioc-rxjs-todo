import { Subject } from 'rxjs'
import { injectable, inject } from 'inversify'
import SERVICE_IDENTIFIER from '@/constants/identifiers'
import type { Router } from '@/interfaces/router'

export enum SHOWING {
  ALL_TODOS,
  ACTIVE_TODOS,
  COMPLETED_TODOS
}

@injectable()
export class StateService {
  nowShowing: SHOWING = SHOWING.ALL_TODOS
  editing?: string
  updated$ = new Subject<void>()

  constructor(@inject(SERVICE_IDENTIFIER.ROUTER) private routerService: Router) {
    this.routerService.router$.subscribe((router) => {
      this.nowShowing =
        router === '/active'
          ? SHOWING.ACTIVE_TODOS
          : router === '/completed'
            ? SHOWING.COMPLETED_TODOS
            : SHOWING.ALL_TODOS
      this.updated$.next()
    })
  }

  setEditing(id: string): void {
    this.editing = id
    this.update()
  }

  private update(): void {
    this.updated$.next()
  }
}
