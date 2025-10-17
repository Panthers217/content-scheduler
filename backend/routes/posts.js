const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const mongoose = require('mongoose')

function memoryPosts() {
  if (!global._memoryPosts) global._memoryPosts = []
  return global._memoryPosts
}

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      // DB not connected — return in-memory posts for dev
      return res.json(memoryPosts())
    }
    const posts = await Post.find().sort({ scheduledAt: -1 }).limit(50)
    res.json(posts)
  } catch (err) {
    console.error('posts GET error', err.message)
    res.status(500).json({ error: 'failed_fetch' })
  }
})

// POST /api/posts
router.post('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const p = Object.assign({ _id: String(Date.now()) }, req.body)
      memoryPosts().unshift(p)
      return res.status(201).json(p)
    }
    const p = new Post(req.body)
    await p.save()
    res.status(201).json(p)
  } catch (err) {
    console.error('posts POST error', err && err.message)
    res.status(400).json({ error: 'invalid_payload' })
  }
})

module.exports = router
