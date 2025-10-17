const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const postsRouter = require('./routes/posts')
const membersRouter = require('./routes/members')

require('dotenv').config()

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

const port = process.env.PORT || 4000

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/content_scheduler', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB')).catch(err => console.error('MongoDB connection error', err))

app.use('/api/posts', postsRouter)
app.use('/api/members', membersRouter)

app.get('/health', (req, res) => res.json({ ok: true }))

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`))
