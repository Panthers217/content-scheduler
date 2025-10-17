import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MemberRow from './MemberRow'

export default function Team() {
  const [members, setMembers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('viewer')

  useEffect(() => {
    fetchMembers()
  }, [])

  function fetchMembers() {
    axios.get('/api/members').then(r => setMembers(r.data || [])).catch(() => setMembers([]))
  }

  function addMember(e) {
    e.preventDefault()
    const payload = { name, email, role }
    axios.post('/api/members', payload).then(() => {
      setName('')
      setEmail('')
      setRole('viewer')
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
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border p-2 rounded" />
        <select value={role} onChange={e => setRole(e.target.value)} className="border p-2 rounded">
          <option value="admin">admin</option>
          <option value="editor">editor</option>
          <option value="viewer">viewer</option>
        </select>
        <button className="px-4 py-2 bg-green-600 text-white rounded">Add Member</button>
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
