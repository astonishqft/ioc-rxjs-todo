<script lang="ts" setup>
import { inject } from 'vue'
import { Container } from 'inversify'
import SERVICE_IDENTIFIER from '@/constants/identifiers'
import type { Todo } from '@/interfaces/todo'
import { SHOWING } from '@/services/state'

interface Props {
  activeTodoCount: number
  nowShowing: SHOWING
}
defineProps<Props>()

const todoMVC = inject<Container>('todoMVC') as Container

const todoService: Todo = todoMVC.get<Todo>(SERVICE_IDENTIFIER.TODO)
</script>
<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{ activeTodoCount }} </strong>
      <span v-if="activeTodoCount === 1"> item left</span>
      <span v-else> items left</span>
    </span>
    <ul class="filters">
      <li>
        <a href="#/" :class="{ selected: nowShowing === SHOWING.ACTIVE_TODOS }"> All </a>
      </li>

      <li>
        <a href="#/active" :class="{ selected: nowShowing === SHOWING.ACTIVE_TODOS }"> Active </a>
      </li>

      <li>
        <a href="#/completed" :class="{ selected: nowShowing === SHOWING.COMPLETED_TODOS }">
          Completed
        </a>
      </li>
    </ul>
    <button
      class="clear-completed"
      @click="() => todoService.clearCompleted()"
      v-if="todoService.completedCount > 0"
    >
      Clear completed
    </button>
  </footer>
</template>
