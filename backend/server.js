const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const postsRouter = require('./routes/posts')
const membersRouter = require('./routes/members')

require('dotenv').config()

const app = express()

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://content-scheduler-demo.netlify.app', 'https://*.netlify.app', 'https://*.onrender.com'] // Updated with your Netlify URL
    : ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(bodyParser.json())

const port = process.env.PORT || 4000

// MongoDB connection with better error handling
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/content_scheduler'

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB:', process.env.NODE_ENV === 'production' ? 'Production DB' : 'Local DB')
})
.catch(err => {
  console.error('MongoDB connection error:', err)
  // In production, you might want to exit the process
  if (process.env.NODE_ENV === 'production') {
    console.log('Note: Using in-memory storage as fallback')
  }
})

app.use('/api/posts', postsRouter)
app.use('/api/members', membersRouter)

app.get('/health', (req, res) => res.json({ ok: true }))

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`MongoDB: ${process.env.MONGODB_URI ? 'Connected' : 'Local/Memory'}`)
  
  // Keep Render.com server awake with 15-minute ping
  if (process.env.NODE_ENV === 'production' && process.env.RENDER_EXTERNAL_URL) {
    setInterval(() => {
      fetch(`${process.env.RENDER_EXTERNAL_URL}/health`)
        .then(() => console.log('Keep-alive ping sent'))
        .catch(err => console.error('Keep-alive ping failed:', err))
    }, 15 * 60 * 1000) // 15 minutes
  }
})
