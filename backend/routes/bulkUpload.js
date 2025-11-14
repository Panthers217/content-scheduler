const express = require('express')
const multer = require('multer')
const csv = require('csv-parser')
const fs = require('fs')
const Post = require('../models/Post')
const router = express.Router()

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' })

// POST /api/bulk-upload
router.post('/', upload.single('csvFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const results = []
    const errors = []

    // Read and parse CSV file
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        const createdPosts = []

        for (let i = 0; i < results.length; i++) {
          try {
            const row = results[i]
            
            // Validate required fields
            if (!row.title || !row.content) {
              errors.push({ row: i + 1, error: 'Missing title or content' })
              continue
            }

            // Parse scheduled time
            let scheduledTime = new Date()
            if (row.scheduledTime) {
              scheduledTime = new Date(row.scheduledTime)
              if (isNaN(scheduledTime.getTime())) {
                scheduledTime = new Date()
              }
            }

            // Create post object
            const postData = {
              title: row.title,
              content: row.content,
              scheduledTime,
              status: row.status || 'scheduled',
              author: row.author || 'bulk-upload',
              category: row.category || 'general',
              platform: row.platform || 'general',
              tags: row.tags ? row.tags.split(',').map(tag => tag.trim()) : []
            }

            // Handle recurring posts
            if (row.isRecurring === 'true' || row.isRecurring === true) {
              postData.isRecurring = true
              postData.recurringPattern = {
                type: row.recurringType || 'daily',
                interval: parseInt(row.recurringInterval) || 1,
                endDate: row.recurringEndDate ? new Date(row.recurringEndDate) : null,
                daysOfWeek: row.daysOfWeek ? row.daysOfWeek.split(',').map(d => parseInt(d.trim())) : [],
                dayOfMonth: row.dayOfMonth ? parseInt(row.dayOfMonth) : null
              }
            }

            const post = new Post(postData)
            await post.save()
            createdPosts.push(post)

          } catch (error) {
            errors.push({ row: i + 1, error: error.message })
          }
        }

        // Clean up uploaded file
        fs.unlinkSync(req.file.path)

        res.json({
          success: true,
          created: createdPosts.length,
          errors: errors.length,
          posts: createdPosts,
          errorDetails: errors
        })
      })
      .on('error', (error) => {
        // Clean up uploaded file
        fs.unlinkSync(req.file.path)
        res.status(500).json({ error: 'Failed to process CSV file' })
      })

  } catch (err) {
    console.error('Bulk upload error:', err)
    res.status(500).json({ error: 'Upload failed' })
  }
})

// GET /api/bulk-upload/template - Download CSV template
router.get('/template', (req, res) => {
  const csvTemplate = `title,content,scheduledTime,status,author,category,platform,tags,isRecurring,recurringType,recurringInterval,recurringEndDate,daysOfWeek,dayOfMonth
"Sample Post Title","This is sample content for your post","2025-11-15T10:00:00Z","scheduled","admin","general","general","tag1,tag2","false","","","","",""
"Recurring Daily Post","This post will repeat daily","2025-11-16T09:00:00Z","scheduled","admin","marketing","twitter","daily,social","true","daily","1","2025-12-31T23:59:59Z","",""
"Weekly Post","This post repeats on weekdays","2025-11-17T14:00:00Z","scheduled","admin","updates","linkedin","weekly,business","true","weekly","1","","1,2,3,4,5",""
`

  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename=bulk-upload-template.csv')
  res.send(csvTemplate)
})

module.exports = router