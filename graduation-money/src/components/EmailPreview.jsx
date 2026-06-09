import { useState } from 'react'
import styles from './EmailPreview.module.css'

export default function EmailPreview({ company, letter, profile, onClose, onRegen, onMarkSent }) {
  const [copied, setCopied] = useState(false)
  const [addrCopied, setAddrCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('email') // email | mail

  function copyEmail() {
    navigator.clipboard.writeText(letter.body || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function copyAddress() {
    navigator.clipboard.writeText(company.address)
    setAddrCopied(true)
    setTimeout(() => setAddrCopied(false), 2000)
  }

  function downloadPhoto() {
    if (!profile?.photo) return
    const link = document.createElement('a')
    link.href = profile.photo
    link.download = `${(profile.photoCaption || 'graduation-photo').replace(/\s+/g, '-').toLowerCase()}.png`
    link.click()
  }

  function openContactForm() {
    window.open(company.contactForm, '_blank')
    onMarkSent()
  }

  function handlePrint() {
    const win = window.open('', '_blank')
    win.document.write(`<html><head><title>Letter to ${company.name}</title>
      <style>
        body { font-family: Georgia, serif; font-size: 14px; line-height: 1.85; max-width: 580px; margin: 60px auto; color: #111; }
        .address-block { margin-bottom: 32px; font-size: 13px; line-height: 1.6; color: #333; }
        .letter-body { white-space: pre-wrap; }
        @media print { body { margin: 40px; } }
      </style></head>
      <body>
        <div class="address-block">${company.address.replace(/\n/g, '<br/>')}</div>
        <div class="letter-body">${letter.body}</div>
      </body></html>`)
    win.document.close()
    win.print()
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerEmoji}>{company.emoji}</span>
            <div>
              <div className={styles.headerName}>{company.name}</div>
              <div className={styles.headerSub}>AI-written · personalized for {profile.name}</div>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${activeTab === 'email' ? styles.tabActive : ''}`} onClick={() => setActiveTab('email')}>
            📧 Send via contact form
          </button>
          <button className={`${styles.tab} ${activeTab === 'mail' ? styles.tabActive : ''}`} onClick={() => setActiveTab('mail')}>
            ✉️ Send physical letter
          </button>
        </div>

        {/* Email tab */}
        {activeTab === 'email' && (
          <>
            <div className={styles.infoBar}>
              <span className={styles.infoIcon}>💡</span>
              <span>Most brands route fan mail through their website. Copy the message below, then paste it into their contact form.</span>
            </div>
            <div className={styles.body}>
              {letter.loading
                ? <div className={styles.loading}>Writing your message<span className={styles.dots} /></div>
                : <>
                    <pre className={styles.bodyText}>{letter.body}</pre>
                    {profile?.photo && (
                      <div className={styles.photoSection}>
                        <div className={styles.polaroidFrame}>
                          <img src={profile.photo} alt="Graduation photo" className={`${styles.photoImage} ${styles.polaroidImage}`} />
                          <p className={styles.photoCaption}>{profile.photoCaption?.trim() || 'Graduation photo attached'}</p>
                        </div>
                        <button className={styles.downloadBtn} onClick={downloadPhoto}>Download photo</button>
                      </div>
                    )}
                  </>
              }
            </div>
            <div className={styles.footer}>
              <button className={styles.ghostBtn} onClick={onRegen} disabled={letter.loading}>↺ rewrite</button>
              <div className={styles.footerRight}>
                <button className={styles.copyBtn} onClick={copyEmail} disabled={letter.loading || !letter.body}>
                  {copied ? '✓ copied' : 'copy message'}
                </button>
                <button className={styles.primaryBtn} onClick={openContactForm}>
                  Open contact form ↗
                </button>
              </div>
            </div>
          </>
        )}

        {/* Physical mail tab */}
        {activeTab === 'mail' && (
          <>
            <div className={styles.infoBar}>
              <span className={styles.infoIcon}>📬</span>
              <span>Physical mail has the highest response rate. Print the letter, sign it, and include your graduation announcement + photo.</span>
            </div>

            <div className={styles.body}>
              <div className={styles.addressBlock}>
                <div className={styles.addressLabel}>Mail to</div>
                <pre className={styles.addressText}>{company.address}</pre>
                <button className={styles.addrCopyBtn} onClick={copyAddress}>
                  {addrCopied ? '✓ copied' : 'copy address'}
                </button>
              </div>
              <div className={styles.divider} />
              {letter.loading
                ? <div className={styles.loading}>Writing your letter<span className={styles.dots} /></div>
                : <>
                    <pre className={styles.bodyText}>{letter.body}</pre>
                    {profile?.photo && (
                      <div className={styles.photoSection}>
                        <div className={styles.polaroidFrame}>
                          <img src={profile.photo} alt="Graduation photo" className={`${styles.photoImage} ${styles.polaroidImage}`} />
                          <p className={styles.photoCaption}>{profile.photoCaption?.trim() || 'Graduation photo attached'}</p>
                        </div>
                        <button className={styles.downloadBtn} onClick={downloadPhoto}>Download photo</button>
                      </div>
                    )}
                  </>
              }
            </div>

            <div className={styles.footer}>
              <button className={styles.ghostBtn} onClick={onRegen} disabled={letter.loading}>↺ rewrite</button>
              <div className={styles.footerRight}>
                <button className={styles.copyBtn} onClick={copyEmail} disabled={letter.loading || !letter.body}>
                  {copied ? '✓ copied' : 'copy letter'}
                </button>
                <button className={styles.primaryBtn} onClick={handlePrint} disabled={letter.loading || !letter.body}>
                  print letter ↗
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
