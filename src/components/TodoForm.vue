<!-- src/components/TodoForm.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="title" class="form-label">Task Title *</label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors.title }"
        placeholder="What needs to be done?"
        required
      >
      <div v-if="errors.title" class="invalid-feedback">
        {{ errors.title }}
      </div>
      <div class="form-text">
        {{ form.title.length }}/255 characters
      </div>
    </div>

    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea
        id="description"
        v-model="form.description"
        rows="3"
        class="form-control"
        placeholder="Add some details about this task..."
      ></textarea>
    </div>

    <div class="row g-2 mb-3">
      <div class="col-md-6">
        <label for="dueDate" class="form-label">Due Date</label>
        <input
          id="dueDate"
          v-model="form.due_date"
          type="date"
          class="form-control"
        >
      </div>
      <div class="col-md-6">
        <label for="category" class="form-label">Category</label>
        <input
          id="category"
          v-model="form.category"
          type="text"
          class="form-control"
          placeholder="Work, Personal, etc."
        >
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label">Quick Categories:</label>
      <div class="d-flex flex-wrap gap-1">
        <button
          v-for="cat in quickCategories"
          :key="cat"
          type="button"
          @click="form.category = cat"
          class="btn btn-outline-secondary btn-sm"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <div class="d-grid gap-2">
      <button type="submit" class="btn btn-primary">
        {{ editingTodo ? 'Update Task' : 'Create Task' }}
      </button>
      <button
        v-if="editingTodo"
        type="button"
        @click="cancel"
        class="btn btn-outline-secondary"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'TodoForm',
  props: {
    todo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        due_date: '',
        category: ''
      },
      errors: {},
      quickCategories: ['Work', 'Personal', 'Shopping', 'Health', 'Learning', 'Finance']
    };
  },
  computed: {
    editingTodo() {
      return this.todo;
    }
  },
  watch: {
    todo: {
      immediate: true,
      handler(newTodo) {
        if (newTodo) {
          this.form = {
            title: newTodo.title,
            description: newTodo.description || '',
            due_date: newTodo.due_date ? newTodo.due_date.split('T')[0] : '',
            category: newTodo.category || ''
          };
        } else {
          this.resetForm();
        }
      }
    }
  },
  methods: {
    resetForm() {
      this.form = {
        title: '',
        description: '',
        due_date: '',
        category: ''
      };
      this.errors = {};
    },

    validateForm() {
      this.errors = {};
      
      if (!this.form.title.trim()) {
        this.errors.title = 'Title is required';
        return false;
      }

      if (this.form.title.length > 255) {
        this.errors.title = 'Title must be less than 255 characters';
        return false;
      }

      return true;
    },

    handleSubmit() {
      if (!this.validateForm()) return;

      this.$emit('save', {
        ...this.form,
        title: this.form.title.trim(),
        description: this.form.description.trim(),
        category: this.form.category.trim() || null
      });

      if (!this.editingTodo) {
        this.resetForm();
      }
    },

    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>