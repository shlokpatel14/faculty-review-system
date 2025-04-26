# 📊 Faculty Review System

A full-stack web application where students can register, log in, and review faculty members. Faculty and HODs can view reviews. Built with React (Vite) frontend and Laravel (Sanctum-authenticated) API backend.

---

## ⚙️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Axios
- **Backend:** Laravel (Sanctum Auth), MySQL
- **Authentication:** Laravel Sanctum (token-based)

---

## 🏗️ Project Structure

```
faculty-review-system/
├── backend/        # Laravel API
├── frontend/       # React app
├── README.md
└── LICENSE
```

### 📁 Backend (Laravel)
```
backend/
├── app/
├── routes/
│   └── api.php
├── database/
├── .env
└── ...
```

### 📁 Frontend (React)
```
frontend/
├── public/
├── src/
│   ├── components/         # Reusable UI
│   │   └── StudentAuth.jsx
│   ├── pages/              # Pages (dashboards, etc.)
│   ├── api/                # Axios instance + API helpers
│   └── App.jsx
├── .env
└── ...
```

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js >= 18
- PHP >= 8.1
- Composer
- MySQL

### 🔧 Backend Setup (Laravel)
```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

### 🔧 Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

Make sure Laravel is running on `http://localhost:8000`

### 🔗 Sanctum CORS Setup (in Laravel .env)
```env
SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DOMAIN=localhost
```

---

## 🔐 Authentication (Sanctum)
- Students can register/login.
- Auth tokens are stored using Laravel Sanctum.
- API routes are protected with `auth:sanctum` middleware.

---

## 🌐 Example API Routes (Laravel)
```php
Route::prefix('student')->group(function () {
    Route::post('register', [StudentAuthController::class, 'register']);
    Route::post('login', [StudentAuthController::class, 'login']);
    Route::middleware('auth:sanctum')->get('profile', [StudentAuthController::class, 'profile']);
    Route::middleware('auth:sanctum')->post('logout', [StudentAuthController::class, 'logout']);
});
```

---

## 📸 Screenshots
_Add screenshots here if needed._

---

## ✨ Features
- Student registration with department dropdown
- Login and registration in one component
- Token-based auth (Sanctum)
- Laravel API + MySQL

---

## 📄 License
MIT License

---

## 🙌 Author
**Shlok Patel** — _Faculty Review Analyzer Project_

GitHub: [@shlokpatel](https://github.com/shlokpatel)
