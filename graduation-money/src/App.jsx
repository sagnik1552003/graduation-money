import { useState } from 'react'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import './App.css'

const PROFILE_KEY = 'gm_profile'

// safe default profile (IMPORTANT)
const DEFAULT_PROFILE = {
  name: '',
  photo: null,
  photoCaption: ''
}

export default function App() {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(PROFILE_KEY))
      return saved ? { ...DEFAULT_PROFILE, ...saved } : null
    } catch {
      return null
    }
  })

  function handleStart(profileData) {
    // keep photo ONLY in memory (don’t store in localStorage)
    const safeProfile = {
      ...DEFAULT_PROFILE,
      ...profileData
    }

    const toSave = {
      ...safeProfile,
      photo: null // avoid large storage crash
    }

    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(toSave))
    } catch (err) {
      console.warn('localStorage save failed:', err)
    }

    setProfile(safeProfile)
  }

  function handleBack() {
    localStorage.removeItem(PROFILE_KEY)
    setProfile(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {!profile ? (
        <Landing onStart={handleStart} />
      ) : (
        <Dashboard
          profile={profile}
          onBack={handleBack}
        />
      )}
    </div>
  )
}