import { Observable } from 'rxjs'
import { SHOWING } from '@/services/state'

export interface State {
  nowShowing: SHOWING
  editing?: string
  updated$: Observable<void>

  setEditing(id: string): void
}
