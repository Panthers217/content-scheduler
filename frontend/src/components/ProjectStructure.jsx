import React, { useState } from 'react'

export default function ProjectStructure() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center gap-2 group"
        title="View Project Structure"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" 
          />
        </svg>
        <span className="hidden group-hover:inline text-sm font-medium">Project Structure</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-slate-900 to-gray-900 rounded-2xl border border-white/20 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Project Structure</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Folder Tree */}
                <div className="bg-black/30 rounded-lg p-4 border border-white/10">
                  <pre className="text-green-400 text-sm font-mono overflow-x-auto">
{`content-scheduler/
│
├── backend/                           # Node.js/Express API Server
│   ├── models/                        # MongoDB Mongoose Models
│   │   ├── Member.js                  # Team member schema
│   │   ├── Post.js                    # Post schema with analytics
│   │   └── PostTemplate.js            # Reusable post templates
│   │
│   ├── routes/                        # API Route Handlers
│   │   ├── analytics.js               # Analytics endpoints
│   │   ├── bulkUpload.js              # CSV bulk upload
│   │   ├── members.js                 # Team member CRUD
│   │   ├── posts.js                   # Post CRUD operations
│   │   └── templates.js               # Template management
│   │
│   ├── utils/                         # Utility functions
│   ├── uploads/                       # File upload directory
│   ├── .env                           # Environment variables
│   ├── Dockerfile                     # Docker configuration
│   ├── package.json                   # Backend dependencies
│   └── server.js                      # Express app entry point
│
├── frontend/                          # React + Vite Application
│   ├── public/                        # Static assets
│   │   └── _redirects                 # Netlify redirect rules
│   │
│   ├── src/                           # Source code
│   │   ├── components/                # React Components
│   │   │   ├── Analytics.jsx          # Analytics dashboard
│   │   │   ├── Calendar.jsx           # Calendar view
│   │   │   ├── Dashboard.jsx          # Main dashboard
│   │   │   ├── NavBar.jsx             # Navigation header
│   │   │   ├── ProjectStructure.jsx   # This component!
│   │   │   ├── Scheduler.jsx          # Post scheduling form
│   │   │   └── Team.jsx               # Team management
│   │   │
│   │   ├── config/                    # Configuration files
│   │   │   └── api.js                 # API URL configuration
│   │   │
│   │   ├── App.jsx                    # Root component
│   │   ├── index.css                  # Global styles
│   │   └── main.jsx                   # React entry point
│   │
│   ├── Dockerfile                     # Docker configuration
│   ├── index.html                     # HTML entry point
│   ├── package.json                   # Frontend dependencies
│   ├── tailwind.config.cjs            # Tailwind CSS config
│   └── vite.config.js                 # Vite build config
│
├── DEPLOYMENT.md                      # Deployment guide
├── PROJECT_STRUCTURE.md               # This documentation
├── README.md                          # Main documentation
├── docker-compose.yml                 # Docker Compose config
└── render.yaml                        # Render.com config`}
                  </pre>
                </div>

                {/* Key Directories */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                      </svg>
                      Backend
                    </h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• RESTful API with Express</li>
                      <li>• MongoDB with Mongoose</li>
                      <li>• Demo data protection</li>
                      <li>• Analytics aggregation</li>
                      <li>• File upload handling</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Frontend
                    </h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• React with Hooks</li>
                      <li>• Tailwind CSS styling</li>
                      <li>• React Router for navigation</li>
                      <li>• Responsive design</li>
                      <li>• Vite build tool</li>
                    </ul>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
                  <h3 className="text-lg font-semibold text-white mb-3">Technology Stack</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white/10 rounded px-3 py-2 text-center">
                      <div className="text-white font-medium">React</div>
                      <div className="text-white/60 text-xs">Frontend</div>
                    </div>
                    <div className="bg-white/10 rounded px-3 py-2 text-center">
                      <div className="text-white font-medium">Node.js</div>
                      <div className="text-white/60 text-xs">Backend</div>
                    </div>
                    <div className="bg-white/10 rounded px-3 py-2 text-center">
                      <div className="text-white font-medium">MongoDB</div>
                      <div className="text-white/60 text-xs">Database</div>
                    </div>
                    <div className="bg-white/10 rounded px-3 py-2 text-center">
                      <div className="text-white font-medium">Tailwind</div>
                      <div className="text-white/60 text-xs">Styling</div>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-blue-400">~15</div>
                    <div className="text-white/60 text-sm">Backend Files</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-purple-400">~14</div>
                    <div className="text-white/60 text-sm">Components</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-green-400">7+</div>
                    <div className="text-white/60 text-sm">Documentation</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-amber-400">3,000+</div>
                    <div className="text-white/60 text-sm">Lines of Code</div>
                  </div>
                </div>

                {/* Development Workflow */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">Development Workflow</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2 text-white/80">
                      <span className="text-green-400 font-mono">1.</span>
                      <span><code className="bg-black/30 px-2 py-1 rounded text-green-400">cd backend && npm run dev</code> (port 5001)</span>
                    </div>
                    <div className="flex items-start gap-2 text-white/80">
                      <span className="text-green-400 font-mono">2.</span>
                      <span><code className="bg-black/30 px-2 py-1 rounded text-green-400">cd frontend && npm run dev</code> (port 5173)</span>
                    </div>
                    <div className="flex items-start gap-2 text-white/80">
                      <span className="text-green-400 font-mono">3.</span>
                      <span>Configure <code className="bg-black/30 px-1 rounded text-amber-400">.env</code> files in both directories</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-gradient-to-r from-slate-900 to-gray-900">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Developer Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5 flex-shrink-0">
                    <img 
                      src="https://github.com/Panthers217.png" 
                      alt="Developer Profile"
                      className="w-full h-full rounded-full object-cover bg-gray-800"
                      onError={(e) => {
                        e.target.src = 'https://ui-avatars.com/api/?name=Developer&background=6366f1&color=fff&size=128'
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">Built by Panthers217</p>
                    <p className="text-white/60 text-sm">Full-Stack Developer</p>
                  </div>
                </div>

                {/* GitHub Link */}
                <a 
                  href="https://github.com/Panthers217/content-scheduler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  View on GitHub
                </a>
              </div>
              <p className="text-white/50 text-xs text-center mt-4">
                Clean architecture following industry best practices ✨
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
