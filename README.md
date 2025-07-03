# V Courses Manager

## 📘 Introduction

**V Courses Manager** is a full-stack educational platform built on the **PERN stack**, with robust admin capabilities and a modular codebase.

### 🧱 Stack

- **PostgreSQL** – Relational database
- **Prisma ORM** – Type-safe database queries
- **NestJS** – Backend API
- **Next.js** – Frontend Web UI
- **React** – Admin CMS
- **Node.js** – Runtime environment
- **Material UI** – UI components (https://mui.com)
- **Redux** – Application state management
- **JWT** – Authentication mechanism

### 🎨 UI/UX Design

- Figma Design: [V Course Storage](https://www.figma.com/community/file/978217394826446327/v-courses-storage)

---

## ⚙️ Requirements

- Node.js (v16+)
- Yarn
- Docker & Docker Compose

---

## 🚀 Quick Start

```bash
# Step 1: Install dependencies
make install

# Step 2: Start the whole app (client + server)
make up -j2

# App should be running at:
# Web Client: http://localhost:8000
# Admin CMS: http://localhost:3000 (or per your config)

# Step 3: Reset database (optional)
make db-reset

# Step 4: Clean environment
make clean
```

---

## 🧪 Manual Setup

### 📦 Install JavaScript Packages

Run inside each folder:

```bash
cd server && yarn install
cd client && yarn install
cd cms && yarn install
```

### 🐘 Run PostgreSQL with Docker

```bash
docker run -d --name postgres -p 54321:54321 postgres
```

> Accessible via: `localhost:54321`

### 🔧 Run Each Module

```bash
cd server && yarn dev         # NestJS backend API
cd client && yarn dev         # React frontend
cd cms && yarn dev            # Next.js Admin CMS
```

App should be running at `http://localhost:8000` (client) and other ports for CMS and API.

---

## 🧱 Project Structure

```bash
📁 packages/client/             # Web client (React)
📁 packages/cms/                # Admin CMS (Next.js)
📁 packages/server/             # API service (NestJS)
📁 packages/server/prisma/      # Prisma schema & migrations
📁 packages/server/scripts/     # Setup and helper scripts
📄 docker-compose.yml
```

---

## 📤 Deployment

### Frontend

```bash
# Build & deploy to Google Cloud Storage or Netlify
yarn deploy
```

### Backend

1. Create `.env.production` inside `/server` with:
```env
DB_HOST=...
DB_PORT=...
DB_USER=...
DB_PASSWORD=...
DB_DATABASE_NAME=...
GOOGLE_STORE_BUCKET=...
JWT_SECRET=...
```

2. Deploy to Google App Engine:
```bash
yarn deploy
```

### CI/CD

CI configured with **GitHub Actions**

- Backend pipeline: `.github/workflows/backend.yml` (if applicable)
- Frontend pipeline: `.github/workflows/frontend.yml` (if applicable)

---

## ✅ Functionalities

- User & Role Management (JWT + OAuth2)
- Courses & Lessons CRUD
- Category, Tag filtering
- Admin CMS for content moderation
- Secure API routes with NestJS guards
- Public course viewing & protected dashboard

---

## 📌 Dev Notes

### What’s Done

- [x] Auth system with JWT
- [x] User dashboards
- [x] Admin controls (CMS)
- [x] Course publishing workflow
- [x] User Authentication
- [ ] Video Upload
- [x] Video Management
- [ ] Livestreaming
- [ ] Video Discovery
- [ ] Social Integration
- [x] Dockerized local setup

### Improvements

- [ ] Add unit & e2e tests
- [ ] Enhance mobile responsiveness
- [ ] Realtime features via socket.io
- [ ] Social Interactions
- [ ] Subscription System
- [ ] User Notifications
- [ ] Search Functionality
- [ ] User Privacy Settings
- [ ] User Analytics
- [ ] Deployment auto pipelines (CI/CD)

---

## 👨‍💻 Contributing

Contributions welcome! Please open an issue or submit a PR for improvements.

---

## 📄 License

Licensed under MIT. See `LICENSE` for more info.
