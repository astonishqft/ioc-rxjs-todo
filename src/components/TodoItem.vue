<script setup lang="ts">
import { inject, ref } from 'vue'
import { Container } from 'inversify'
import SERVICE_IDENTIFIER from '@/constants/identifiers'
import type { ITodo } from '@/services/todo'
import type { Todo } from '@/interfaces/todo'
import type { State } from '@/interfaces/state'

interface Props {
  todo: ITodo
  onEdit?(todo: ITodo): void
  onSave?(todo: ITodo): void
  onCancel?(): void
}
const props = defineProps<Props>()

const inputValue = ref<string>('')

const todoMVC = inject<Container>('todoMVC') as Container

const todoService: Todo = todoMVC.get<Todo>(SERVICE_IDENTIFIER.TODO)
const stateService: State = todoMVC.get<State>(SERVICE_IDENTIFIER.STATE)

const handleDestroy = (todo: ITodo) => {
  todoService.destroy(todo)
}

const handleEdit = () => {
  inputValue.value = props.todo.title

  stateService.setEditing(props.todo.id)
}

const handleCheckbox = (todo: ITodo) => {
  todoService.toggle(todo)
}

const handleSubmit = () => {
  stateService.setEditing('')
  if (inputValue.value) {
    todoService.save(props.todo, inputValue.value)
  } else {
    todoService.destroy(props.todo)
  }
}
</script>

<template>
  <li :class="{ completed: todo.completed, editing: stateService.editing }">
    <div class="view">
      <input
        type="checkbox"
        class="toggle"
        :checked="todo.completed"
        @change="() => handleCheckbox(todo)"
      />
      <label @dblclick="handleEdit">{{ todo.title }}</label>
      <button class="destroy" @click="() => handleDestroy(todo)"></button>
    </div>
    <input v-model="inputValue" class="edit" @blur="handleSubmit" />
  </li>
</template>
