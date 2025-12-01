# Content Scheduler — Project Folder Structure

```
content-scheduler/
│
├── backend/                           # Node.js/Express API Server
│   ├── models/                        # MongoDB Mongoose Models
│   │   ├── Member.js                  # Team member schema
│   │   ├── Post.js                    # Post schema with analytics
│   │   └── PostTemplate.js            # Reusable post templates
│   │
│   ├── routes/                        # API Route Handlers
│   │   ├── analytics.js               # Analytics endpoints
│   │   ├── bulkUpload.js              # CSV bulk upload
│   │   ├── members.js                 # Team member CRUD
│   │   ├── posts.js                   # Post CRUD operations
│   │   └── templates.js               # Template management
│   │
│   ├── utils/                         # Utility functions
│   ├── uploads/                       # File upload directory
│   ├── .env                           # Environment variables (not in git)
│   ├── .env.example                   # Example env configuration
│   ├── Dockerfile                     # Docker configuration for backend
│   ├── markDemoData.js                # Script to mark demo posts
│   ├── markDemoMembers.js             # Script to mark demo members
│   ├── package.json                   # Backend dependencies
│   ├── package-lock.json              # Locked dependency versions
│   ├── README.md                      # Backend setup instructions
│   └── server.js                      # Express app entry point
│
├── frontend/                          # React + Vite Application
│   ├── public/                        # Static assets
│   │   └── _redirects                 # Netlify redirect rules
│   │
│   ├── src/                           # Source code
│   │   ├── components/                # React Components
│   │   │   ├── Analytics.jsx          # Analytics dashboard
│   │   │   ├── Calendar.jsx           # Calendar view (month/week/day)
│   │   │   ├── Dashboard.jsx          # Main dashboard
│   │   │   ├── MemberRow.jsx          # Team member row component
│   │   │   ├── NavBar.jsx             # Navigation header
│   │   │   ├── ProjectWalkthroughVideo.jsx  # Video embed component
│   │   │   ├── Scheduler.jsx          # Post scheduling form
│   │   │   └── Team.jsx               # Team management page
│   │   │
│   │   ├── config/                    # Configuration files
│   │   │   └── api.js                 # API URL configuration
│   │   │
│   │   ├── App.jsx                    # Root component with routing
│   │   ├── firebase.js                # Firebase configuration
│   │   ├── index.css                  # Global styles (Tailwind imports)
│   │   └── main.jsx                   # React entry point
│   │
│   ├── .env                           # Frontend environment variables
│   ├── Dockerfile                     # Docker configuration for frontend
│   ├── index.html                     # HTML entry point
│   ├── netlify.toml                   # Netlify deployment config
│   ├── package.json                   # Frontend dependencies
│   ├── package-lock.json              # Locked dependency versions
│   ├── postcss.config.cjs             # PostCSS configuration
│   ├── README.md                      # Frontend setup instructions
│   ├── tailwind.config.cjs            # Tailwind CSS configuration
│   └── vite.config.js                 # Vite build configuration
│
├── .git/                              # Git version control
├── .gitignore                         # Files to ignore in git
├── .vscode/                           # VS Code workspace settings
├── COMPONENTS.md                      # Component documentation
├── Content-schedulerVIDEO_TUTORIAL_README.md  # Video script guide
├── DEPLOYMENT.md                      # Deployment instructions
├── DOCKER_SETUP.md                    # Docker setup guide
├── MONGODB_SETUP.md                   # MongoDB configuration guide
├── README.md                          # Main project documentation
├── VIDEO_RECORDING_ACTIONS.md         # Video recording checklist
├── content-scheduler.code-workspace   # VS Code workspace file
├── docker-compose.yml                 # Docker Compose configuration
└── render.yaml                        # Render.com deployment config
```

---

## Key Directories Explained

### `/backend` — API Server
- **Purpose:** RESTful API built with Express and MongoDB
- **Key Files:**
  - `server.js` — Express app initialization, middleware, routes
  - `models/Post.js` — Post schema with analytics fields and demo protection
  - `routes/posts.js` — CRUD operations with demo data guards
  - `routes/analytics.js` — Aggregation queries for metrics

### `/frontend` — React SPA
- **Purpose:** Single-page application with routing and state management
- **Key Files:**
  - `src/App.jsx` — Top-level routing and layout
  - `src/components/Calendar.jsx` — Calendar grid with responsive design
  - `src/components/Scheduler.jsx` — Post creation form
  - `tailwind.config.cjs` — Custom breakpoints and theme configuration

### Configuration Files
- **Docker:** `Dockerfile` (backend/frontend), `docker-compose.yml`
- **Deployment:** `netlify.toml`, `render.yaml`
- **Build Tools:** `vite.config.js`, `postcss.config.cjs`, `tailwind.config.cjs`
- **Environment:** `.env` files (not committed to git)

---

## File Count Summary
- **Backend:** ~15 source files (excluding node_modules)
- **Frontend:** ~14 component/source files
- **Documentation:** 7 markdown files
- **Configuration:** 10+ config files
- **Total Lines of Code:** ~3,000+ (estimated)

---

## Technology Stack by Directory

| Directory | Technologies |
|-----------|-------------|
| `/backend` | Node.js, Express, MongoDB, Mongoose, Multer, CORS |
| `/frontend` | React, Vite, Tailwind CSS, React Router, Axios |
| `/` (root) | Docker, Docker Compose, Git, VS Code |

---

## Development Workflow
1. **Backend:** `cd backend && npm run dev` (runs on port 5001)
2. **Frontend:** `cd frontend && npm run dev` (runs on port 5173)
3. **Database:** MongoDB Atlas or local MongoDB instance
4. **Environment:** Configure `.env` files in both directories

---

This structure follows industry best practices with clear separation of concerns, modular architecture, and scalable organization.
