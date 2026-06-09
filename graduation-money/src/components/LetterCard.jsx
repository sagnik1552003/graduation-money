import { useState } from 'react';
import styles from './LetterCard.module.css';
import { generateLetter } from '../utils/generateLetter';

const STATUSES = [
  { key: 'pending', label: 'Not sent', color: 'neutral' },
  { key: 'sent', label: 'Letter sent', color: 'blue' },
  { key: 'waiting', label: 'Awaiting reply', color: 'amber' },
  { key: 'received', label: 'Gift received!', color: 'green' },
];

export default function LetterCard({ company, profile, status, onStatusChange }) {
  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedAddr, setCopiedAddr] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [variant, setVariant] = useState(0);

  const currentStatus = STATUSES.find(s => s.key === status) || STATUSES[0];

  const generate = async (v = variant) => {
    setLoading(true);
    setExpanded(true);
    try {
      const text = await generateLetter({ company, profile, variant: v });
      setLetter(text);
      setGenerated(true);
    } catch (e) {
      setLetter('Error generating letter. Please try again.');
    }
    setLoading(false);
  };

  const rewrite = () => {
    const next = variant + 1;
    setVariant(next);
    generate(next);
  };

  const copy = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyAddr = () => {
    navigator.clipboard.writeText(company.address);
    setCopiedAddr(true);
    setTimeout(() => setCopiedAddr(false), 2000);
  };

  return (
    <div className={`${styles.card} ${styles[`status_${currentStatus.color}`]}`}>
      <div className={styles.top} onClick={() => setExpanded(e => !e)}>
        <div className={styles.left}>
          <span className={styles.emoji}>{company.emoji}</span>
          <div>
            <div className={styles.name}>{company.name}</div>
            <div className={styles.what}>{company.what}</div>
          </div>
        </div>
        <div className={styles.right}>
          <StatusDropdown
            status={status}
            statuses={STATUSES}
            onChange={onStatusChange}
          />
          <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}>›</span>
        </div>
      </div>

      {expanded && (
        <div className={styles.body}>
          <div className={styles.addressRow}>
            <div className={styles.addressBlock}>
              <div className={styles.addressLabel}>Mailing address</div>
              <pre className={styles.address}>{company.address}</pre>
            </div>
            <button className={styles.copyAddr} onClick={copyAddr}>
              {copiedAddr ? '✓ Copied' : 'Copy address'}
            </button>
          </div>

          {!generated && !loading && (
            <button className={styles.generateBtn} onClick={() => generate()}>
              Write my letter →
            </button>
          )}

          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <span>Writing your letter…</span>
            </div>
          )}

          {generated && !loading && (
            <>
              <div className={styles.letterWrap}>
                <pre className={styles.letterText}>{letter}</pre>
              </div>
              <div className={styles.actions}>
                <button className={styles.copyBtn} onClick={copy}>
                  {copied ? '✓ Copied' : 'Copy letter'}
                </button>
                <button className={styles.rewriteBtn} onClick={rewrite}>
                  Rewrite ↺
                </button>
              </div>
            </>
          )}

          <div className={styles.tip}>
            <span className={styles.tipIcon}>💡</span>
            {company.tip}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusDropdown({ status, statuses, onChange }) {
  const [open, setOpen] = useState(false);
  const current = statuses.find(s => s.key === status) || statuses[0];

  return (
    <div className={styles.dropWrap}>
      <button
        className={`${styles.statusBtn} ${styles[`status_${current.color}_btn`]}`}
        onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
      >
        {current.label} ▾
      </button>
      {open && (
        <div className={styles.dropdown}>
          {statuses.map(s => (
            <div
              key={s.key}
              className={`${styles.dropItem} ${s.key === status ? styles.dropItemActive : ''}`}
              onClick={e => { e.stopPropagation(); onChange(s.key); setOpen(false); }}
            >
              {s.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
