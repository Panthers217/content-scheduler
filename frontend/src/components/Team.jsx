import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MemberRow from './MemberRow'

export default function Team() {
  const [members, setMembers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('viewer')
  const [emailError, setEmailError] = useState('')

  useEffect(() => {
    fetchMembers()
  }, [])

  function fetchMembers() {
    const apiUrl = import.meta.env.MODE === 'production' 
      ? `${import.meta.env.VITE_API_URL || 'https://your-backend-app.onrender.com'}/api/members`
      : '/api/members'
    
    axios.get(apiUrl).then(r => setMembers(r.data || [])).catch(() => setMembers([]))
  }

  function validateEmail(value) {
    if (!value) return ''
    // Simple email regex — good for client-side validation
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i
    return re.test(value) ? '' : 'Invalid email address'
  }

  function addMember(e) {
    e.preventDefault()
    const emailValidation = validateEmail(email)
    setEmailError(emailValidation)
    if (email && emailValidation) return
    if (!name) return

    const payload = { name, email, role }
    const apiUrl = import.meta.env.MODE === 'production' 
      ? `${import.meta.env.VITE_API_URL || 'https://your-backend-app.onrender.com'}/api/members`
      : '/api/members'
    
    axios.post(apiUrl, payload).then(() => {
      setName('')
      setEmail('')
      setRole('viewer')
      setEmailError('')
      fetchMembers()
    }).catch(() => {})
  }

  function deleteMember(id) {
    const apiUrl = import.meta.env.MODE === 'production' 
      ? `${import.meta.env.VITE_API_URL || 'https://your-backend-app.onrender.com'}/api/members/${id}`
      : `/api/members/${id}`
    
    axios.delete(apiUrl).then(() => fetchMembers()).catch(() => {})
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
        <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
        Team Members
      </h2>

      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
        <h3 className="text-white font-semibold mb-4">Add New Member</h3>
        <form onSubmit={addMember} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <input 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Full Name" 
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm" 
                required 
              />
            </div>
            <div>
              <input 
                value={email} 
                onChange={e => { setEmail(e.target.value); setEmailError(validateEmail(e.target.value)) }} 
                placeholder="Email Address" 
                type="email"
                className={`w-full p-3 rounded-lg bg-white/10 border text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:border-transparent backdrop-blur-sm ${
                  emailError ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-blue-400'
                }`}
              />
              {emailError && <div className="text-sm text-red-400 mt-1">{emailError}</div>}
            </div>
            <div>
              <select 
                value={role} 
                onChange={e => setRole(e.target.value)} 
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
              >
                <option value="viewer" className="bg-gray-800">Viewer</option>
                <option value="editor" className="bg-gray-800">Editor</option>
                <option value="admin" className="bg-gray-800">Admin</option>
              </select>
            </div>
            <div>
              <button 
                disabled={!name || (!!email && !!emailError)} 
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-slate-700 text-white rounded-lg hover:from-blue-700 hover:to-slate-800 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Member
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {members.length === 0 && (
          <div className="text-center py-12 text-white/60">
            <svg className="w-16 h-16 mx-auto mb-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            <p className="text-lg">No team members yet</p>
            <p className="text-sm mt-1">Add your first team member above</p>
          </div>
        )}
        {members.map(m => (
          <MemberRow key={m._id} member={m} onDelete={() => deleteMember(m._id)} />
        ))}
      </div>
    </div>
  )
}
