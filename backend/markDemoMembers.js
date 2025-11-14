const mongoose = require('mongoose')
require('dotenv').config()

// Import the Member model
const Member = require('./models/Member')

async function markExistingMembersAsDemo() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    console.log('Connected to MongoDB')
    
    // Find all existing members that are not already marked as demo data
    const existingMembers = await Member.find({ isDemoData: { $ne: true } })
    
    console.log(`Found ${existingMembers.length} members to mark as demo data`)
    
    if (existingMembers.length === 0) {
      console.log('No members found to mark as demo data')
      process.exit(0)
    }
    
    // Update all existing members to be demo data
    const result = await Member.updateMany(
      { isDemoData: { $ne: true } },
      { 
        $set: { 
          isDemoData: true,
          demoDescription: 'This is sample team member data for demonstration purposes. It cannot be modified or deleted.'
        }
      }
    )
    
    console.log(`Successfully marked ${result.modifiedCount} members as demo data`)
    console.log('Demo member data setup complete!')
    
  } catch (error) {
    console.error('Error marking members as demo:', error)
  } finally {
    await mongoose.connection.close()
    console.log('Database connection closed')
    process.exit(0)
  }
}

// Run the script
markExistingMembersAsDemo()