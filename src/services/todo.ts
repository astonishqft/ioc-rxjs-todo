import SERVICE_IDENTIFIER from '@/constants/identifiers'
import { injectable, inject } from 'inversify'
import { Subject } from 'rxjs'
import { v4 as uuid } from 'uuid'
import type { Store } from '@/interfaces/store'
import type { State } from '@/interfaces/state'
import { SHOWING } from './state'

export interface ITodo {
  id: string
  title: string
  completed: boolean
}

@injectable()
export class TodoService {
  todos: ITodo[] = []
  updated$ = new Subject<void>()

  get shownTodos(): ITodo[] {
    return this.todos.filter((todo) => {
      switch (this.stateService.nowShowing) {
        case SHOWING.ACTIVE_TODOS:
          return !todo.completed
        case SHOWING.COMPLETED_TODOS:
          return todo.completed
        default:
          return true
      }
    })
  }

  get todoCount(): number {
    return this.todos.length
  }

  get activeTodoCount(): number {
    return this.todos.reduce((acc, todo) => (todo.completed ? acc : acc + 1), 0)
  }

  get completedCount(): number {
    return this.todos.length - this.activeTodoCount
  }

  constructor(
    @inject(SERVICE_IDENTIFIER.STORE) private storeService: Store,
    @inject(SERVICE_IDENTIFIER.STATE) private stateService: State
  ) {
    this.todos = this.storeService.store('TODO')
  }

  inform() {
    this.storeService.store('TODO', this.todos)
    this.updated$.next()
    // debugger
  }

  addTodo(title: string): void {
    this.todos = this.todos.concat({
      id: uuid(),
      title: title,
      completed: false
    })

    this.inform()
  }

  toggleAll(checked: boolean): void {
    this.todos = this.todos.map<ITodo>((todo: ITodo) => ({
      ...todo,
      completed: checked
    }))

    this.inform()
  }

  toggle(todoToToggle: ITodo) {
    this.todos = this.todos.map<ITodo>((todo: ITodo) => {
      return todo.id !== todoToToggle.id ? todo : { ...todo, completed: !todo.completed }
    })

    this.inform()
  }

  destroy(todo: ITodo) {
    this.todos = this.todos.filter((candidate) => candidate.id !== todo.id)
    // debugger
    this.inform()
  }

  save(todoToSave: ITodo, text: string) {
    this.todos = this.todos.map((todo) => (todo !== todoToSave ? todo : { ...todo, title: text }))

    this.inform()
  }

  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed)

    this.inform()
  }
}
