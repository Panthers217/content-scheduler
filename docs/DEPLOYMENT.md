# Content Scheduler - Deployment Guide

This guide explains how to deploy the Content Scheduler app to production using Netlify (frontend) and Render (backend).

## 📋 Prerequisites

- GitHub account
- Netlify account
- Render account  
- MongoDB Atlas account (optional, for persistent database)

## 🚀 Backend Deployment (Render)

### 1. Prepare Your Repository

1. Push your code to GitHub
2. Make sure `backend/` folder contains all necessary files

### 2. Deploy to Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `content-scheduler-backend` (or your preference)
   - **Runtime**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: `Free` (for demo purposes)

### 3. Set Environment Variables

In Render dashboard, add these environment variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_atlas_connection_string (optional)
```

### 4. Get Your Backend URL

After deployment, Render will provide a URL like:
`https://your-app-name.onrender.com`

**📝 Note**: Free tier services sleep after 15 minutes of inactivity. First request may take 30-60 seconds.

## 🌐 Frontend Deployment (Netlify)

### 1. Update API URLs

1. Copy your Render backend URL
2. Update the placeholder in these files:
   - `frontend/src/components/Scheduler.jsx` 
   - `frontend/src/components/Team.jsx`
   
   Replace `https://your-backend-app.onrender.com` with your actual Render URL.

### 2. Deploy to Netlify

#### Option A: Git-based Deployment (Recommended)

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

#### Option B: Manual Deployment

1. Build the frontend locally:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. Drag and drop the `dist` folder to Netlify

### 3. Set Environment Variables (Optional)

In Netlify dashboard → Site settings → Environment variables:

```
VITE_API_URL=https://your-render-backend-url.onrender.com
```

### 4. Configure Custom Domain (Optional)

1. In Netlify dashboard → Domain settings
2. Add your custom domain
3. Update CORS origins in backend if using custom domain

## 🗄️ Database Setup (Optional)

### MongoDB Atlas (Recommended for Production)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user and get connection string
4. Add connection string to Render environment variables as `MONGODB_URI`

**Note**: Without MongoDB, the app uses in-memory storage (data resets on server restart).

## ✅ Verification Checklist

After deployment, verify:

- [ ] Backend health endpoint: `https://your-backend.onrender.com/health`
- [ ] Frontend loads: `https://your-app.netlify.app`
- [ ] API calls work (check browser dev tools)
- [ ] All routes work (/, /dashboard, /team)
- [ ] CORS is properly configured
- [ ] Environment variables are set

## 🔧 Common Issues

**Backend Issues:**
- **Service sleeps**: Free tier limitation, first request takes time
- **CORS errors**: Update allowed origins in `server.js`
- **Build fails**: Check Node version (requires 18+)

**Frontend Issues:**
- **API calls fail**: Check environment variables and URLs
- **Routing issues**: Ensure `_redirects` file is in place
- **Build fails**: Check dependencies and Vite config

**Database Issues:**
- **Connection fails**: Check MongoDB Atlas IP whitelist (set to 0.0.0.0/0 for Render)
- **Data not persisting**: Verify `MONGODB_URI` environment variable

## 📱 Demo URLs

After deployment, update your portfolio/resume with:

- **Live App**: `https://your-app.netlify.app`
- **Backend API**: `https://your-backend.onrender.com`
- **Source Code**: `https://github.com/yourusername/content-scheduler`

## 🎯 For Employers

This project demonstrates:
- **Full-Stack Development**: React frontend + Express backend
- **Modern UI/UX**: Responsive design with Tailwind CSS
- **Database Integration**: MongoDB with Mongoose ODM
- **API Design**: RESTful endpoints with proper error handling
- **Production Deployment**: Multi-platform deployment strategy
- **Environment Management**: Development vs. production configurations

---

**Tech Stack**: React, Express.js, MongoDB, Tailwind CSS, Vite, Node.js
**Deployment**: Netlify + Render
**Demo Ready**: Professional UI suitable for client presentations