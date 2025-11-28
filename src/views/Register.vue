<!-- src/views/Register.vue -->
<template>
  <div class="min-vh-100 bg-light d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-lg border-0">
            <div class="card-body p-5">
              <div class="text-center mb-4">
                <i class="bi bi-person-plus display-4 text-primary mb-3"></i>
                <h2 class="card-title fw-bold">Create Account</h2>
                <p class="text-muted">Sign up to get started</p>
              </div>

              <form @submit.prevent="handleRegister">
                <div class="mb-3">
                  <label for="name" class="form-label">Full Name</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="form-control form-control-lg"
                    :class="{ 'is-invalid': errors.name }"
                    placeholder="Enter your full name"
                    required
                  >
                  <div v-if="errors.name" class="invalid-feedback">
                    {{ errors.name }}
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="form-control form-control-lg"
                    :class="{ 'is-invalid': errors.email }"
                    placeholder="Enter your email"
                    required
                  >
                  <div v-if="errors.email" class="invalid-feedback">
                    {{ errors.email }}
                  </div>
                </div>

                <div class="mb-4">
                  <label for="password" class="form-label">Password</label>
                  <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="form-control form-control-lg"
                    :class="{ 'is-invalid': errors.password }"
                    placeholder="Create a password"
                    required
                  >
                  <div v-if="errors.password" class="invalid-feedback">
                    {{ errors.password }}
                  </div>
                  <div class="form-text">
                    Password must be at least 8 characters.
                  </div>
                </div>

                <div class="mb-4">
                  <label for="password_confirmation" class="form-label">Confirm Password</label>
                  <input
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="form-control form-control-lg"
                    :class="{ 'is-invalid': errors.password_confirmation }"
                    placeholder="Confirm your password"
                    required
                  >
                  <div v-if="errors.password_confirmation" class="invalid-feedback">
                    {{ errors.password_confirmation }}
                  </div>
                </div>

                <div class="d-grid mb-3">
                  <button 
                    type="submit" 
                    class="btn btn-primary btn-lg"
                    :disabled="loading"
                  >
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                    {{ loading ? 'Creating Account...' : 'Create Account' }}
                  </button>
                </div>

                <div class="text-center">
                  <p class="text-muted">
                    Already have an account? 
                    <router-link to="/login" class="text-decoration-none">Sign in</router-link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/auth';

export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: {},
      loading: false
    };
  },
  methods: {
    async handleRegister() {
      this.loading = true;
      this.errors = {};

      const result = await AuthService.register(this.form);

      if (result.success) {
        this.$router.push('/');
      } else {
        // Set field errors if available
        if (result.errors) {
          this.errors = result.errors;
        }
      }

      this.loading = false;
    }
  }
};
</script>