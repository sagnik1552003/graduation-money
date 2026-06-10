import styles from './ScholarshipCard.module.css'

export default function ScholarshipCard({ scholarship }) {
  const { name, organization, amount, deadline, requirements, description, url } = scholarship

  const handleApplyClick = (e) => {
    e.stopPropagation()
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const isUrgent = new Date(deadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.amount}>{amount}</div>
        {isUrgent && <span className={styles.urgent}>⚡ Urgent</span>}
      </div>
      
      <div className={styles.name}>{name}</div>
      <div className={styles.organization}>{organization}</div>
      
      <div className={styles.description}>{description}</div>
      
      <div className={styles.requirements}>
        <strong>Requirements:</strong> {requirements}
      </div>
      
      <div className={styles.footer}>
        <div className={styles.deadline}>
          <span className={styles.deadlineLabel}>Deadline:</span>
          <span className={styles.deadlineDate}>{new Date(deadline).toLocaleDateString()}</span>
        </div>
        {url && (
          <button className={styles.applyBtn} onClick={handleApplyClick}>
            Apply →
          </button>
        )}
      </div>
    </div>
  )
}