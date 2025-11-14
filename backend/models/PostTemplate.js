const mongoose = require('mongoose')

const PostTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: 'general' },
  platform: { type: String, enum: ['twitter', 'linkedin', 'facebook', 'instagram', 'general'], default: 'general' },
  tags: [{ type: String }],
  
  // Template settings
  isActive: { type: Boolean, default: true },
  usageCount: { type: Number, default: 0 },
  
  // Variables in template (e.g., {{date}}, {{name}})
  variables: [{
    name: { type: String, required: true },
    description: { type: String },
    defaultValue: { type: String }
  }],
  
  createdBy: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('PostTemplate', PostTemplateSchema)