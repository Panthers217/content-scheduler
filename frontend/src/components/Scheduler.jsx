import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Scheduler() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    // Placeholder: fetch scheduled content from backend
    axios.get('/api/posts')
      .then(res => setItems(res.data || []))
      .catch(() => setItems([]))
  }, [])

  function addItem(e) {
    e.preventDefault()
    const newItem = { title, scheduledAt: new Date().toISOString() }
    // Optimistic UI
    setItems([newItem, ...items])
    setTitle('')
    axios.post('/api/posts', newItem).catch(() => {})
  }

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Schedule Content</h2>
      <form onSubmit={addItem} className="mb-6">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Post title" className="border p-2 rounded w-full" />
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Add</button>
      </form>

      <ul className="space-y-3">
        {items.length === 0 && <li className="text-sm text-gray-500">No scheduled posts yet.</li>}
        {items.map((it, idx) => (
          <li key={idx} className="bg-white p-3 rounded shadow-sm flex justify-between">
            <div>
              <div className="font-medium">{it.title}</div>
              <div className="text-xs text-gray-500">{it.scheduledAt}</div>
            </div>
            <div className="text-sm text-gray-600">{it.status || 'scheduled'}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
