# 🍽️ BiteCraft — Food Menu Management System

BiteCraft is a full-stack CRUD web application for managing a restaurant's food menu, built with the MERN stack (MongoDB, Express, React, Node.js). It supports role-based access — Admins can manage the menu, while Users can browse available food items.

---

## 📖 Project Description

BiteCraft lets a restaurant (or canteen, cafe, etc.) maintain its food menu digitally. Admins can add, update, and remove food items, while regular users can view and search the menu. Authentication is handled via JWT, and access to menu-management actions is restricted based on the logged-in user's role.

---

## ✨ Features

- User registration and login with secure password hashing (bcrypt)
- JWT-based authentication
- Role-based access control — **Admin** and **User**
- Admin: Create, update, and delete food items
- Admin & User: View the full food menu
- Protected API routes using middleware (`auth`, `authorizeRoles`)
- RESTful API built with Express + MongoDB Atlas
- Client-side rendering with React + Vite

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite)
- React Router
- Fetch API / Axios
- Plain CSS

**Backend**
- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- JSON Web Tokens (JWT)
- bcrypt (password hashing)
- CORS, dotenv

**Deployment**
- Backend: Render
- Frontend: Vercel

---

## 👥 Team Members

| Role | Name | Roll No. |
|------|------|----------|
| Team Lead| *Akshita Saxena* | *0008* |
| Member | *Siya Bhardwaj* | *0081* |
| Member | *Jiya Kaushik* | *0041* |
| Member | *Molly Arora* | *0052* |

---

## 🔌 API Endpoints

### Auth

| Method | Endpoint | Access | Description |
|--------|----------|--------|--------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Log in and receive a JWT |

### Food Items

| Method | Endpoint | Access | Description |
|--------|----------|--------|--------------|
| GET | `/api/foods` | Admin / User | Get all food items |
| GET | `/api/foods/:id` | Admin / User | Get a single food item by ID |
| POST | `/api/foods` | Admin only | Create a new food item |
| PUT | `/api/foods/:id` | Admin only | Update a food item |
| DELETE | `/api/foods/:id` | Admin only | Delete a food item |

### Misc

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/` | API welcome message |
| GET | `/api/health` | Health check |

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/akshitaasaxena/BiteCraft.git
cd BiteCraft
```

### 2. Backend setup
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/` (see [Environment Variables](#-environment-variables) below), then run:
```bash
npm start
```
The backend will run on `http://localhost:3000` by default.

### 3. Frontend setup
```bash
cd frontend
npm install
```
Create a `.env` file inside `frontend/` (see below), then run:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173` by default.

---

## 🔑 Environment Variables

### `backend/.env`
```
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

### `frontend/.env`
```
VITE_API_URL=http://localhost:3000/api
```

> `.env` files are gitignored and should never be pushed. Use the committed `.env.example` files as a reference for what variables are needed.

---

## 📸 Screenshots

*(Add screenshots of the Login page, Menu page, and Admin Dashboard here once built)*

| Login | Menu | Admin Dashboard |
|-------|------|------------------|
| *(screenshot)* | *(screenshot)* | *(screenshot)* |

---

## 🚀 Deployment Links

- **Frontend (Vercel):** *(add link once deployed)*
- **Backend (Render):** *(add link once deployed)*
- **GitHub Repository:** https://github.com/akshitaasaxena/BiteCraft

---

## 🌿 Git Workflow

- `main` — protected, stable branch
- Feature branches: `feature/auth`, `feature/food-crud`, `feature/frontend-pages`, etc.
- All changes go through a Pull Request and are reviewed by the Team Lead before merging
- No direct pushes to `main` (except the initial project scaffold)