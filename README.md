# CollabCode – Collaborative Code Editor (Phase 1)

CollabCode is a full-stack collaborative development environment. This repository contains the complete implementation for **Phase 1: Basic Frontend + Backend + MongoDB Atlas + JWT Authentication**.

---

## 🛠️ Technology Stack

- **Frontend**: React.js (Vite), Tailwind CSS, React Router v6, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (via Mongoose)
- **Authentication**: JSON Web Token (JWT) & bcryptjs password hashing

---

## 📁 Project Structure

```text
CollabCode/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── adminController.js
│   │   │   └── authController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── roleMiddleware.js
│   │   ├── models/
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── adminRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   └── healthRoutes.js
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
├── .gitignore
├── .env
├── .env.example
└── README.md
```

---

## ⚙️ Environment Configuration

Copy `.env.example` to `.env` or update the `.env` file in the project root:

```env
MONGODB_USERNAME=your_username
MONGODB_PASSWORD=your_password
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

---

## 🚀 Running the Application

### 1. Backend Server
Navigate to the backend directory and run:
```bash
cd backend
npm install
npm run dev
# Server will run on http://localhost:5000
```

### 2. Frontend Application
In a separate terminal, navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
# App will run on http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/health` | Backend health check | Public |
| `POST` | `/api/auth/register` | Register new user (role: `USER`) | Public |
| `POST` | `/api/auth/login` | Login user & issue JWT | Public |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Private (JWT) |
| `GET` | `/api/admin/test` | Role authorization test | Private (Admin Only) |

---

## 🔒 Security Features

1. **Password Hashing**: Stored passwords are salted and hashed with `bcryptjs`.
2. **JWT Authentication**: Protected routes require a valid `Bearer <token>` in the Authorization header.
3. **Role Validation**: All normal registrations strictly default to role `USER`. Admin endpoints are guarded via role authorization middleware.
4. **Environment Isolation**: Sensitive credentials are never committed to version control.
