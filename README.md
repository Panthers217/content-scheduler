# Content Scheduler

Monorepo starter for a small-team content scheduler + analytics dashboard.

Structure:

- frontend/ — Vite + React (JSX), Tailwind, Firebase client SDK, Axios
- backend/ — Express + MongoDB (Mongoose), Firebase Admin placeholder

Quick start (local):

1. Start backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env and set MONGODB_URI
npm run dev
```

2. Start frontend

```bash
cd frontend
npm install
npm run dev
```

This scaffold provides basic posts endpoints and a simple React UI. Next steps: add authentication (Firebase Auth), role-based access, analytics ingestion endpoints, and tests.
# content-scheduler
A content scheduler + analytics dashboard for small teams (think: schedule posts, track clicks, team roles).
