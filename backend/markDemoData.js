const mongoose = require('mongoose')
require('dotenv').config()

// Import the Post model
const Post = require('./models/Post')

async function markExistingDataAsDemo() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    console.log('Connected to MongoDB')
    
    // Find all existing posts that are not already marked as demo data
    const existingPosts = await Post.find({ isDemoData: { $ne: true } })
    
    console.log(`Found ${existingPosts.length} posts to mark as demo data`)
    
    if (existingPosts.length === 0) {
      console.log('No posts found to mark as demo data')
      process.exit(0)
    }
    
    // Update all existing posts to be demo data
    const result = await Post.updateMany(
      { isDemoData: { $ne: true } },
      { 
        $set: { 
          isDemoData: true,
          demoDescription: 'This is sample data for demonstration purposes. It cannot be modified or deleted.'
        }
      }
    )
    
    console.log(`Successfully marked ${result.modifiedCount} posts as demo data`)
    
    // Add some sample analytics data to make the demo more interesting
    const demoPosts = await Post.find({ isDemoData: true })
    
    for (const post of demoPosts) {
      // Add some random analytics data for demo purposes
      post.analytics.views = Math.floor(Math.random() * 1000) + 50
      post.analytics.clicks = Math.floor(Math.random() * 200) + 5
      post.analytics.likes = Math.floor(Math.random() * 150) + 3
      post.analytics.shares = Math.floor(Math.random() * 50) + 1
      post.analytics.comments = Math.floor(Math.random() * 30) + 1
      post.analytics.impressions = post.analytics.views + Math.floor(Math.random() * 500) + 100
      
      // Calculate engagement rate
      const totalEngagements = post.analytics.likes + post.analytics.shares + post.analytics.comments + post.analytics.clicks
      if (post.analytics.impressions > 0) {
        post.analytics.engagementRate = (totalEngagements / post.analytics.impressions) * 100
      }
      
      // Calculate click-through rate
      if (post.analytics.views > 0) {
        post.analytics.clickThroughRate = (post.analytics.clicks / post.analytics.views) * 100
      }
      
      post.analytics.lastUpdated = new Date()
      
      // Add some sample events
      const eventTypes = ['view', 'click', 'like', 'share', 'comment']
      const numEvents = Math.floor(Math.random() * 10) + 5
      
      for (let i = 0; i < numEvents; i++) {
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
        const eventDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time in last 7 days
        
        post.events.push({
          type: eventType,
          timestamp: eventDate,
          metadata: {
            userAgent: 'Demo User Agent',
            location: 'Demo Location'
          }
        })
      }
      
      await post.save()
    }
    
    console.log(`Added sample analytics data to ${demoPosts.length} demo posts`)
    console.log('Demo data setup complete!')
    
  } catch (error) {
    console.error('Error marking data as demo:', error)
  } finally {
    await mongoose.connection.close()
    console.log('Database connection closed')
    process.exit(0)
  }
}

// Run the script
markExistingDataAsDemo()