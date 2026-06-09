import { useState, useRef } from 'react'
import styles from './Landing.module.css'

export default function Landing({ onStart }) {
  const [name, setName] = useState('')
  const [degree, setDegree] = useState('')
  const [year, setYear] = useState('2026')
  const [mailingAddress, setMailingAddress] = useState('')
  const [story, setStory] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoCaption, setPhotoCaption] = useState('')
  const [photoName, setPhotoName] = useState('')
  const [error, setError] = useState('')
  const fileRef = useRef()

  function handlePhoto(e) {
    const file = e.target.files[0]
    if (!file) return
    setPhotoName(file.name)
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result)
    reader.readAsDataURL(file)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !degree.trim()) { setError('Name and degree are required.'); return }
    onStart({
      name: name.trim(),
      degree: degree.trim(),
      year: year.trim(),
      mailingAddress: mailingAddress.trim(),
      story: story.trim(),
      photoCaption: photoCaption.trim(),
      photo,
      photoAttached: !!photo,
    })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        <div className={styles.eyebrow}>graduation.money</div>
        <h1 className={styles.headline}>Your diploma<br /><em>opens wallets.</em></h1>
        <p className={styles.sub}>Brands love graduates. Mail or email your announcement to the right companies — we write every letter for you, personalized and ready to send.</p>
        <div className={styles.stats}>
          <div className={styles.stat}><span className={styles.statN}>$150+</span><span className={styles.statL}>per response</span></div>
          <div className={styles.stat}><span className={styles.statN}>85%</span><span className={styles.statL}>Chick-fil-A rate</span></div>
          <div className={styles.stat}><span className={styles.statN}>25+</span><span className={styles.statL}>verified brands</span></div>
        </div>
        <div className={styles.steps}>
          <div className={styles.step}><span className={styles.stepN}>01</span><span>Fill your details</span></div>
          <div className={styles.step}><span className={styles.stepN}>02</span><span>Pick brands</span></div>
          <div className={styles.step}><span className={styles.stepN}>03</span><span>AI writes your emails</span></div>
          <div className={styles.step}><span className={styles.stepN}>04</span><span>Send & track</span></div>
        </div>
      </div>

      <div className={styles.right}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formTitle}>Tell us about you</div>

          <div className={styles.row2}>
            <div className={styles.field}>
              <label>First name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Sagnik" autoFocus />
            </div>
            <div className={styles.field}>
              <label>Year</label>
              <input type="text" value={year} onChange={e => setYear(e.target.value)} placeholder="2026" />
            </div>
          </div>

          <div className={styles.field}>
            <label>Degree & field</label>
            <input type="text" value={degree} onChange={e => setDegree(e.target.value)} placeholder="B.Tech in Computer Science" />
          </div>

          <div className={styles.field}>
            <label>Mailing address <span className={styles.opt}>— optional, used for the printed letter footer</span></label>
            <textarea value={mailingAddress} onChange={e => setMailingAddress(e.target.value)} placeholder="123 Main St, City, ST 00000" rows={2} />
          </div>

          <div className={styles.field}>
            <label>Why you love any of these brands <span className={styles.opt}>— optional, makes emails feel real</span></label>
            <textarea value={story} onChange={e => setStory(e.target.value)} placeholder="e.g. I've eaten Chick-fil-A every week since high school..." rows={3} />
          </div>

          <div className={styles.field}>
            <label>Graduation photo <span className={styles.opt}>— optional, improves response rate</span></label>
            <div className={styles.photoRow}>
              <button type="button" className={styles.photoBtn} onClick={() => fileRef.current.click()}>
                {photoName ? `📎 ${photoName}` : '+ attach photo'}
              </button>
              {photo && <span className={styles.photoCheck}>✓ attached</span>}
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhoto} />
          </div>

          <div className={styles.field}>
            <label>Photo caption <span className={styles.opt}>— optional, appears on the photo card</span></label>
            <input type="text" value={photoCaption} onChange={e => setPhotoCaption(e.target.value)} placeholder="My graduation day at the lake" />
          </div>

          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.btn}>Pick my brands →</button>
        </form>
      </div>
    </div>
  )
}
