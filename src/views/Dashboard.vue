<!-- src/views/Dashboard.vue -->
<template>
  <div class="min-vh-100 bg-light">
    <!-- Header with User Info -->
    <div class="bg-primary text-white py-3 shadow">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col">
            <h1 class="h4 mb-0">
              <i class="bi bi-check2-square me-2"></i>
              Todo App
            </h1>
          </div>
          <div class="col-auto">
            <div class="dropdown">
              <button class="btn btn-outline-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <i class="bi bi-person-circle me-2"></i>
                {{ currentUser?.name }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><span class="dropdown-item-text small text-muted">{{ currentUser?.email }}</span></li>
                <li><hr class="dropdown-divider"></li>
                <li><button class="dropdown-item" @click="handleLogout"><i class="bi bi-box-arrow-right me-2"></i>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="bg-white border-bottom py-3">
      <div class="container-fluid">
        <div class="row g-3 text-center">
          <div class="col">
            <div class="h5 mb-0 text-primary">{{ totalTodos }}</div>
            <small class="text-muted">Total Tasks</small>
          </div>
          <div class="col">
            <div class="h5 mb-0 text-success">{{ completedTodos }}</div>
            <small class="text-muted">Completed</small>
          </div>
          <div class="col">
            <div class="h5 mb-0 text-warning">{{ pendingTodos }}</div>
            <small class="text-muted">Pending</small>
          </div>
          <div class="col">
            <div class="h5 mb-0 text-danger">{{ overdueTodos }}</div>
            <small class="text-muted">Overdue</small>
          </div>
          <div class="col">
            <div class="h5 mb-0 text-info">{{ upcomingTodos }}</div>
            <small class="text-muted">Upcoming</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container-fluid py-4">
      <div class="row g-4">
        <!-- Left Column - Form & Filters -->
        <div class="col-xl-3 col-lg-4">
          <!-- Todo Form -->
          <div class="card shadow-sm h-100">
            <div class="card-header bg-white border-bottom">
              <h5 class="card-title mb-0">
                <i class="bi bi-plus-circle me-2"></i>
                {{ editingTodo ? 'Edit Task' : 'New Task' }}
              </h5>
            </div>
            <div class="card-body">
              <TodoForm 
                :todo="editingTodo" 
                @save="saveTodo" 
                @cancel="cancelEdit" 
              />
            </div>
          </div>

          <!-- Due Date Overview -->
          <div class="card shadow-sm mt-4">
            <div class="card-header bg-white border-bottom">
              <h5 class="card-title mb-0">
                <i class="bi bi-calendar-week me-2"></i>
                Due Dates
              </h5>
            </div>
            <div class="card-body">
              <!-- Overdue -->
              <div v-if="overdueTasks.length > 0" class="mb-3">
                <h6 class="text-danger mb-2">
                  <i class="bi bi-exclamation-triangle me-1"></i>
                  Overdue
                  <span class="badge bg-danger ms-1">{{ overdueTasks.length }}</span>
                </h6>
                <div class="list-group list-group-flush">
                  <div v-for="task in overdueTasks" :key="task.id" 
                       class="list-group-item px-0 py-2 border-0">
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="small text-truncate">{{ task.title }}</span>
                      <small class="text-danger">{{ formatDueDate(task.due_date) }}</small>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Today -->
              <div v-if="todayTasks.length > 0" class="mb-3">
                <h6 class="text-warning mb-2">
                  <i class="bi bi-calendar-day me-1"></i>
                  Today
                  <span class="badge bg-warning ms-1">{{ todayTasks.length }}</span>
                </h6>
                <div class="list-group list-group-flush">
                  <div v-for="task in todayTasks" :key="task.id" 
                       class="list-group-item px-0 py-2 border-0">
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="small text-truncate">{{ task.title }}</span>
                      <small class="text-warning">Today</small>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tomorrow -->
              <div v-if="tomorrowTasks.length > 0" class="mb-3">
                <h6 class="text-info mb-2">
                  <i class="bi bi-calendar-plus me-1"></i>
                  Tomorrow
                  <span class="badge bg-info ms-1">{{ tomorrowTasks.length }}</span>
                </h6>
                <div class="list-group list-group-flush">
                  <div v-for="task in tomorrowTasks" :key="task.id" 
                       class="list-group-item px-0 py-2 border-0">
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="small text-truncate">{{ task.title }}</span>
                      <small class="text-info">Tomorrow</small>
                    </div>
                  </div>
                </div>
              </div>

              <!-- This Week -->
              <div v-if="thisWeekTasks.length > 0">
                <h6 class="text-primary mb-2">
                  <i class="bi bi-calendar-range me-1"></i>
                  This Week
                  <span class="badge bg-primary ms-1">{{ thisWeekTasks.length }}</span>
                </h6>
                <div class="list-group list-group-flush">
                  <div v-for="task in thisWeekTasks" :key="task.id" 
                       class="list-group-item px-0 py-2 border-0">
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="small text-truncate">{{ task.title }}</span>
                      <small class="text-primary">{{ formatDueDate(task.due_date) }}</small>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="!hasDueDateTasks" class="text-center text-muted py-3">
                <i class="bi bi-calendar-x display-6"></i>
                <p class="small mt-2 mb-0">No tasks with due dates</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Middle Column - Todo List -->
        <div class="col-xl-6 col-lg-8">
          <div class="card shadow-sm h-100">
            <div class="card-header bg-white border-bottom">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-title mb-0">
                  <i class="bi bi-list-task me-2"></i>
                  Your Tasks
                  <span class="badge bg-primary ms-2">{{ filteredTodos.length }}</span>
                </h5>
                <div class="d-flex gap-2 align-items-center">
                  <!-- Sort Dropdown -->
                  <div class="dropdown">
                    <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" 
                            data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="bi bi-sort-down me-1"></i>
                      Sort: {{ currentSortLabel }}
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li><h6 class="dropdown-header">Sort by</h6></li>
                      <li v-for="option in sortOptions" :key="option.value">
                        <button class="dropdown-item" @click="applySort(option.value)">
                          <i :class="option.icon" class="me-2"></i>
                          {{ option.label }}
                          <i v-if="currentSort === option.value" 
                             :class="sortOrder === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'" 
                             class="ms-2"></i>
                        </button>
                      </li>
                    </ul>
                  </div>

                  <button 
                    @click="fetchTodos"
                    class="btn btn-sm btn-outline-primary"
                    :disabled="loading"
                  >
                    <i class="bi bi-arrow-clockwise" :class="{ 'spin': loading }"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body p-0">
              <!-- Loading State -->
              <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted mt-2 mb-0">Loading tasks...</p>
              </div>

              <!-- Todo List -->
              <div v-else-if="filteredTodos.length > 0" class="list-group list-group-flush">
                <TodoItem
                  v-for="todo in filteredTodos"
                  :key="todo.id"
                  :todo="todo"
                  @edit="editTodo"
                  @delete="deleteTodo"
                  @toggle="toggleTodo"
                />
              </div>

              <!-- Empty State -->
              <div v-else class="text-center py-5">
                <i class="bi bi-inbox display-1 text-muted"></i>
                <h5 class="text-muted mt-3">No tasks found</h5>
                <p class="text-muted mb-3">Get started by creating your first task!</p>
                <button
                  @click="editingTodo = null"
                  class="btn btn-primary"
                >
                  <i class="bi bi-plus-circle me-2"></i>
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Filters -->
        <div class="col-xl-3 col-lg-12">
          <div class="card shadow-sm h-100">
            <div class="card-header bg-white border-bottom">
              <h5 class="card-title mb-0">
                <i class="bi bi-funnel me-2"></i>
                Filters & Search
              </h5>
            </div>
            <div class="card-body">
              <!-- Search -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Search Tasks</label>
                <div class="input-group">
                  <span class="input-group-text bg-light">
                    <i class="bi bi-search text-muted"></i>
                  </span>
                  <input 
                    v-model="searchTerm"
                    type="text" 
                    class="form-control"
                    placeholder="Type to search..."
                    @input="searchTodos"
                  >
                </div>
              </div>

              <!-- Status Filter -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Status</label>
                <select 
                  v-model="filter" 
                  @change="applyFilters"
                  class="form-select"
                >
                  <option value="all">All Tasks</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <!-- Category Filter -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Category</label>
                <select 
                  v-model="categoryFilter" 
                  @change="applyFilters"
                  class="form-select"
                >
                  <option value="all">All Categories</option>
                  <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>

              <!-- Due Date Filter -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Due Date</label>
                <select 
                  v-model="dueDateFilter" 
                  @change="applyFilters"
                  class="form-select"
                >
                  <option value="all">All Dates</option>
                  <option value="overdue">Overdue</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="this_week">This Week</option>
                  <option value="next_week">Next Week</option>
                  <option value="no_date">No Due Date</option>
                </select>
              </div>

              <!-- Quick Actions -->
              <div class="border-top pt-3">
                <h6 class="fw-semibold mb-2">Quick Actions</h6>
                <div class="d-grid gap-2">
                  <button @click="clearCompleted" class="btn btn-outline-danger btn-sm">
                    <i class="bi bi-trash me-1"></i>
                    Clear Completed
                  </button>
                  <button @click="markAllComplete" class="btn btn-outline-success btn-sm">
                    <i class="bi bi-check-all me-1"></i>
                    Mark All Complete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../services/auth';
import AuthService from '../services/auth';
import Swal from '../services/sweetAlert';
import TodoForm from '../components/TodoForm.vue';
import TodoItem from '../components/TodoItem.vue';

export default {
  name: 'Dashboard',
  components: {
    TodoForm,
    TodoItem
  },
  data() {
    return {
      todos: [],
      editingTodo: null,
      loading: false,
      searchTerm: '',
      filter: 'all',
      categoryFilter: 'all',
      dueDateFilter: 'all',
      searchTimeout: null,
      currentUser: null,
      currentSort: 'created_at',
      sortOrder: 'desc',
      sortOptions: [
        { value: 'due_date_asc', label: 'Due Date (Earliest)', icon: 'bi bi-calendar' },
        { value: 'due_date_desc', label: 'Due Date (Latest)', icon: 'bi bi-calendar' },
        { value: 'created_at_desc', label: 'Newest First', icon: 'bi bi-clock' },
        { value: 'created_at_asc', label: 'Oldest First', icon: 'bi bi-clock' },
        { value: 'title_asc', label: 'Title (A-Z)', icon: 'bi bi-sort-alpha-down' },
        { value: 'title_desc', label: 'Title (Z-A)', icon: 'bi bi-sort-alpha-up' },
        { value: 'completed_asc', label: 'Status (Pending First)', icon: 'bi bi-check-circle' },
        { value: 'completed_desc', label: 'Status (Completed First)', icon: 'bi bi-check-circle' }
      ]
    };
  },
  computed: {
    filteredTodos() {
      let filtered = this.todos;
      
      // Status filter
      if (this.filter === 'completed') {
        filtered = filtered.filter(todo => todo.completed);
      } else if (this.filter === 'pending') {
        filtered = filtered.filter(todo => !todo.completed);
      }

      // Category filter
      if (this.categoryFilter !== 'all') {
        filtered = filtered.filter(todo => todo.category === this.categoryFilter);
      }

      // Due date filter
      if (this.dueDateFilter !== 'all') {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        const startOfNextWeek = new Date(endOfWeek);
        startOfNextWeek.setDate(endOfWeek.getDate() + 1);
        
        const endOfNextWeek = new Date(startOfNextWeek);
        endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);

        filtered = filtered.filter(todo => {
          if (!todo.due_date) return this.dueDateFilter === 'no_date';
          
          const dueDate = new Date(todo.due_date);
          
          switch (this.dueDateFilter) {
            case 'overdue':
              return dueDate < today && !todo.completed;
            case 'today':
              return dueDate.toDateString() === today.toDateString();
            case 'tomorrow':
              return dueDate.toDateString() === tomorrow.toDateString();
            case 'this_week':
              return dueDate >= startOfWeek && dueDate <= endOfWeek;
            case 'next_week':
              return dueDate >= startOfNextWeek && dueDate <= endOfNextWeek;
            case 'no_date':
              return false;
            default:
              return true;
          }
        });
      }

      return filtered;
    },
    totalTodos() {
      return this.todos.length;
    },
    completedTodos() {
      return this.todos.filter(todo => todo.completed).length;
    },
    pendingTodos() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    overdueTodos() {
      const today = new Date().toDateString();
      return this.todos.filter(todo => 
        todo.due_date && 
        new Date(todo.due_date).toDateString() < today && 
        !todo.completed
      ).length;
    },
    upcomingTodos() {
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      return this.todos.filter(todo => 
        todo.due_date && 
        new Date(todo.due_date) >= today && 
        new Date(todo.due_date) <= nextWeek && 
        !todo.completed
      ).length;
    },
    categories() {
      const categories = new Set(this.todos.map(todo => todo.category).filter(Boolean));
      return Array.from(categories);
    },
    currentSortLabel() {
      const option = this.sortOptions.find(opt => opt.value === this.currentSort);
      return option ? option.label : 'Newest First';
    },
    // Due date overview calculations
    overdueTasks() {
      const today = new Date().toDateString();
      return this.todos.filter(todo => 
        todo.due_date && 
        new Date(todo.due_date).toDateString() < today && 
        !todo.completed
      ).slice(0, 5);
    },
    todayTasks() {
      const today = new Date().toDateString();
      return this.todos.filter(todo => 
        todo.due_date && 
        new Date(todo.due_date).toDateString() === today && 
        !todo.completed
      ).slice(0, 5);
    },
    tomorrowTasks() {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return this.todos.filter(todo => 
        todo.due_date && 
        new Date(todo.due_date).toDateString() === tomorrow.toDateString() && 
        !todo.completed
      ).slice(0, 5);
    },
    thisWeekTasks() {
      const today = new Date();
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
      
      return this.todos.filter(todo => {
        if (!todo.due_date || todo.completed) return false;
        const dueDate = new Date(todo.due_date);
        return dueDate > today && dueDate <= endOfWeek;
      }).slice(0, 5);
    },
    hasDueDateTasks() {
      return this.overdueTasks.length > 0 || this.todayTasks.length > 0 || 
             this.tomorrowTasks.length > 0 || this.thisWeekTasks.length > 0;
    }
  },
  async mounted() {
    this.currentUser = AuthService.getCurrentUser();
    await this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        this.loading = true;
        
        // Parse sort parameters
        let sortBy = 'created_at';
        let sortOrder = 'desc';
        
        if (this.currentSort.includes('_')) {
          const [field, order] = this.currentSort.split('_');
          sortBy = field;
          sortOrder = order;
        }
        
        const response = await api.get('/todos', {
          params: {
            sort_by: sortBy,
            sort_order: sortOrder
          }
        });
        
        this.todos = response.data.data || response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
        if (error.response?.status === 401) {
          AuthService.logout();
        } else {
          await Swal.error('Failed to fetch tasks');
        }
      } finally {
        this.loading = false;
      }
    },

    applySort(sortValue) {
      this.currentSort = sortValue;
      this.fetchTodos();
    },

    formatDueDate(dateString) {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      if (date.toDateString() === today.toDateString()) {
        return 'Today';
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
      } else {
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
      }
    },

    async saveTodo(todoData) {
      try {
        if (this.editingTodo) {
          const response = await api.put(`/todos/${this.editingTodo.id}`, todoData);
          const index = this.todos.findIndex(t => t.id === this.editingTodo.id);
          this.todos.splice(index, 1, response.data.data || response.data);
          await Swal.toast('success', 'Task updated successfully!');
        } else {
          const response = await api.post('/todos', todoData);
          this.todos.unshift(response.data.data || response.data);
          await Swal.toast('success', 'Task created successfully!');
        }
        
        this.cancelEdit();
      } catch (error) {
        console.error('Error saving todo:', error);
        if (error.response?.data?.errors) {
          const errorMessage = Object.values(error.response.data.errors).flat().join(', ');
          await Swal.error(errorMessage, 'Validation Error');
        } else {
          await Swal.error('Failed to save task');
        }
      }
    },

    editTodo(todo) {
      this.editingTodo = { ...todo };
    },

    cancelEdit() {
      this.editingTodo = null;
    },

    async deleteTodo(todoId) {
      const result = await Swal.confirm(
        'Delete Task',
        'Are you sure you want to delete this task? This action cannot be undone.',
        'Yes, delete it!'
      );

      if (result.isConfirmed) {
        try {
          await api.delete(`/todos/${todoId}`);
          this.todos = this.todos.filter(todo => todo.id !== todoId);
          await Swal.toast('success', 'Task deleted successfully!');
        } catch (error) {
          console.error('Error deleting todo:', error);
          await Swal.error('Failed to delete task');
        }
      }
    },

    async toggleTodo(todo) {
      try {
        const response = await api.put(`/todos/${todo.id}`, {
          completed: !todo.completed
        });
        const index = this.todos.findIndex(t => t.id === todo.id);
        this.todos.splice(index, 1, response.data.data || response.data);
        
        const message = todo.completed ? 'Task marked as incomplete!' : 'Task completed!';
        await Swal.toast('success', message);
      } catch (error) {
        console.error('Error updating todo:', error);
        await Swal.error('Failed to update task');
      }
    },

    async searchTodos() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      this.searchTimeout = setTimeout(async () => {
        if (this.searchTerm.trim()) {
          try {
            const response = await api.get(`/todos/search/${this.searchTerm}`);
            this.todos = response.data.data || response.data;
          } catch (error) {
            console.error('Error searching todos:', error);
          }
        } else {
          await this.fetchTodos();
        }
      }, 500);
    },

    applyFilters() {
      this.fetchTodos();
    },

    async clearCompleted() {
      const result = await Swal.confirm(
        'Clear Completed Tasks',
        'Are you sure you want to delete all completed tasks? This action cannot be undone.',
        'Yes, clear them!'
      );

      if (result.isConfirmed) {
        try {
          const completedTodos = this.todos.filter(todo => todo.completed);
          for (const todo of completedTodos) {
            await api.delete(`/todos/${todo.id}`);
          }
          this.todos = this.todos.filter(todo => !todo.completed);
          await Swal.toast('success', 'Completed tasks cleared successfully!');
        } catch (error) {
          console.error('Error clearing completed tasks:', error);
          await Swal.error('Failed to clear completed tasks');
        }
      }
    },

    async markAllComplete() {
      const result = await Swal.confirm(
        'Mark All Complete',
        'Are you sure you want to mark all tasks as complete?',
        'Yes, mark all complete!'
      );

      if (result.isConfirmed) {
        try {
          const pendingTodos = this.todos.filter(todo => !todo.completed);
          for (const todo of pendingTodos) {
            await api.put(`/todos/${todo.id}`, { completed: true });
          }
          await this.fetchTodos();
          await Swal.toast('success', 'All tasks marked as complete!');
        } catch (error) {
          console.error('Error marking all complete:', error);
          await Swal.error('Failed to mark all tasks complete');
        }
      }
    },

    async handleLogout() {
      const result = await Swal.confirm(
        'Logout',
        'Are you sure you want to logout?',
        'Yes, logout!'
      );

      if (result.isConfirmed) {
        await AuthService.logout();
      }
    }
  }
};
</script>