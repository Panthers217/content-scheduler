import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Scheduler from './components/Scheduler'
import Dashboard from './components/Dashboard'
import Team from './components/Team'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Content Scheduler</h1>
          <nav className="space-x-4">
            <Link to="/" className="text-sm text-blue-600">Scheduler</Link>
            <Link to="/dashboard" className="text-sm text-blue-600">Dashboard</Link>
            <Link to="/team" className="text-sm text-blue-600">Team</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Scheduler />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </main>
    </div>
  )
}
