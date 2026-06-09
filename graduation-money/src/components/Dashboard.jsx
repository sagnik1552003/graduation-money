import { useState, useMemo } from 'react'
import { COMPANIES, CATEGORIES } from '../data/companies'
import { useTracker } from '../hooks/useTracker'
import { useLetters } from '../hooks/useLetters'
import { generateLetter } from '../utils/generateLetter'
import CompanyCard from './CompanyCard'
import EmailPreview from './EmailPreview'
import styles from './Dashboard.module.css'

const SELECTED_KEY = 'gm_selected'

export default function Dashboard({ profile, onBack }) {
  const safeProfile = profile && typeof profile === 'object'
    ? profile
    : { name: '', degree: '', year: '', story: '', mailingAddress: '', photo: null, photoCaption: '', photoAttached: false }
  const [selected, setSelected] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(SELECTED_KEY) || '[]')) } catch { return new Set() }
  })
  const [activeCategory, setActiveCategory] = useState('All')
  const { letters, setLetters, clearLetters } = useLetters()
  const [generating, setGenerating] = useState(false)
  const [previewId, setPreviewId] = useState(null)
  const [view, setView] = useState('pick')
  const { setStatus, getStatus, getSentCount, getReceivedCount } = useTracker()

  function handleBack() {
    clearLetters()
    localStorage.removeItem(SELECTED_KEY)
    onBack()
  }

  const filtered = useMemo(() =>
    activeCategory === 'All' ? COMPANIES : COMPANIES.filter(c => c.category === activeCategory),
    [activeCategory]
  )

  function toggleSelect(id) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      try { localStorage.setItem(SELECTED_KEY, JSON.stringify([...next])) } catch {}
      return next
    })
  }

  async function generateAll() {
    if (selected.size === 0) return
    setGenerating(true)
    const companies = COMPANIES.filter(c => selected.has(c.id) && (!letters[c.id]?.body || getStatus(c.id) === 'contacted'))
    if (companies.length === 0) {
      setGenerating(false)
      return
    }

    const init = {}
    companies.forEach(c => { init[c.id] = { subject: '', body: '', loading: true, error: null } })
    setLetters(prev => ({ ...prev, ...init }))

    await Promise.all(companies.map(async (company) => {
      if (getStatus(company.id) === 'contacted') {
        setStatus(company.id, 'idle')
      }
      try {
        const result = await generateLetter({ company, profile: safeProfile })
        setLetters(prev => ({ ...prev, [company.id]: { ...result, loading: false, error: null } }))
      } catch {
        setLetters(prev => ({ ...prev, [company.id]: { subject: '', body: '', loading: false, error: 'Failed to generate.' } }))
      }
    }))
    setGenerating(false)
  }

  async function regenLetter(companyId) {
    const company = COMPANIES.find(c => c.id === companyId)
    if (getStatus(companyId) === 'contacted') {
      setStatus(companyId, 'idle')
    }
    setLetters(prev => ({ ...prev, [companyId]: { ...prev[companyId], loading: true, error: null } }))
    try {
      const result = await generateLetter({ company, profile: safeProfile })
      setLetters(prev => ({ ...prev, [companyId]: { ...result, loading: false, error: null } }))
    } catch {
      setLetters(prev => ({ ...prev, [companyId]: { ...prev[companyId], loading: false, error: 'Failed.' } }))
    }
  }

  const selectedCompanies = COMPANIES.filter(c => selected.has(c.id))
  const generatedCount = selectedCompanies.filter(c => letters[c.id]?.body && !letters[c.id]?.loading && getStatus(c.id) !== 'contacted').length
  const allGenerated = selected.size > 0 && generatedCount === selected.size
  const estimatedValue = selectedCompanies.reduce((acc, c) => acc + (parseInt(c.value.replace(/[^0-9]/g, '')) || 0), 0)
  const trackedCompanies = COMPANIES.filter(c => getStatus(c.id) !== 'idle')
  const sentCompanies = COMPANIES.filter(c => ['contacted','mailed','received'].includes(getStatus(c.id)) && letters[c.id]?.body && !letters[c.id]?.loading)

  return (
    <div className={styles.wrap}>
      <nav className={styles.nav}>
        <button className={styles.backBtn} onClick={handleBack}>← back</button>
        <div className={styles.navTitle}>graduation.money</div>
        <div className={styles.navRight}>
          <button className={`${styles.tabBtn} ${view === 'pick' ? styles.tabActive : ''}`} onClick={() => setView('pick')}>Brands</button>
          <button className={`${styles.tabBtn} ${view === 'sent' ? styles.tabActive : ''}`} onClick={() => setView('sent')}>
            Sent {sentCompanies.length > 0 && <span className={styles.tabBadge}>{sentCompanies.length}</span>}
          </button>
          <button className={`${styles.tabBtn} ${view === 'tracker' ? styles.tabActive : ''}`} onClick={() => setView('tracker')}>
            Tracker {trackedCompanies.length > 0 && <span className={styles.tabBadge}>{trackedCompanies.length}</span>}
          </button>
        </div>
      </nav>

      {view === 'pick' && (
        <div className={styles.main}>
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>Pick your brands</h2>
              <p className={styles.subtitle}>Select brands, generate personalized messages, then send via contact form or physical mail.</p>
            </div>
            {selected.size > 0 && (
              <div className={styles.summaryBox}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Selected</span>
                  <span className={styles.summaryVal}>{selected.size}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Est. value</span>
                  <span className={styles.summaryVal}>${estimatedValue}+</span>
                </div>
                {allGenerated
                  ? <p className={styles.generatedHint}>Click any card to preview & send ↓</p>
                  : <button className={styles.generateBtn} onClick={generateAll} disabled={generating}>
                      {generating ? 'Writing messages…' : `Generate ${selected.size} message${selected.size > 1 ? 's' : ''} →`}
                    </button>
                }
              </div>
            )}
          </div>

          <div className={styles.categories}>
            {CATEGORIES.map(cat => (
              <button key={cat} className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
            ))}
          </div>

          <div className={styles.grid}>
            {filtered.map(company => (
              <CompanyCard
                key={company.id}
                company={company}
                selected={selected.has(company.id)}
                status={getStatus(company.id)}
                letter={letters[company.id]}
                onToggle={() => toggleSelect(company.id)}
                onPreview={() => letters[company.id]?.body && setPreviewId(company.id)}
              />
            ))}
          </div>

          {selected.size > 0 && (
            <div className={styles.stickyBar}>
              <span>{selected.size} selected · est. ${estimatedValue}+</span>
              {allGenerated
                ? <span className={styles.stickyReady}>✓ messages ready — click a card to preview</span>
                : <button className={styles.generateBtn} onClick={generateAll} disabled={generating}>
                    {generating ? 'Writing…' : 'Generate messages →'}
                  </button>
              }
            </div>
          )}
        </div>
      )}

      {view === 'sent' && (
        <div className={styles.main}>
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>Sent letters</h2>
              <p className={styles.subtitle}>Saved messages for brands you reached out to. Open a company to review the letter you sent.</p>
            </div>
            <div className={styles.trackerStats}>
              <div className={styles.tStat}><span className={styles.tStatN}>{sentCompanies.length}</span><span className={styles.tStatL}>saved letters</span></div>
              <div className={styles.tStat}><span className={styles.tStatN}>{getReceivedCount()}</span><span className={styles.tStatL}>received</span></div>
            </div>
          </div>

          {sentCompanies.length === 0 ? (
            <div className={styles.emptyTracker}>
              <p>No letters saved yet. Open a contact form to save a sent message here.</p>
              <button className={styles.goPickBtn} onClick={() => setView('pick')}>Pick brands →</button>
            </div>
          ) : (
            <div className={styles.sentList}>
              {sentCompanies.map(company => (
                <div key={company.id} className={styles.sentCard}>
                  <div className={styles.sentHeader}>
                    <div className={styles.sentTitle}>
                      <span className={styles.trackerEmoji}>{company.emoji}</span>
                      <div>
                        <div className={styles.trackerName}>{company.name}</div>
                        <div className={styles.trackerMeta}>{company.what}</div>
                      </div>
                    </div>
                    <StatusBadge status={getStatus(company.id)} />
                  </div>
                  <pre className={styles.sentBody}>{letters[company.id]?.body?.slice(0, 260)}{letters[company.id]?.body?.length > 260 ? '...' : ''}</pre>
                  <div className={styles.sentActions}>
                    <button className={styles.generateBtn} onClick={() => setPreviewId(company.id)}>View letter</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {view === 'tracker' && (
        <div className={styles.main}>
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>Your tracker</h2>
              <p className={styles.subtitle}>Track every brand you've reached out to.</p>
            </div>
            <div className={styles.trackerStats}>
              <div className={styles.tStat}><span className={styles.tStatN}>{getSentCount()}</span><span className={styles.tStatL}>contacted</span></div>
              <div className={styles.tStat}><span className={styles.tStatN}>{getReceivedCount()}</span><span className={styles.tStatL}>received</span></div>
            </div>
          </div>

          {trackedCompanies.length === 0 ? (
            <div className={styles.emptyTracker}>
              <p>No brands contacted yet.</p>
              <button className={styles.goPickBtn} onClick={() => setView('pick')}>Pick brands →</button>
            </div>
          ) : (
            <div className={styles.trackerList}>
              {COMPANIES.map(company => {
                const status = getStatus(company.id)
                return (
                  <div key={company.id} className={`${styles.trackerRow} ${status === 'idle' ? styles.trackerIdle : ''}`}>
                    <div className={styles.trackerLeft}>
                      <span className={styles.trackerEmoji}>{company.emoji}</span>
                      <div>
                        <div className={styles.trackerName}>{company.name}</div>
                        <div className={styles.trackerMeta}>{company.address.split('\n')[0]} · {company.value}</div>
                      </div>
                    </div>
                    <div className={styles.trackerRight}>
                      <StatusBadge status={status} />
                      <select className={styles.statusSelect} value={status} onChange={e => setStatus(company.id, e.target.value)}>
                        <option value="idle">Not sent</option>
                        <option value="contacted">Contacted online</option>
                        <option value="mailed">Mailed letter</option>
                        <option value="waiting">Awaiting response</option>
                        <option value="received">Received ✓</option>
                      </select>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {previewId && (
        <EmailPreview
          company={COMPANIES.find(c => c.id === previewId)}
          letter={letters[previewId]}
          profile={safeProfile}
          onClose={() => setPreviewId(null)}
          onRegen={() => regenLetter(previewId)}
          onMarkSent={() => { setStatus(previewId, 'contacted'); setPreviewId(null) }}
        />
      )}
    </div>
  )
}

function StatusBadge({ status }) {
  const map = {
    idle: { label: 'Not sent', cls: 'idle' },
    contacted: { label: 'Contacted', cls: 'contacted' },
    mailed: { label: 'Mailed', cls: 'mailed' },
    waiting: { label: 'Awaiting', cls: 'waiting' },
    received: { label: 'Received ✓', cls: 'received' },
  }
  const { label, cls } = map[status] || map.idle
  return <span className={`${styles.badge} ${styles['badge_' + cls]}`}>{label}</span>
}
