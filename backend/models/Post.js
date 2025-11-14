const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  scheduledTime: { type: Date, default: Date.now },
  status: { type: String, enum: ['scheduled','published','failed','draft'], default: 'scheduled' },
  author: { type: String, default: 'admin' },
  tags: [{ type: String }],
  clicks: { type: Number, default: 0 },
  
  // New fields for advanced features
  category: { type: String, default: 'general' },
  platform: { type: String, enum: ['twitter', 'linkedin', 'facebook', 'instagram', 'general'], default: 'general' },
  
  // Recurring post settings
  isRecurring: { type: Boolean, default: false },
  recurringPattern: {
    type: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
    interval: { type: Number, default: 1 }, // Every X days/weeks/months
    endDate: { type: Date },
    daysOfWeek: [{ type: Number, min: 0, max: 6 }], // 0=Sunday, 6=Saturday
    dayOfMonth: { type: Number, min: 1, max: 31 } // For monthly recurring
  },
  parentPostId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // For recurring instances
  
  // Template reference
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostTemplate'
  },

  // Analytics fields
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
    impressions: {
      type: Number,
      default: 0
    },
    engagementRate: {
      type: Number,
      default: 0
    },
    clickThroughRate: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },

  // Performance metrics
  performance: {
    reach: {
      type: Number,
      default: 0
    },
    frequency: {
      type: Number,
      default: 0
    },
    costPerClick: {
      type: Number,
      default: 0
    },
    returnOnInvestment: {
      type: Number,
      default: 0
    }
  },

  // Tracking events
  events: [{
    type: {
      type: String,
      enum: ['view', 'click', 'like', 'share', 'comment', 'impression'],
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    metadata: {
      userAgent: String,
      ipAddress: String,
      referrer: String,
      location: String
    }
  }]
}, { timestamps: true })

// Analytics methods
postSchema.methods.incrementViews = function() {
  this.analytics.views += 1
  this.analytics.lastUpdated = new Date()
  this.events.push({ type: 'view' })
  return this.save()
}

postSchema.methods.incrementClicks = function() {
  this.analytics.clicks += 1
  this.analytics.lastUpdated = new Date()
  this.events.push({ type: 'click' })
  this.updateEngagementRate()
  return this.save()
}

postSchema.methods.incrementLikes = function() {
  this.analytics.likes += 1
  this.analytics.lastUpdated = new Date()
  this.events.push({ type: 'like' })
  this.updateEngagementRate()
  return this.save()
}

postSchema.methods.incrementShares = function() {
  this.analytics.shares += 1
  this.analytics.lastUpdated = new Date()
  this.events.push({ type: 'share' })
  this.updateEngagementRate()
  return this.save()
}

postSchema.methods.incrementComments = function() {
  this.analytics.comments += 1
  this.analytics.lastUpdated = new Date()
  this.events.push({ type: 'comment' })
  this.updateEngagementRate()
  return this.save()
}

postSchema.methods.updateEngagementRate = function() {
  const totalEngagements = this.analytics.likes + this.analytics.shares + this.analytics.comments + this.analytics.clicks
  if (this.analytics.impressions > 0) {
    this.analytics.engagementRate = (totalEngagements / this.analytics.impressions) * 100
  }
  if (this.analytics.views > 0) {
    this.analytics.clickThroughRate = (this.analytics.clicks / this.analytics.views) * 100
  }
}

module.exports = mongoose.model('Post', postSchema)
