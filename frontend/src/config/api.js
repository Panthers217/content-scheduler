// API configuration for different environments
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://your-backend-app.onrender.com' // Replace with your Render URL
    : 'http://localhost:4000'
  )

export { API_BASE_URL }