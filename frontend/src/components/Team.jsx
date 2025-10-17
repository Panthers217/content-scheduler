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
    axios.get('/api/members').then(r => setMembers(r.data || [])).catch(() => setMembers([]))
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
    axios.post('/api/members', payload).then(() => {
      setName('')
      setEmail('')
      setRole('viewer')
      setEmailError('')
      fetchMembers()
    }).catch(() => {})
  }

  function deleteMember(id) {
    axios.delete(`/api/members/${id}`).then(() => fetchMembers()).catch(() => {})
  }

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Team Members</h2>

      <form onSubmit={addMember} className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-2">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border p-2 rounded" required />
        <input value={email} onChange={e => { setEmail(e.target.value); setEmailError(validateEmail(e.target.value)) }} placeholder="Email" className="border p-2 rounded" required />
        {emailError && <div className="text-sm text-red-600">{emailError}</div>}
        <select value={role} onChange={e => setRole(e.target.value)} className="border p-2 rounded">
          <option value="admin">admin</option>
          <option value="editor">editor</option>
          <option value="viewer">viewer</option>
        </select>
        <button disabled={!name || (!!email && !!emailError)} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50">Add Member</button>
      </form>

      <div className="space-y-2">
        {members.length === 0 && <div className="text-sm text-gray-500">No members yet.</div>}
        {members.map(m => (
          <MemberRow key={m._id} member={m} onDelete={() => deleteMember(m._id)} />
        ))}
      </div>
    </div>
  )
}
