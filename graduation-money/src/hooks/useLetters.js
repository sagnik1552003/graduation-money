import { useState, useEffect } from 'react'

const KEY = 'gm_letters'

export function useLetters() {
  const [letters, setLettersState] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} }
  })

  function setLetters(updater) {
    setLettersState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      // Only persist completed letters (not loading states)
      const toSave = {}
      Object.entries(next).forEach(([id, val]) => {
        if (val.body && !val.loading) toSave[id] = val
      })
      try { localStorage.setItem(KEY, JSON.stringify(toSave)) } catch {}
      return next
    })
  }

  function clearLetters() {
    localStorage.removeItem(KEY)
    setLettersState({})
  }

  return { letters, setLetters, clearLetters }
}
