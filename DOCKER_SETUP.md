# Content Scheduler - Docker Setup

This folder contains the complete Docker setup for the Content Scheduler application.

## 📁 Project Structure
```
content-scheduler/
├── frontend/           # React + Vite frontend
├── backend/           # Express + MongoDB backend  
├── mongodb-init/      # MongoDB initialization scripts
├── docker-compose.yml # Container orchestration
└── README.md         # Project documentation
```

## 🚀 Quick Start

### Start All Services
```bash
docker-compose up -d
```

### View Running Containers
```bash
docker-compose ps
```

### Stop All Services
```bash
docker-compose down
```

## 🗄️ Database Access

### MongoDB Shell
```bash
docker-compose exec mongodb mongosh -u admin -p password123 --authenticationDatabase admin
```

### Connect to Content Scheduler Database
```bash
docker-compose exec mongodb mongosh -u admin -p password123 content_scheduler --authenticationDatabase admin
```

## 🔧 Individual Service Management

### MongoDB Only
```bash
docker-compose up -d mongodb
```

### Backend Only  
```bash
docker-compose up -d backend
```

### Frontend Only
```bash
docker-compose up -d frontend
```

## 📊 Service URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **MongoDB**: localhost:27017

## 🔍 Monitoring

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f mongodb
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Container Status
```bash
docker-compose ps
```

## 🗂️ Data Persistence

- MongoDB data is persisted in the `mongodb_data` Docker volume
- Application code is mounted for development (hot reload)

## 🔧 Development

The containers are configured for development with:
- Hot reload for frontend and backend
- Volume mounts for code changes
- Development environment variables