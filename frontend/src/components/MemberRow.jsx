import React from 'react'

export default function MemberRow({ member, onDelete }) {
  return (
    <div className="bg-white p-3 rounded shadow flex justify-between items-center">
      <div>
        <div className="font-medium">{member.name} {member.email ? `· ${member.email}` : ''}</div>
        <div className="text-xs text-gray-500">{member.role}</div>
      </div>
      <div className="space-x-2">
        <button onClick={onDelete} className="text-red-600 text-sm">Delete</button>
      </div>
    </div>
  )
}
