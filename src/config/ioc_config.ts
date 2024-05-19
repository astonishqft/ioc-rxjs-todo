// import 'reflect-metadata'

import { Container } from 'inversify'
import { RouterService } from '@/services/router'
import { StateService } from '@/services/state'
import { StoreService } from '@/services/store'
import { TodoService } from '@/services/todo'

import type { Router } from '@/interfaces/router'
import type { State } from '@/interfaces/state'
import type { Store } from '@/interfaces/store'
import type { Todo } from '@/interfaces/todo'

import SERVICE_IDENTIFIER from '@/constants/identifiers'

const container = new Container()

container.bind<Store>(SERVICE_IDENTIFIER.STORE).to(StoreService).inSingletonScope() // 指定作用于为单例
container.bind<Router>(SERVICE_IDENTIFIER.ROUTER).to(RouterService).inSingletonScope() // 指定作用域为单例
container.bind<Todo>(SERVICE_IDENTIFIER.TODO).to(TodoService).inSingletonScope() // 指定作用域为单例
container.bind<State>(SERVICE_IDENTIFIER.STATE).to(StateService).inSingletonScope() // 指定作用域为单例

export default container
