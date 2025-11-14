const express = require('express')
const Post = require('../models/Post')
const router = express.Router()

// GET /api/analytics/overview - Get overall analytics
router.get('/overview', async (req, res) => {
  try {
    const { startDate, endDate, platform, category } = req.query
    
    // Build date filter
    let dateFilter = {}
    if (startDate || endDate) {
      dateFilter.createdAt = {}
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate)
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate)
    }

    // Build additional filters
    let additionalFilters = {}
    if (platform) additionalFilters.platform = platform
    if (category) additionalFilters.category = category

    const matchFilter = { ...dateFilter, ...additionalFilters }

    // Aggregate analytics data
    const analytics = await Post.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: null,
          totalPosts: { $sum: 1 },
          totalViews: { $sum: '$analytics.views' },
          totalClicks: { $sum: '$analytics.clicks' },
          totalLikes: { $sum: '$analytics.likes' },
          totalShares: { $sum: '$analytics.shares' },
          totalComments: { $sum: '$analytics.comments' },
          totalImpressions: { $sum: '$analytics.impressions' },
          avgEngagementRate: { $avg: '$analytics.engagementRate' },
          avgClickThroughRate: { $avg: '$analytics.clickThroughRate' },
          publishedPosts: { 
            $sum: { $cond: [{ $eq: ['$status', 'published'] }, 1, 0] } 
          },
          scheduledPosts: { 
            $sum: { $cond: [{ $eq: ['$status', 'scheduled'] }, 1, 0] } 
          },
          draftPosts: { 
            $sum: { $cond: [{ $eq: ['$status', 'draft'] }, 1, 0] } 
          }
        }
      }
    ])

    const result = analytics[0] || {
      totalPosts: 0,
      totalViews: 0,
      totalClicks: 0,
      totalLikes: 0,
      totalShares: 0,
      totalComments: 0,
      totalImpressions: 0,
      avgEngagementRate: 0,
      avgClickThroughRate: 0,
      publishedPosts: 0,
      scheduledPosts: 0,
      draftPosts: 0
    }

    // Calculate derived metrics
    result.totalEngagements = result.totalLikes + result.totalShares + result.totalComments
    result.overallEngagementRate = result.totalImpressions > 0 
      ? (result.totalEngagements / result.totalImpressions) * 100 
      : 0
    result.overallClickThroughRate = result.totalViews > 0 
      ? (result.totalClicks / result.totalViews) * 100 
      : 0

    res.json(result)
  } catch (err) {
    console.error('Analytics overview error:', err)
    res.status(500).json({ error: 'Failed to fetch analytics overview' })
  }
})

// GET /api/analytics/posts/:id - Get analytics for specific post
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const analytics = {
      postId: post._id,
      title: post.title,
      status: post.status,
      createdAt: post.createdAt,
      scheduledTime: post.scheduledTime,
      analytics: post.analytics,
      performance: post.performance,
      events: post.events.slice(-50) // Last 50 events
    }

    res.json(analytics)
  } catch (err) {
    console.error('Post analytics error:', err)
    res.status(500).json({ error: 'Failed to fetch post analytics' })
  }
})

// POST /api/analytics/track/:id/:event - Track analytics event
router.post('/track/:id/:event', async (req, res) => {
  try {
    const { id, event } = req.params
    const { metadata } = req.body

    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    // Track the event based on type
    switch (event) {
      case 'view':
        await post.incrementViews()
        break
      case 'click':
        await post.incrementClicks()
        break
      case 'like':
        await post.incrementLikes()
        break
      case 'share':
        await post.incrementShares()
        break
      case 'comment':
        await post.incrementComments()
        break
      default:
        return res.status(400).json({ error: 'Invalid event type' })
    }

    // Add metadata if provided
    if (metadata) {
      const lastEvent = post.events[post.events.length - 1]
      lastEvent.metadata = metadata
      await post.save()
    }

    res.json({ success: true, analytics: post.analytics })
  } catch (err) {
    console.error('Analytics tracking error:', err)
    res.status(500).json({ error: 'Failed to track event' })
  }
})

