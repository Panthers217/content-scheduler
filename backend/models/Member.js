const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin','editor','viewer'], default: 'viewer' },
  status: { type: String, enum: ['active','inactive'], default: 'active' },
  joinedAt: { type: Date, default: Date.now },
  permissions: [{ type: String }]
}, { timestamps: true })

module.exports = mongoose.model('Member', MemberSchema)
