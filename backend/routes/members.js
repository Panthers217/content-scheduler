const express = require('express')
const router = express.Router()
const Member = require('../models/Member')
const mongoose = require('mongoose')

function memoryMembers() {
  if (!global._memoryMembers) global._memoryMembers = []
  return global._memoryMembers
}

// GET /api/members
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(memoryMembers())
    }
    const members = await Member.find().sort({ createdAt: -1 })
    res.json(members)
  } catch (err) {
    console.error('members GET error', err && err.message)
    res.status(500).json({ error: 'failed_fetch' })
  }
})

// POST /api/members
router.post('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const m = Object.assign({ _id: String(Date.now()) }, req.body)
      memoryMembers().unshift(m)
      return res.status(201).json(m)
    }
    const m = new Member(req.body)
    await m.save()
    res.status(201).json(m)
  } catch (err) {
    console.error('members POST error', err && err.message)
    res.status(400).json({ error: 'invalid_payload' })
  }
})

// DELETE /api/members/:id
router.delete('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      global._memoryMembers = memoryMembers().filter(m => m._id !== req.params.id)
      return res.json({ ok: true })
    }
    await Member.findByIdAndDelete(req.params.id)
    res.json({ ok: true })
  } catch (err) {
    console.error('members DELETE error', err && err.message)
    res.status(500).json({ error: 'delete_failed' })
  }
})

module.exports = router
