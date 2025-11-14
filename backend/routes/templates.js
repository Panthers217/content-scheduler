const express = require('express')
const router = express.Router()
const PostTemplate = require('../models/PostTemplate')
const mongoose = require('mongoose')

// GET /api/templates
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([])
    }
    const templates = await PostTemplate.find({ isActive: true }).sort({ createdAt: -1 })
    res.json(templates)
  } catch (err) {
    console.error('templates GET error', err.message)
    res.status(500).json({ error: 'failed_fetch' })
  }
})

// POST /api/templates
router.post('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ error: 'database_not_connected' })
    }
    const template = new PostTemplate(req.body)
    await template.save()
    res.status(201).json(template)
  } catch (err) {
    console.error('templates POST error', err && err.message)
    res.status(400).json({ error: 'invalid_payload' })
  }
})

// PUT /api/templates/:id
router.put('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ error: 'database_not_connected' })
    }
    const template = await PostTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!template) {
      return res.status(404).json({ error: 'template_not_found' })
    }
    res.json(template)
  } catch (err) {
    console.error('templates PUT error', err && err.message)
    res.status(400).json({ error: 'update_failed' })
  }
})

// DELETE /api/templates/:id
router.delete('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ error: 'database_not_connected' })
    }
    await PostTemplate.findByIdAndUpdate(req.params.id, { isActive: false })
    res.json({ ok: true })
  } catch (err) {
    console.error('templates DELETE error', err && err.message)
    res.status(500).json({ error: 'delete_failed' })
  }
})

module.exports = router