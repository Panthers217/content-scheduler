import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Scheduler from './components/Scheduler'
import Dashboard from './components/Dashboard'
import Team from './components/Team'
import Calendar from './components/Calendar'
import Analytics from './components/Analytics'
import ProjectWalkthroughVideo from './components/ProjectWalkthroughVideo'

export default function App() {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-900 via-blue-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Floating Elements for Content Scheduling Theme */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-blue-300/20 rounded-full blur-lg animate-bounce"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-slate-300/15 rounded-full blur-xl animate-pulse"></div>
      
      <NavBar />
      <ProjectWalkthroughVideo />
      {/* Main Content with Glass Container */}
      <main className=" max-w-6xl mx-auto p-6  relative z-10 ">
        <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 shadow-2xl p-6 xs:p-0 min-h-[calc(100vh-12rem)]">
          <Routes>
            <Route path="/" element={<Scheduler />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
