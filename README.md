# Content Scheduler

A full-stack content scheduler + analytics dashboard for small teams. Schedule posts, track analytics, and manage team roles with a modern, professional interface.

## 🏗️ Architecture

- **frontend/** — Vite + React (JSX), Tailwind CSS, Firebase client SDK, Axios
- **backend/** — Express + MongoDB (Mongoose), Firebase Admin SDK
- **mongodb-init/** — Database initialization scripts with sample data
- **docker-compose.yml** — Complete containerized development environment

## 🚀 Quick Start

### Option 1: Docker (Recommended)
```bash
# Start all services with one command
docker-compose up -d

# View running services
docker-compose ps

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:3001
# MongoDB: localhost:27017
```

### Option 2: Manual Setup
```bash
# 1. Start MongoDB (using Docker)
docker-compose up -d mongodb

# 2. Start backend
cd backend
npm install
npm run dev

# 3. Start frontend  
cd frontend
npm install
npm run dev
```

## 📊 Features

- **Content Scheduling**: Create, edit, and schedule posts
- **Team Management**: Role-based access control (Admin, Editor, Viewer)
- **Analytics Dashboard**: Track post performance and engagement
- **Modern UI**: Professional design with dark theme and glass morphism
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Updates**: Live data synchronization

## 🗄️ Database

The application includes pre-configured MongoDB with sample data:
- Sample scheduled posts
- Team members with different roles
- Performance indexes for optimal queries

## 🔧 Development

- Hot reload enabled for both frontend and backend
- MongoDB container with persistent data storage
- Environment variables configured for development
- Docker Compose for easy service orchestration

## 📁 Project Structure
```
content-scheduler/
├── frontend/           # React + Vite application
├── backend/           # Express API server
├── mongodb-init/      # Database setup scripts
├── docker-compose.yml # Container orchestration
├── DOCKER_SETUP.md   # Docker documentation
└── README.md         # This file
```

## 🚦 Service Status

Check if all services are running:
```bash
docker-compose ps
```

View service logs:
```bash
docker-compose logs -f
```

## 💼 Portfolio Ready

This project demonstrates:
- Full-stack development skills
- Modern React with Hooks and Context
- RESTful API design
- MongoDB database design
- Docker containerization
- Professional UI/UX design
- Code organization and documentation
