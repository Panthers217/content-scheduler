import React from 'react'

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
        <svg className="w-6 h-6 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Analytics Dashboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600/20 to-slate-600/20 backdrop-blur-sm border border-white/20 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm font-medium">Total Clicks</p>
              <p className="text-3xl font-bold text-white">1,247</p>
              <p className="text-green-400 text-sm mt-1">↗ +12% from last week</p>
            </div>
            <div className="w-12 h-12 bg-blue-600/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-600/20 to-gray-600/20 backdrop-blur-sm border border-white/20 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm font-medium">Scheduled Posts</p>
              <p className="text-3xl font-bold text-white">24</p>
              <p className="text-purple-400 text-sm mt-1">8 this week</p>
            </div>
            <div className="w-12 h-12 bg-slate-600/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-sm border border-white/20 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm font-medium">Team Members</p>
              <p className="text-3xl font-bold text-white">8</p>
              <p className="text-green-400 text-sm mt-1">2 active now</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 pb-4 border-b border-white/10">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-slate-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">New post scheduled</p>
                <p className="text-white/60 text-sm">Marketing Campaign Q4 - scheduled for Dec 15</p>
              </div>
              <p className="text-white/40 text-xs">2 hours ago</p>
            </div>

            <div className="flex items-center space-x-4 pb-4 border-b border-white/10">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">Post published successfully</p>
                <p className="text-white/60 text-sm">Holiday Sale Announcement - 156 clicks so far</p>
              </div>
              <p className="text-white/40 text-xs">1 day ago</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">New team member added</p>
                <p className="text-white/60 text-sm">Sarah Johnson joined as Content Editor</p>
              </div>
              <p className="text-white/40 text-xs">3 days ago</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
