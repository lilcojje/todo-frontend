# 🚀 Todo Application

A full-stack Todo application built with Vue.js frontend and Laravel backend, featuring user authentication, due dates, sorting, and a beautiful responsive UI.

![Todo App](https://img.shields.io/badge/Full--Stack-Todo%20App-blue)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-green)
![Laravel](https://img.shields.io/badge/Laravel-10.x-red)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-purple)
![MySQL](https://img.shields.io/badge/MySQL-Database-orange)

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login** with form validation
- **JWT Token-based Authentication** using Laravel Sanctum
- **Protected API Routes** with middleware
- **Secure Password Hashing**

### 📝 Todo Management
- **Full CRUD Operations** - Create, Read, Update, Delete todos
- **Mark as Complete/Incomplete** with visual indicators
- **Rich Todo Details** - Title, description, due dates, categories
- **Quick Categories** for easy organization

### 🗓️ Due Date Management
- **Due Date Assignment** with calendar picker
- **Smart Sorting** by due date (earliest/latest)
- **Due Date Overview** showing:
  - ⚠️ Overdue tasks
  - 📅 Today's tasks
  - 📆 Tomorrow's tasks
  - 📊 This week's tasks
- **Visual Indicators** for overdue and upcoming tasks

### 🔍 Advanced Filtering & Search
- **Real-time Search** across titles, descriptions, and categories
- **Status Filtering** - All, Pending, Completed
- **Category Filtering** - Filter by specific categories
- **Due Date Filtering** - Overdue, Today, Tomorrow, This Week, Next Week

### 📊 Sorting & Organization
- **Multiple Sort Options**:
  - Due Date (Earliest/Latest)
  - Creation Date (Newest/Oldest)
  - Title (A-Z/Z-A)
  - Completion Status
- **Smart Default Sorting** with secondary sort criteria

### 🎨 User Interface
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern Bootstrap 5 UI** with beautiful cards and shadows
- **SweetAlert2 Integration** for beautiful alerts and confirmations
- **Bootstrap Icons** throughout the interface
- **Professional Dashboard** with statistics

### ⚡ Performance & UX
- **Debounced Search** for better performance
- **Loading States** with spinners
- **Toast Notifications** for user feedback
- **Quick Actions** - Clear completed, Mark all complete
- **Empty States** with helpful messages

## 🛠️ Tech Stack

### Frontend
- **Vue.js 3** - Progressive JavaScript Framework
- **Vue Router** - Client-side routing
- **Bootstrap 5** - CSS framework
- **Bootstrap Icons** - Icon library
- **SweetAlert2** - Beautiful alerts and notifications
- **Axios** - HTTP client for API calls

### Backend
- **Laravel 10** - PHP framework
- **Laravel Sanctum** - API authentication
- **MySQL** - Primary database
- **Eloquent ORM** - Database management

## 🚀 Quick Start

### Prerequisites
- PHP 8.1+
- Composer
- Node.js 16+
- MySQL 5.7+

### Backend Setup (Laravel)

1. **Navigate to backend directory**
   ```bash
   cd todo-backend


   # 📝 Todo Application (Laravel + Vue.js)

A full-stack Todo Application built with **Laravel** (backend) and
**Vue.js** (frontend). This guide will help you install, configure, and
run the project easily.

## 🚀 Installation & Setup

### **Backend Setup (Laravel)**

#### **Install dependencies**

``` bash
composer install
```

#### **Environment setup**

``` bash
cp .env.example .env
php artisan key:generate
```

#### **Database configuration**

Update your `.env` file:

``` env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_app
DB_USERNAME=root
DB_PASSWORD=
```

#### **Run migrations**

``` bash
php artisan migrate
```

#### **Start the backend server**

``` bash
php artisan serve
```

Backend will run on: **http://localhost:8000**

## 🎨 Frontend Setup (Vue.js)

Navigate to frontend directory:

``` bash
cd todo-frontend
```

Install dependencies:

``` bash
npm install
```

Start development server:

``` bash
npm run dev
```

Frontend will run on: **http://localhost:5173**

## 📁 Project Structure

### **Backend Structure**

todo-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   └── TodoController.php
│   ├── Models/
│   │   ├── User.php
│   │   └── Todo.php
├── database/
│   └── migrations/
│       ├── create_users_table.php
│       ├── create_todos_table.php
│       └── add_user_id_to_todos_table.php
├── routes/
│   └── api.php
└── config/
    └── cors.php


### **Frontend Structure**

todo-frontend/
├── src/
│   ├── components/
│   │   ├── TodoForm.vue
│   │   ├── TodoItem.vue
│   │   └── TodoList.vue
│   ├── views/
│   │   ├── Dashboard.vue
│   │   ├── Login.vue
│   │   └── Register.vue
│   ├── services/
│   │   ├── auth.js
│   │   └── sweetAlert.js
│   ├── router/
│   │   └── index.js
│   └── main.js
├── package.json
└── vite.config.js


## 🔌 API Endpoints


Method	Endpoint	Description	Authentication
POST	/api/register	User registration	Public
POST	/api/login	User login	Public
POST	/api/logout	User logout	Protected
GET	/api/user	Get current user	Protected

## 🎯 Usage Guide

Getting Started
Register a new account at the registration page

Login with your credentials

Create your first todo using the form on the dashboard

Add due dates and categories for better organization

Use filters and search to find specific tasks

Managing Todos
Create: Use the "New Task" form in the left sidebar

Edit: Click the edit button (pencil icon) on any todo item

Complete: Check the checkbox to mark as complete/incomplete

Delete: Use the delete button (trash icon) with confirmation dialog

Organize: Use categories and due dates for better task management

Advanced Features
Quick Categories: Click on quick category buttons to auto-fill the category field

Due Date Overview: Check the left sidebar for upcoming and overdue tasks

Bulk Actions: Use "Clear Completed" and "Mark All Complete" for quick management

Smart Sorting: Use the sort dropdown to organize tasks by different criteria

🎨 UI Components
Dashboard
Header: User info and logout dropdown

Stats Bar: Total, completed, pending, overdue, and upcoming task counts

Three-column Layout:

Left: Todo form and due date overview

Middle: Todo list with sorting

Right: Filters and quick actions

Todo Form
Title (required) with character counter

Description textarea

Due date picker

Category input with quick category buttons

Validation with error messages

Todo Item
Checkbox for completion status

Title and description

Category badge

Due date with overdue indicators

Edit and delete actions

## 🔧 Configuration

APP_NAME="Todo App"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_app
DB_USERNAME=root
DB_PASSWORD=

CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

------

Frontend Configuration
The frontend automatically connects to http://localhost:8000/api for API calls.


## 🐛 Troubleshooting

Common Issues
1. CORS Errors
- Ensure CORS is properly configured in config/cors.php
- Check allowed origins include your frontend URL
2. Authentication Issues
- Verify token is being stored in localStorage
- Check Sanctum middleware is properly set up
3. Database Connection Issues
- Verify database credentials in .env
- Ensure MySQL server is running
- Run php artisan migrate:fresh to reset database
4. Frontend Build Issues

- Clear node modules: rm -rf node_modules && npm install
- Check Node.js version compatibility

5. API 404 Errors
- Ensure backend server is running on port 8000
- Check route definitions in routes/api.php


Development Tips
- Use browser developer tools to check network requests
- Check Laravel logs in storage/logs/laravel.log
- Enable debug mode in .env for detailed error messages


## 📝 Development Notes

Backend Architecture
- Uses Laravel's built-in validation
- Implements proper error handling with HTTP status codes
- Follows RESTful API conventions
- Includes comprehensive middleware for authentication

Frontend Architecture
- Uses Vue 3 Composition API
- Implements proper state management
- Follows component-based architecture
- Includes responsive design principles

Security Features
- CSRF protection with Sanctum
- Input validation on both frontend and backend
- SQL injection prevention with Eloquent ORM
- XSS protection with Vue's template system
- Password hashing with bcrypt
## 🚀 Deployment

Backend Deployment
- Set up production environment
- Update .env for production settings
- Run php artisan config:cache
- Set up web server (Apache/Nginx) with proper permissions
- Configure database for production

Frontend Deployment
- Build production version: npm run build
- Deploy dist folder to web server
- Configure reverse proxy for API calls if needed
- Update API base URL for production environment

## 👥 Authors

Rodney G. Painagan - Full-stack Developer
https://rodz.kagay-an.ph/

## 🙏 Acknowledgments

Laravel, Vue.js, Bootstrap, SweetAlert2, Bootstrap Icons
