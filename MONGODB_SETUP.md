# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Click "Try Free" and create an account
3. Verify your email

## Step 2: Create a Free Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (FREE)
3. Select a cloud provider and region (choose closest to you)
4. Name your cluster (e.g., "content-scheduler")
5. Click "Create"

## Step 3: Set Up Database Access
1. **Create Database User**:
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `contentadmin`
   - Password: Generate a secure password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

2. **Set Up Network Access**:
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

## Step 4: Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `content_scheduler`

Example connection string:
```
mongodb+srv://contentadmin:yourpassword@content-scheduler.xxxxx.mongodb.net/content_scheduler?retryWrites=true&w=majority
```

## Step 5: Configure VS Code MongoDB Extension
1. Open MongoDB extension in VS Code sidebar
2. Click "Add Connection"
3. Paste your connection string
4. Click "Connect"

## Step 6: Update Your Application
Add this to your Render environment variables:
```
MONGODB_URI=mongodb+srv://contentadmin:yourpassword@content-scheduler.xxxxx.mongodb.net/content_scheduler?retryWrites=true&w=majority
```

## Security Notes
- Never commit connection strings to git
- Use environment variables for sensitive data
- Consider IP whitelisting for production