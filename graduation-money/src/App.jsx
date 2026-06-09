import { useState, useEffect } from 'react'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import './App.css'

const PROFILE_KEY = 'gm_profile'

export default function App() {
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null') } catch { return null }
  })

  function handleStart(profileData) {
    // Don't persist the photo (can be large) — just flag that one was attached
    const toSave = { ...profileData, photo: null }
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(toSave)) } catch {}
    setProfile(profileData) // keep photo in memory for this session
  }

  function handleBack() {
    localStorage.removeItem(PROFILE_KEY)
    setProfile(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {!profile
        ? <Landing onStart={handleStart} />
        : <Dashboard profile={profile} onBack={handleBack} />
      }
    </div>
  )
}
