const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  scheduledAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['scheduled','published','failed'], default: 'scheduled' },
  createdBy: { type: String },
  clicks: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema)
