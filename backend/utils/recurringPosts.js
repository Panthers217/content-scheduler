const Post = require('../models/Post')

class RecurringPostService {
  // Generate next occurrence for a recurring post
  static getNextOccurrence(post, fromDate = new Date()) {
    if (!post.isRecurring || !post.recurringPattern) return null

    const { type, interval, endDate, daysOfWeek, dayOfMonth } = post.recurringPattern
    let nextDate = new Date(fromDate)

    switch (type) {
      case 'daily':
        nextDate.setDate(nextDate.getDate() + interval)
        break

      case 'weekly':
        if (daysOfWeek && daysOfWeek.length > 0) {
          // Find next occurrence based on days of week
          let daysToAdd = 1
          while (daysToAdd <= 7) {
            const testDate = new Date(fromDate)
            testDate.setDate(testDate.getDate() + daysToAdd)
            if (daysOfWeek.includes(testDate.getDay())) {
              nextDate = testDate
              break
            }
            daysToAdd++
          }
        } else {
          nextDate.setDate(nextDate.getDate() + (7 * interval))
        }
        break

      case 'monthly':
        if (dayOfMonth) {
          nextDate.setMonth(nextDate.getMonth() + interval)
          nextDate.setDate(Math.min(dayOfMonth, new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0).getDate()))
        } else {
          nextDate.setMonth(nextDate.getMonth() + interval)
        }
        break
    }

    // Check if next occurrence is past end date
    if (endDate && nextDate > new Date(endDate)) {
      return null
    }

    return nextDate
  }

  // Create next instance of a recurring post
  static async createNextInstance(originalPost) {
    const nextDate = this.getNextOccurrence(originalPost, originalPost.scheduledTime)
    if (!nextDate) return null

    const nextInstance = new Post({
      title: originalPost.title,
      content: originalPost.content,
      scheduledTime: nextDate,
      status: 'scheduled',
      author: originalPost.author,
      tags: originalPost.tags,
      category: originalPost.category,
      platform: originalPost.platform,
      parentPostId: originalPost._id,
      templateId: originalPost.templateId
    })

    await nextInstance.save()
    return nextInstance
  }

  // Generate all upcoming instances for a recurring post
  static async generateUpcomingInstances(originalPost, daysAhead = 30) {
    if (!originalPost.isRecurring) return []

    const instances = []
    let currentDate = new Date(originalPost.scheduledTime)
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + daysAhead)

    while (currentDate <= endDate) {
      const nextDate = this.getNextOccurrence(originalPost, currentDate)
      if (!nextDate) break

      // Check if instance already exists
      const existingInstance = await Post.findOne({
        parentPostId: originalPost._id,
        scheduledTime: {
          $gte: new Date(nextDate.getTime() - 1000), // 1 sec tolerance
          $lte: new Date(nextDate.getTime() + 1000)
        }
      })

      if (!existingInstance) {
        const instance = await this.createNextInstance({
          ...originalPost.toObject(),
          scheduledTime: nextDate
        })
        instances.push(instance)
      }

      currentDate = nextDate
    }

    return instances
  }
}

module.exports = RecurringPostService