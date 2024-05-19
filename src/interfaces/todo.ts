import { Observable } from 'rxjs'
import type { ITodo } from '@/services/todo'

export interface Todo {
  todos: ITodo[]
  shownTodos: ITodo[]
  updated$: Observable<void>
  todoCount: number
  activeTodoCount: number
  completedCount: number
  addTodo(title: string): void
  destroy(todo: ITodo): void
  toggle(todoToToggle: ITodo): void
  save(todo: ITodo, text: string): void
  toggleAll(checked: boolean): void
  clearCompleted(): void
}
