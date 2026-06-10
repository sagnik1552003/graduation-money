import { useState } from 'react'
import styles from './ScholarshipSearch.module.css'

export default function ScholarshipSearch({ onSearch, profile }) {
  const [gradYear, setGradYear] = useState(profile?.year || '')
  const [subject, setSubject] = useState(profile?.degree || '')
  const [state, setState] = useState('')
  const [gpa, setGpa] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ gradYear, subject, state, gpa })
  }

  const handleClear = () => {
    setGradYear('')
    setSubject('')
    setState('')
    setGpa('')
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i)

  const popularSubjects = [
    'STEM',
    'Business',
    'Arts',
    'Healthcare',
    'Education',
    'Engineering',
    'Computer Science',
    'Liberal Arts',
    'General'
  ]

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="gradYear">Graduation Year</label>
            <select
              id="gradYear"
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              className={styles.select}
            >
              <option value="">Select year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject">Field of Study</label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={styles.select}
            >
              <option value="">Select subject</option>
              {popularSubjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="state">State (optional)</label>
            <input
              id="state"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="e.g., CA"
              className={styles.input}
              maxLength={2}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="gpa">GPA (optional)</label>
            <input
              id="gpa"
              type="text"
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              placeholder="e.g., 3.5"
              className={styles.input}
              pattern="[0-4]\.[0-9]"
            />
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.searchBtn}>
            Search Scholarships
          </button>
          <button type="button" onClick={handleClear} className={styles.clearBtn}>
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}