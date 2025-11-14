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
    const posts = await Post.find().sort({ scheduledTime: -1 }).limit(50)
    res.json(posts)
  } catch (err) {
    console.error('posts GET error', err.message)
    res.status(500).json({ error: 'failed_fetch' })
  }
})

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const post = memoryPosts().find(p => p._id === req.params.id)
      return post ? res.json(post) : res.status(404).json({ error: 'post_not_found' })
    }
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ error: 'post_not_found' })
    }
    res.json(post)
  } catch (err) {
    console.error('posts GET by ID error', err.message)
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
    // New posts are not demo data by default
    const postData = { ...req.body, isDemoData: false }
    const p = new Post(postData)
    await p.save()
    res.status(201).json(p)
  } catch (err) {
    console.error('posts POST error', err && err.message)
    res.status(400).json({ error: 'invalid_payload' })
  }
})

// PUT /api/posts/:id
router.put('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const index = memoryPosts().findIndex(p => p._id === req.params.id)
      if (index === -1) return res.status(404).json({ error: 'post_not_found' })
      memoryPosts()[index] = { ...memoryPosts()[index], ...req.body }
      return res.json(memoryPosts()[index])
    }

    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ error: 'post_not_found' })
    }

    // Check if this is demo data
    if (post.isDemoData) {
      return res.status(403).json({ 
        error: 'demo_data_protected',
        message: 'Demo data cannot be modified. This is sample data for demonstration purposes.'
      })
    }

    // Update the post
    Object.assign(post, req.body)
    await post.save()
    res.json(post)
  } catch (err) {
    console.error('posts PUT error', err.message)
    res.status(400).json({ error: 'invalid_payload' })
  }
})

// DELETE /api/posts/:id
router.delete('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const index = memoryPosts().findIndex(p => p._id === req.params.id)
      if (index === -1) return res.status(404).json({ error: 'post_not_found' })
      memoryPosts().splice(index, 1)
      return res.json({ success: true })
    }

    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ error: 'post_not_found' })
    }

    // Check if this is demo data
    if (post.isDemoData) {
      return res.status(403).json({ 
        error: 'demo_data_protected',
        message: 'Demo data cannot be deleted. This is sample data for demonstration purposes.'
      })
    }

    await Post.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error('posts DELETE error', err.message)
    res.status(500).json({ error: 'failed_delete' })
  }
})

module.exports = router
