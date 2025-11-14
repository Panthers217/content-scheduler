const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const postsRouter = require('./routes/posts')
const membersRouter = require('./routes/members')
const templatesRouter = require('./routes/templates')

require('dotenv').config()

const app = express()

// CORS configuration for development and production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? [
          'https://content-scheduler-demo.netlify.app',
          'https://content-scheduler.netlify.app',
          /\.netlify\.app$/,
          /\.onrender\.com$/
        ]
      : [
          'http://localhost:5173', 
          'http://localhost:5174',
          'https://vigilant-fishstick-7wgvvx97jjwcrr7q-5173.app.github.dev',
          'https://vigilant-fishstick-7wgvvx97jjwcrr7q-5174.app.github.dev'
        ]
    
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') return allowed === origin
      if (allowed instanceof RegExp) return allowed.test(origin)
      return false
    })
    
    if (isAllowed) {
      callback(null, true)
    } else {
      console.log('CORS blocked origin:', origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
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
  console.log('MongoDB connection state:', mongoose.connection.readyState)
  console.log('Database name:', mongoose.connection.db?.databaseName)
})
.catch(err => {
  console.error('MongoDB connection error:', err)
  console.log('Connection state on error:', mongoose.connection.readyState)
  // In production, you might want to exit the process
  if (process.env.NODE_ENV === 'production') {
    console.log('Note: Using in-memory storage as fallback')
  }
})

// Routes
app.use('/api/posts', postsRouter);
app.use('/api/members', membersRouter);
app.use('/api/templates', templatesRouter);
app.use('/api/bulk-upload', require('./routes/bulkUpload'));
app.use('/api/analytics', require('./routes/analytics'));

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
})
