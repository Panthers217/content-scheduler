const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  role: { type: String, enum: ['admin','editor','viewer'], default: 'viewer' }
}, { timestamps: true })

module.exports = mongoose.model('Member', MemberSchema)
