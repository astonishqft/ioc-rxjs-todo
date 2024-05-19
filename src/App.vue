<script setup lang="ts">
import { ref, onMounted, inject, onUnmounted } from 'vue'
import { Container } from 'inversify'
import SERVICE_IDENTIFIER from '@/constants/identifiers'
import TodoItem from '@/components/TodoItem.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import { SHOWING } from '@/services/state'
import type { ITodo } from '@/services/todo'
import type { Todo } from '@/interfaces/todo'
import type { State } from '@/interfaces/state'

const inputRef = ref<HTMLInputElement>()
const todoMVC = inject<Container>('todoMVC') as Container

const inputValue = ref('')
const activeTodoCount = ref(0)
const nowShowing = ref(SHOWING.ALL_TODOS)
const todoService: Todo = todoMVC.get<Todo>(SERVICE_IDENTIFIER.TODO)
const stateService: State = todoMVC.get<State>(SERVICE_IDENTIFIER.STATE)
const todoCount = ref(todoService.todoCount)

const shownTodos = ref<ITodo[]>(todoService.shownTodos)

const updateValue = () => {
  shownTodos.value = todoService.shownTodos
  todoCount.value = todoService.todoCount
  activeTodoCount.value = todoService.activeTodoCount
  nowShowing.value = stateService.nowShowing
}

const subscribtion = todoService.updated$.subscribe(updateValue)

const subscribtionState = stateService.updated$.subscribe(updateValue)

onMounted(() => {
  inputRef.value?.focus()
})

onUnmounted(() => {
  subscribtion.unsubscribe()
  subscribtionState.unsubscribe()
})

const handleChange = (e: Event) => {
  todoService.addTodo((e.target as HTMLInputElement).value)
  inputValue.value = ''
}

const handleCheckbox = (e: Event) => {
  todoService.toggleAll((e.target as HTMLInputElement).checked)
}

console.log('App rendering')
</script>

<template>
  <div class="todoapp">
    <header class="header">
      <h1>todo</h1>
      <input
        type="text"
        class="new-todo"
        v-model="inputValue"
        placeholder="What needs to be done?"
        @change="handleChange"
      />
    </header>
    <section>
      <input
        type="checkbox"
        id="toggle-all"
        class="toggle-all"
        @change="handleCheckbox"
        :checked="todoService.activeTodoCount === 0"
      />
      <label htmlFor="toggle-all">Mark all as completed</label>
      <ul class="todo-list">
        <TodoItem
          v-for="todo in shownTodos"
          :key="todo.id"
          :todo="todo"
          :todoService="todoService"
        />
      </ul>
    </section>
    <TodoFooter :activeTodoCount="activeTodoCount" :nowShowing="nowShowing" />
  </div>
</template>

<style></style>
