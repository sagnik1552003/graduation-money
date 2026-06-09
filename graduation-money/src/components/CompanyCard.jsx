import styles from './CompanyCard.module.css'

export default function CompanyCard({ company, selected, status, letter, onToggle, onPreview }) {
  const hasLetter = letter?.body && !letter?.loading
  const isLoading = letter?.loading
  const isReady = hasLetter && status !== 'contacted'

  function handleClick() {
    if (selected) {
      onToggle()
      return
    }
    if (isReady) {
      onPreview()
      return
    }
    onToggle()
  }

  const title = selected
    ? 'Click to deselect'
    : isReady
      ? 'Click to preview & send'
      : 'Click to select'

  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ''} ${isReady ? styles.ready : ''} ${status === 'received' ? styles.received : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === ' ' && handleClick()}
      title={title}
    >
      <div className={styles.top}>
        <span className={styles.emoji}>{company.emoji}</span>
        <div className={styles.topRight}>
          {isLoading && <span className={styles.writing}>writing<span className={styles.dots} /></span>}
          {isReady && <span className={styles.readyDot}>● ready</span>}
          {!isLoading && !hasLetter && <div className={`${styles.check} ${selected ? styles.checkVisible : ''}`}>✓</div>}
        </div>
      </div>
      <div className={styles.name}>{company.name}</div>
      <div className={styles.what}>{company.what}</div>
      <div className={styles.footer}>
        <span className={`${styles.conf} ${company.confidence === 'high' ? styles.confHigh : styles.confMed}`}>
          {company.confidence === 'high' ? 'confirmed' : 'likely'}
        </span>
        <span className={styles.value}>{company.value}</span>
      </div>
      {status !== 'idle' && (
        <div className={`${styles.statusTag} ${styles['tag_' + status]}`}>
          {status === 'contacted' ? 'contacted' : status === 'mailed' ? 'mailed' : status === 'waiting' ? 'awaiting' : '✓ received'}
        </div>
      )}
    </div>
  )
}
