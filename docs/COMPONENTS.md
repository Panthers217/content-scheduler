# Content Scheduler — Components and File Map

This document explains what the app does and what each major component/file is responsible for. It's intended as a quick developer reference so new contributors can find where to add features.

Overview
--------
Content Scheduler is a small-team scheduler and analytics dashboard. It allows teams to schedule posts, manage team members and roles, and view basic analytics (clicks, scheduled counts). The repo is split into two folders:

- `frontend/` — Vite + React (JSX), TailwindCSS, Firebase client placeholder, Axios for API calls.
- `backend/` — Express server with Mongoose models, optional Firebase Admin placeholder, and simple REST endpoints.

Frontend (files and purpose)
----------------------------
- `frontend/index.html` — Vite entry HTML.
- `frontend/vite.config.js` — Vite configuration (dev server proxy for `/api` to backend).
- `frontend/package.json` — frontend dependencies & scripts.
- `frontend/postcss.config.cjs` & `tailwind.config.cjs` — Tailwind + PostCSS setup.
- `frontend/src/main.jsx` — React entry point. Boots the app and sets up `BrowserRouter`.
- `frontend/src/App.jsx` — Main layout, top nav, and route definitions:
  - `/` -> Scheduler
  - `/dashboard` -> Analytics Dashboard
  - `/team` -> Team & members management
- `frontend/src/firebase.js` — Firebase client SDK placeholder. Replace values with your Firebase project config if you use Firebase Auth / Firestore.
- `frontend/src/index.css` — Tailwind imports and base styles.

Frontend components
-------------------
- `src/components/Scheduler.jsx`
  - Purpose: Small UI to add scheduled posts and list scheduled items.
  - Communicates with backend at `/api/posts` (GET + POST) via Axios. Optimistic UI used for adding items.
  - Extend: add a scheduler UI (date/time picker), attachments, and publish workflow.

- `src/components/Dashboard.jsx`
  - Purpose: Visual placeholder for analytics: clicks, scheduled counts, team counts, and recent activity.
  - Extend: pull real metrics from backend endpoints (e.g., `/api/analytics`) and render charts.

- `src/components/Team.jsx`
  - Purpose: Manage team members: list, add, and delete members.
  - Uses `/api/members` endpoints. Form fields: name, email, role.
  - Extend: add pagination, role editing, CSV import/export, and invite flows.

- `src/components/MemberRow.jsx`
  - Purpose: Small presentational component used by `Team.jsx` to render each member with actions.

Backend (files and purpose)
--------------------------
- `backend/server.js` — Express app entry point. Connects to MongoDB (MONGODB_URI env), mounts routes, and exposes `/health`.
  - Note: Uses `dotenv` to load `.env`. Configure `MONGODB_URI` and `FIREBASE_SERVICE_ACCOUNT` in `.env`.

- `backend/package.json` — backend dependencies & scripts.

- `backend/models/Post.js` — Mongoose model for scheduled posts.
  - Fields: title, scheduledAt, status, createdBy, clicks.

- `backend/routes/posts.js` — Posts REST endpoints:
  - GET `/api/posts` — list scheduled posts (in-memory fallback if DB not connected).
  - POST `/api/posts` — create a scheduled post (supports in-memory fallback in dev).

- `backend/models/Member.js` — Mongoose model for team members.
  - Fields: name, email, role (admin|editor|viewer).

- `backend/routes/members.js` — Members REST endpoints:
  - GET `/api/members` — list members (in-memory fallback if DB not connected).
  - POST `/api/members` — create member.
  - DELETE `/api/members/:id` — delete member.

Dev conveniences
---------------
- In development, if MongoDB isn't available, both `posts.js` and `members.js` use an in-memory store so the front-end can be used for UI testing without setting up a local MongoDB instance. When MongoDB becomes available (and connection state is `connected`), the routes will prefer the database.

Where to add features
---------------------
- Authentication & authorization:
  - Frontend: wire Firebase Auth in `src/firebase.js` and add auth UI (sign-in) pages.
  - Backend: verify Firebase ID tokens using `firebase-admin` before protected routes (e.g., members management).

- Analytics ingestion: add an endpoint like `POST /api/events` to record clicks and impressions, then aggregate them into an `analytics` collection.

- Scheduling & publishing: add a worker or scheduled job (e.g., cron) to the backend to publish scheduled posts (send to social APIs or otherwise).

Notes
-----
- All Firebase configuration is placeholder — add real credentials via environment variables (or a secure secrets mechanism).
- For production use, remove the in-memory fallback and ensure MongoDB is configured. Add proper input validation, rate-limiting, logging, and tests.

If you'd like, I can:
- Add Firebase Auth integration with sample sign-in flow and token verification on the backend.
- Add a small seed script for members and posts.
- Add basic unit tests for backend routes.

End of file.
