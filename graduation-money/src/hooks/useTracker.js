import { useState, useEffect } from 'react'

const KEY = 'gm_tracker_v2'
const normalizeStatus = (status) => status === 'emailed' ? 'contacted' : status

export function useTracker() {
  const [tracker, setTracker] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '{}')
      return Object.fromEntries(
        Object.entries(raw).map(([id, entry]) => [id, { ...entry, status: normalizeStatus(entry.status) }])
      )
    } catch {
      return {}
    }
  })

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(tracker)) } catch {}
  }, [tracker])

  const setStatus = (id, status) =>
    setTracker(prev => ({ ...prev, [id]: { ...prev[id], status: normalizeStatus(status), updatedAt: Date.now() } }))

  const getStatus = (id) => normalizeStatus(tracker[id]?.status) || 'idle'

  const getSentCount = () => Object.values(tracker).filter(v => ['contacted','mailed','received'].includes(normalizeStatus(v.status))).length
  const getReceivedCount = () => Object.values(tracker).filter(v => normalizeStatus(v.status) === 'received').length

  return { tracker, setStatus, getStatus, getSentCount, getReceivedCount }
}
