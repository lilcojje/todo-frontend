<!-- src/components/TodoList.vue -->
<template>
  <div>
    <div v-if="todos.length === 0" class="text-center py-8 text-gray-500">
      No todos found. Add one above to get started!
    </div>

    <div v-else class="space-y-3">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @edit="$emit('edit', todo)"
        @delete="$emit('delete', todo.id)"
        @toggle="$emit('toggle', todo)"
      />
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  emits: ['edit', 'delete', 'toggle']
};
</script>