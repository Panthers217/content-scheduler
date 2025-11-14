// API configuration for different environments
const getApiBaseUrl = () => {
  // Check for environment variable first
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  // Local development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:4000'
  }
  
  // Production - replace this with your actual Render backend URL
  return 'https://content-scheduler.onrender.com'
}

export const API_BASE_URL = getApiBaseUrl()

// Helper function for API calls
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`