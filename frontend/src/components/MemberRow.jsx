import React from 'react'

export default function MemberRow({ member, onDelete }) {
  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'from-blue-500 to-slate-600'
      case 'editor': return 'from-slate-500 to-gray-600'
      case 'viewer': return 'from-blue-400 to-blue-600'
      default: return 'from-blue-400 to-blue-600'
    }
  }

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
      case 'editor': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
      case 'viewer': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
      default: return null
    }
  }

  return (
    <div className={`bg-white/10 backdrop-blur-sm border rounded-xl hover:bg-white/15 transition-all duration-200 group p-4 ${
      member.isDemoData ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/20'
    }`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 xs:inline-block">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-slate-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {member.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="font-medium text-white text-lg">{member.name}</div>
              {member.isDemoData && (
                <span className="px-2 py-1 text-xs bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                  Demo Data
                </span>
              )}
            </div>
            {member.email && (
              <div className="text-sm text-white/60">{member.email}</div>
            )}
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getRoleColor(member.role)} text-white`}>
                {getRoleIcon(member.role)}
                <span className="capitalize">{member.role}</span>
              </span>
            </div>
            {member.isDemoData && (
              <div className="mt-2 text-xs text-amber-300/80 italic">
                💡 This is sample team member data for demonstration purposes.
              </div>
            )}
          </div>
        </div>
        {!member.isDemoData && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              onClick={onDelete} 
              className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
