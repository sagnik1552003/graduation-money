import { useState, useCallback } from 'react'
import { fetchScholarships } from '../services/scholarshipService'

export function useScholarships() {
  const [scholarships, setScholarships] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useState({
    gradYear: '',
    subject: '',
    state: '',
    gpa: ''
  })

  const searchScholarships = useCallback(async (params) => {
    setLoading(true)
    setError(null)
    setSearchParams(params)

    try {
      const results = await fetchScholarships(params)
      setScholarships(results)
    } catch (err) {
      setError(err.message || 'Failed to fetch scholarships')
      setScholarships([])
    } finally {
      setLoading(false)
    }
  }, [])

  const clearScholarships = useCallback(() => {
    setScholarships([])
    setError(null)
    setSearchParams({
      gradYear: '',
      subject: '',
      state: '',
      gpa: ''
    })
  }, [])

  return {
    scholarships,
    loading,
    error,
    searchParams,
    searchScholarships,
    clearScholarships
  }
}