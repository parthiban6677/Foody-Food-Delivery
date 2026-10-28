# Foody

Foody is a full-stack food delivery application with a customer-facing frontend, an admin dashboard, and a backend API for food items, cart management, orders, and user authentication.

## Project Structure

- `user/` – customer web app built with React + Vite
- `admin/` – admin management panel built with React + Vite
- `backend/` – Express + MongoDB API and authentication logic
- root files – repository configuration and shared project documentation

## Tech Stack

- Frontend: React, Vite, React Router, Axios, React Toastify
- Admin Panel: React, Vite
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Authentication: JWT and bcrypt
- Payments: Stripe

## Prerequisites

- Node.js 18+ recommended
- MongoDB running locally or a MongoDB Atlas connection string
- Git

## Environment Setup

1. Open the backend folder:
   ```bash
   cd backend
   ```
2. Create your local environment file from the example:
   ```bash
   copy .env.example .env
   ```
   On Linux/macOS:
   ```bash
   cp .env.example .env
   ```
3. Update the values in `.env` with your own local secrets and MongoDB connection. Do not commit this file.

## Run the Application

### 1) Backend

```bash
cd backend
npm install
npm run server
```

The backend runs on the port defined in `PORT` (default: `4000`).

### 2) Customer App

```bash
cd user
npm install
npm run dev
```

### 3) Admin App

```bash
cd admin
npm install
npm run dev
```

## Production Build

```bash
cd user
npm run build
```

```bash
cd admin
npm run build
```

## Notes

- Keep `.env` files private and never commit them to GitHub.
- `node_modules`, build output, logs, and editor files are ignored by the project root `.gitignore`.
- If your local machine already has a working MongoDB instance, the application can run without changing its source code.

## GitHub Upload Checklist

- Confirm the repository is initialized with Git (`git status`)
- Ensure `.env` files are not committed
- Ensure `node_modules` and generated build folders are ignored
- Add the project files and push to your GitHub remote

## License

This project is intended for learning and local development use.
