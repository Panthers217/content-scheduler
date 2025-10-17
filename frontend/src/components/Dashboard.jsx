import React from 'react'

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Clicks<br /><span className="text-2xl font-bold">0</span></div>
        <div className="bg-white p-4 rounded shadow">Scheduled<br /><span className="text-2xl font-bold">0</span></div>
        <div className="bg-white p-4 rounded shadow">Team Members<br /><span className="text-2xl font-bold">0</span></div>
      </div>

      <section className="mt-6">
        <h3 className="font-medium mb-2">Recent Activity</h3>
        <div className="bg-white p-4 rounded shadow">No activity yet.</div>
      </section>
    </div>
  )
}
