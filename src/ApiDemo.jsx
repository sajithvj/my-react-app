import { useEffect, useState } from 'react'
import './ApiDemo.css'

// Swap this out for your own REST API base URL
const API_BASE = 'http://localhost:8080'

function ApiDemo() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [username, setUsername] = useState('user2');
  const [password, setPassword] = useState('user2pass');
  const token = btoa(`${username}:${password}`);

  // GET request on mount
  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    setLoading(true)
    setError(null)
    setStartDate('')
    setEndDate('')
    try {
      const res = await fetch(`${API_BASE}/v1/calculateRewards`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' , 'Authorization': `Basic ${token}` },
          //   body: JSON.stringify({ title, body: 'Created from demo app', userId: 1 }),
        })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setPosts(data)
    } catch (err) {
      setError(err.message)

    } finally {
      setLoading(false)
    }
  }

  // POST request
  async function handleSubmit(e) {
    e.preventDefault()
    if (!startDate) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/v1/calculateRewards?startDate=${startDate}&endDate=${endDate}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${token}` },
//         body: JSON.stringify({ title, body: 'Created from demo app', userId: 1 }),
      })
      if (!res.ok){
        const errorData = await res.json();
        throw new Error(`Request failed: ${res.status} : ${errorData.details}`)
        }
      const created = await res.json()
      // API is fake, so prepend the "created" item locally to show it worked
//       setPosts((prev) => [created, ...prev])
      setPosts(created);

//       setTitle('')
    } catch (err) {
      setError(err.details || err.message)
      setPosts([])
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="api-demo">
      <h2>REST API Demo</h2>
      <p className="api-demo-sub">
        Fetching from <code>{API_BASE}</code>
      </p>

      <form onSubmit={handleSubmit} className="api-demo-form">
        <input
          type="date"
          placeholder="Start Date..."
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
                  type="date"
                  placeholder="End Date..."
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Fetching...' : 'CALCULATE REWARDS'}
        </button>
      </form>

      {error && <p className="api-demo-error">Error: {error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
       <ul className="api-demo-list" style={{ listStyleType: 'none', padding: 0 }}>
         {posts.map((post) => (
           <li key={post.customerId} style={{ marginBottom: '24px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
             {/* Original Customer Summary Row */}
             <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', fontWeight: 'bold', fontSize: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
               <span><strong>#{post.customerId}</strong> {post.customerName}</span>
               <span style={{ color: '#4f46e5' }}>Total Rewards: {post.totalPoints} pts</span>
             </div>

             {/* Nested Loop: Monthly Breakdown */}
             <ul className="monthly-breakdown-list" style={{ listStyleType: 'none', paddingLeft: '12px', marginTop: '12px' }}>
               {post.monthlyRewards.map((monthly, mIdx) => (
                 <li key={mIdx} style={{ marginBottom: '12px', background: '#f8fafc', padding: '10px', borderRadius: '6px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600', color: '#334155' }}>
                     <span>📅 {monthly.month} {monthly.year}</span>
                     <span style={{ color: '#16a34a' }}>+{monthly.points} Points</span>
                   </div>

                   {/* Nested Loop: Transactions for this specific month */}
                   <ul className="transaction-list" style={{ listStyleType: 'none', paddingLeft: '8px', marginTop: '8px', fontSize: '13px', color: '#64748b' }}>
                     {monthly.transactionIds.map((tx) => (
                       <li key={tx.transactionId} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderTop: '1px dashed #e2e8f0' }}>
                         <span>ID: <code style={{ fontFamily: 'monospace' }}>{tx.transactionId}</code></span>
                         <strong>${tx.amount.toFixed(2)}</strong>
                       </li>
                     ))}
                   </ul>
                 </li>
               ))}
             </ul>
           </li>
         ))}
       </ul>

      )}

      <button className="api-demo-refresh" onClick={fetchPosts} disabled={loading}>
        Refresh (GET /posts)
      </button>
    </div>
  )
}

export default ApiDemo
