import { useState } from 'react'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import './App.css'

const PROFILE_KEY = 'gm_profile'
const PROFILE_DRAFT_KEY = 'gm_profile_draft'
const HAS_VISITED_DASHBOARD_KEY = 'gm_has_visited_dashboard'

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
      localStorage.setItem(PROFILE_DRAFT_KEY, JSON.stringify({
        ...safeProfile,
        photo: null,
        photoName: profileData.photoName || ''
      }))
      localStorage.setItem(HAS_VISITED_DASHBOARD_KEY, 'true')
    } catch (err) {
      console.warn('localStorage save failed:', err)
    }

    setProfile(safeProfile)
  }

  function handleResume() {
    try {
      const saved = JSON.parse(localStorage.getItem(PROFILE_DRAFT_KEY) || '{}')
      if (!saved || !saved.name) return
      const safeProfile = {
        ...DEFAULT_PROFILE,
        ...saved,
        photo: null,
      }
      localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...safeProfile, photo: null }))
      localStorage.setItem(HAS_VISITED_DASHBOARD_KEY, 'true')
      setProfile(safeProfile)
    } catch (err) {
      console.warn('resume failed:', err)
    }
  }

  function handleBack() {
    localStorage.removeItem(PROFILE_KEY)
    setProfile(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {!profile ? (
        <Landing onStart={handleStart} onResume={handleResume} />
      ) : (
        <Dashboard
          profile={profile}
          onBack={handleBack}
        />
      )}
    </div>
  )
}