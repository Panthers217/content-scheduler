import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Scheduler() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    // Placeholder: fetch scheduled content from backend
    const apiUrl = import.meta.env.MODE === 'production' 
      ? `${import.meta.env.VITE_API_URL || 'https://your-backend-app.onrender.com'}/api/posts`
      : '/api/posts'
    
    axios.get(apiUrl)
      .then(res => setItems(res.data || []))
      .catch(() => setItems([]))
  }, [])

  function addItem(e) {
    e.preventDefault()
    const newItem = { title, scheduledAt: new Date().toISOString() }
    // Optimistic UI
    setItems([newItem, ...items])
    setTitle('')
    const apiUrl = import.meta.env.MODE === 'production' 
      ? `${import.meta.env.VITE_API_URL || 'https://your-backend-app.onrender.com'}/api/posts`
      : '/api/posts'
    
    axios.post(apiUrl, newItem).catch(() => {})
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
        <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Schedule Content
      </h2>
      <form onSubmit={addItem} className="mb-8">
        <div className="flex gap-3">
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="What would you like to schedule?" 
            className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm" 
          />
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-slate-700 text-white rounded-lg hover:from-blue-700 hover:to-slate-800 transition-all duration-200 font-medium shadow-lg">
            Add Post
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {items.length === 0 && (
          <div className="text-center py-12 text-white/60">
            <svg className="w-16 h-16 mx-auto mb-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-lg">No scheduled posts yet</p>
            <p className="text-sm mt-1">Create your first scheduled post above</p>
          </div>
        )}
        {items.map((it, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl hover:bg-white/15 transition-all duration-200">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-medium text-white text-lg">{it.title}</div>
                <div className="text-sm text-white/60 mt-1">
                  {new Date(it.scheduledAt).toLocaleDateString()} at {new Date(it.scheduledAt).toLocaleTimeString()}
                </div>
              </div>
              <div className="ml-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-500 to-slate-600 text-white">
                  {it.status || 'scheduled'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