// GET /api/analytics/trends - Get analytics trends over time
router.get('/trends', async (req, res) => {
  try {
    const { period = '7d', platform, category } = req.query
    
    // Calculate date range based on period
    const now = new Date()
    let startDate
    switch (period) {
      case '24h':
        startDate = new Date(now - 24 * 60 * 60 * 1000)
        break
      case '7d':
        startDate = new Date(now - 7 * 24 * 60 * 60 * 1000)
        break
      case '30d':
        startDate = new Date(now - 30 * 24 * 60 * 60 * 1000)
        break
      case '90d':
        startDate = new Date(now - 90 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(now - 7 * 24 * 60 * 60 * 1000)
    }

    // Build filters
    let matchFilter = {
      createdAt: { $gte: startDate }
    }
    if (platform) matchFilter.platform = platform
    if (category) matchFilter.category = category

    // Group by date
    const trends = await Post.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: {
            $dateToString: {
              format: period === '24h' ? '%Y-%m-%d %H:00' : '%Y-%m-%d',
              date: '$createdAt'
            }
          },
          posts: { $sum: 1 },
          views: { $sum: '$analytics.views' },
          clicks: { $sum: '$analytics.clicks' },
          likes: { $sum: '$analytics.likes' },
          shares: { $sum: '$analytics.shares' },
          comments: { $sum: '$analytics.comments' },
          impressions: { $sum: '$analytics.impressions' }
        }
      },
      { $sort: { _id: 1 } }
    ])

    res.json(trends)
  } catch (err) {
    console.error('Analytics trends error:', err)
    res.status(500).json({ error: 'Failed to fetch analytics trends' })
  }
})

// GET /api/analytics/top-posts - Get top performing posts
router.get('/top-posts', async (req, res) => {
  try {
    const { metric = 'views', limit = 10, platform, category } = req.query
    
    let matchFilter = { status: 'published' }
    if (platform) matchFilter.platform = platform
    if (category) matchFilter.category = category

    const sortField = `analytics.${metric}`
    
    const topPosts = await Post.find(matchFilter)
      .sort({ [sortField]: -1 })
      .limit(parseInt(limit))
      .select('title content platform category analytics createdAt scheduledTime')

    res.json(topPosts)
  } catch (err) {
    console.error('Top posts error:', err)
    res.status(500).json({ error: 'Failed to fetch top posts' })
  }
})

// GET /api/analytics/platform-breakdown - Get analytics by platform
router.get('/platform-breakdown', async (req, res) => {
  try {
    const { startDate, endDate } = req.query
    
    let dateFilter = {}
    if (startDate || endDate) {
      dateFilter.createdAt = {}
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate)
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate)
    }

    const breakdown = await Post.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$platform',
          posts: { $sum: 1 },
          views: { $sum: '$analytics.views' },
          clicks: { $sum: '$analytics.clicks' },
          likes: { $sum: '$analytics.likes' },
          shares: { $sum: '$analytics.shares' },
          comments: { $sum: '$analytics.comments' },
          impressions: { $sum: '$analytics.impressions' },
          avgEngagementRate: { $avg: '$analytics.engagementRate' }
        }
      },
      { $sort: { posts: -1 } }
    ])

    res.json(breakdown)
  } catch (err) {
    console.error('Platform breakdown error:', err)
    res.status(500).json({ error: 'Failed to fetch platform breakdown' })
  }
})

// GET /api/analytics/category-breakdown - Get analytics by category
router.get('/category-breakdown', async (req, res) => {
  try {
    const { startDate, endDate } = req.query
    
    let dateFilter = {}
    if (startDate || endDate) {
      dateFilter.createdAt = {}
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate)
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate)
    }

    const breakdown = await Post.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$category',
          posts: { $sum: 1 },
          views: { $sum: '$analytics.views' },
          clicks: { $sum: '$analytics.clicks' },
          likes: { $sum: '$analytics.likes' },
          shares: { $sum: '$analytics.shares' },
          comments: { $sum: '$analytics.comments' },
          impressions: { $sum: '$analytics.impressions' },
          avgEngagementRate: { $avg: '$analytics.engagementRate' }
        }
      },
      { $sort: { posts: -1 } }
    ])

    res.json(breakdown)
  } catch (err) {
    console.error('Category breakdown error:', err)
    res.status(500).json({ error: 'Failed to fetch category breakdown' })
  }
})

// PUT /api/analytics/posts/:id/impressions - Update post impressions (usually from external APIs)
router.put('/posts/:id/impressions', async (req, res) => {
  try {
    const { impressions } = req.body
    
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    post.analytics.impressions = impressions
    post.analytics.lastUpdated = new Date()
    post.updateEngagementRate()
    
    await post.save()

    res.json({ success: true, analytics: post.analytics })
  } catch (err) {
    console.error('Update impressions error:', err)
    res.status(500).json({ error: 'Failed to update impressions' })
  }
})

module.exports = router