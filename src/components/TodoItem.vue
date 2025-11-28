<!-- src/components/TodoItem.vue -->
<template>
  <div class="list-group-item">
    <div class="d-flex align-items-start gap-3">
      <!-- Checkbox -->
      <div class="flex-shrink-0 pt-1">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="$emit('toggle', todo)"
          class="form-check-input"
          style="width: 1.3em; height: 1.3em;"
        >
      </div>

      <!-- Content -->
      <div class="flex-grow-1">
        <div class="d-flex justify-content-between align-items-start">
          <div class="flex-grow-1">
            <h6 class="mb-2 fw-semibold" :class="{ 'text-decoration-line-through text-muted': todo.completed }">
              {{ todo.title }}
            </h6>
            
            <p v-if="todo.description" class="text-muted small mb-3">
              {{ todo.description }}
            </p>
            
            <div class="d-flex flex-wrap gap-2 align-items-center">
              <!-- Category -->
              <span v-if="todo.category" class="badge bg-primary">
                <i class="bi bi-tag me-1"></i>
                {{ todo.category }}
              </span>
              
              <!-- Due Date -->
              <span v-if="todo.due_date" class="badge" :class="isOverdue && !todo.completed ? 'bg-danger' : 'bg-secondary'">
                <i class="bi bi-calendar me-1"></i>
                {{ formattedDueDate }}
                <span v-if="isOverdue && !todo.completed" class="ms-1">• Overdue</span>
              </span>
              
              <!-- Created Date -->
              <small class="text-muted">
                <i class="bi bi-clock me-1"></i>
                {{ formattedCreatedDate }}
              </small>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex-shrink-0 ms-3">
            <div class="btn-group btn-group-sm">
              <button
                @click="$emit('edit', todo)"
                class="btn btn-outline-primary"
                title="Edit task"
              >
                <i class="bi bi-pencil"></i>
              </button>
              <button
                @click="$emit('delete', todo.id)"
                class="btn btn-outline-danger"
                title="Delete task"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDueDate() {
      if (!this.todo.due_date) return '';
      return new Date(this.todo.due_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    },
    formattedCreatedDate() {
      if (!this.todo.created_at) return '';
      return new Date(this.todo.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    },
    isOverdue() {
      if (!this.todo.due_date || this.todo.completed) return false;
      return new Date(this.todo.due_date) < new Date().setHours(0,0,0,0);
    }
  },
  emits: ['edit', 'delete', 'toggle']
};
</script>

<style scoped>
.list-group-item {
  transition: background-color 0.2s ease;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

.form-check-input {
  cursor: pointer;
}

.form-check-input:checked {
  background-color: #198754;
  border-color: #198754;
}

.btn-group .btn {
  border-radius: 0.375rem;
}
</style>