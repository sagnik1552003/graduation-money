import { useState } from 'react'
import styles from './EmailPreview.module.css'

export default function EmailPreview({ company, letter, profile, onClose, onRegen, onMarkSent }) {
  const safeProfile = profile || {}
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
  if (!safeProfile.photo) return

  const img = new Image()
  const src = safeProfile.photo instanceof File
    ? URL.createObjectURL(safeProfile.photo)
    : safeProfile.photo

  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const width = 900
    const height = 1100
    canvas.width = width
    canvas.height = height

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#fffdf8'
    ctx.fillRect(0, 0, width, height)

    const cardX = 110
    const cardY = 80
    const cardW = 680
    const cardH = 860
    const photoX = cardX + 38
    const photoY = cardY + 38
    const photoW = cardW - 76
    const photoH = cardH - 160

    ctx.save()
    ctx.translate(width / 2, height / 2)
    ctx.rotate(-0.03)
    ctx.translate(-width / 2, -height / 2)

    ctx.shadowColor = 'rgba(0, 0, 0, 0.18)'
    ctx.shadowBlur = 24
    ctx.shadowOffsetY = 16
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#ead9b6'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(cardX, cardY, cardW, cardH, 16)
    ctx.fill()
    ctx.stroke()
    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0

    ctx.filter = 'sepia(0.10) contrast(1.08) saturate(1.03) brightness(1.02)'
    ctx.drawImage(img, photoX, photoY, photoW, photoH)
    ctx.filter = 'none'

    ctx.fillStyle = '#2d2d2d'
    ctx.textAlign = 'center'
    ctx.font = '700 44px "Caveat", "Brush Script MT", cursive'
    const caption = (safeProfile.photoCaption || 'Graduation photo attached').trim()
    ctx.fillText(caption, width / 2, cardY + cardH - 32)
    ctx.restore()

    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${caption.replace(/\s+/g, '-').toLowerCase() || 'graduation-photo'}.png`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
      if (safeProfile.photo instanceof File) URL.revokeObjectURL(src)
    }, 'image/png')
  }

  img.onerror = () => console.error('Image load failed for download')
  img.src = src
}

  function openContactForm() {
    const contactUrl = company?.contactForm

    if (!contactUrl) {
      onMarkSent()
      return
    }

    const popup = window.open(contactUrl, '_blank', 'noopener,noreferrer')

    if (!popup) {
      window.location.assign(contactUrl)
    }

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
              <div className={styles.headerSub}>AI-written · personalized for {safeProfile.name || 'your profile'}</div>
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
                    {safeProfile.photo && (
                      <div className={styles.photoSection}>
                        <div className={styles.polaroidFrame}>
                          <img src={safeProfile.photo} alt="Graduation photo" className={`${styles.photoImage} ${styles.polaroidImage}`} />
                          <p className={styles.photoCaption}>{safeProfile.photoCaption?.trim() || 'Graduation photo attached'}</p>
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
                    {safeProfile.photo && (
                      <div className={styles.photoSection}>
                        <div className={styles.polaroidFrame}>
                          <img src={safeProfile.photo} alt="Graduation photo" className={`${styles.photoImage} ${styles.polaroidImage}`} />
                          <p className={styles.photoCaption}>{safeProfile.photoCaption?.trim() || 'Graduation photo attached'}</p>
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
