export async function generateLetter({ company, profile, name, degree, year, story, photoAttached, mailingAddress }) {
  const resolvedProfile = profile || {}
  const resolvedName = name || resolvedProfile.name || 'Your Name'
  const resolvedDegree = degree || resolvedProfile.degree || 'your degree'
  const resolvedYear = year || resolvedProfile.year || '2026'
  const resolvedStory = story ?? resolvedProfile.story ?? ''
  const resolvedPhotoAttached = photoAttached ?? resolvedProfile.photoAttached ?? false
  const resolvedMailingAddress = mailingAddress || resolvedProfile.mailingAddress || '[Your Mailing Address]'

  const prompt = `Write a short, warm, personal message from a recent graduate to ${company.name}'s customer relations team.

Details:
- From: ${resolvedName}, graduated with ${resolvedDegree} in ${resolvedYear}
- Brand: ${company.name}
${resolvedStory ? `- Personal connection to this brand: "${resolvedStory}"` : ''}
${resolvedPhotoAttached ? '- They are including a graduation photo' : ''}

Write ONE message that works both as an email body AND a printed letter. Requirements:
- 3 short paragraphs only
- Warm and personal, specific to ${company.name}
- Mention they are sharing this milestone with a brand that has been part of their journey
- End with their full name, degree, graduation year, and the mailing address below:
  ${resolvedMailingAddress}
- No subject line, no "To:" header — just the body starting with a salutation like "Dear ${company.name} Team,"
- No clichés like "I hope this finds you well"
- Sound like a real human wrote it

Return ONLY the message body. Nothing else.`

  const localEndpoint = import.meta.env.VITE_LOCAL_MODEL_URL || 'http://localhost:11434/api/generate'
  const localModel = import.meta.env.VITE_LOCAL_MODEL_NAME || 'llama3.2'
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY

  function outputText(node) {
    if (!node) return ''
    if (typeof node === 'string') return node
    if (typeof node.text === 'string') return node.text
    if (Array.isArray(node.parts)) return node.parts.map(outputText).join('')
    if (Array.isArray(node.content)) return node.content.map(outputText).join('')
    return ''
  }

  async function callLocalModel(text) {
    try {
      const res = await fetch(localEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: localModel,
          prompt: `You are a professional letter writer. Follow the user instructions exactly and return only the final letter body.\n\n${text}`,
          stream: false,
          options: {
            temperature: 0.2,
            top_p: 0.9,
          },
        }),
      })

      if (!res.ok) return null

      const data = await res.json()
      return data?.response || data?.content || data?.text || data?.output?.text || ''
    } catch {
      return null
    }
  }

  function cleanText(text = '') {
    const value = typeof text === 'string' ? text : ''
    return value
      .replace(/^(Here is your letter:\s*)/i, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  }

  function generateLocalFallback() {
    const memoryLine = story
      ? `What makes this moment especially meaningful is how ${company.name} has been part of my journey, and ${resolvedStory.toLowerCase()}.`
      : `What makes this moment especially meaningful is how ${company.name} has been part of my journey and helped shape the way I see everyday experiences.`

    const photoLine = resolvedPhotoAttached
      ? 'I am also including a graduation photo to celebrate this milestone with you.'
      : 'I wanted to share this milestone with a brand that has felt like part of my story.'

    return [
      `Dear ${company.name} Team,\n\nI’m ${resolvedName}, and I recently graduated with a ${resolvedDegree} in ${resolvedYear}. As I celebrate this new chapter, I wanted to thank ${company.name} for being part of the path that brought me here.`,
      `${memoryLine} ${photoLine}`,
      `Thank you for creating something that has made everyday moments feel more joyful and memorable. I’m proud to share this milestone with you, and I hope this letter reflects the gratitude I feel.\n\n${resolvedName}\n${resolvedDegree}\nClass of ${resolvedYear}\n${resolvedMailingAddress}`,
    ].join('\n\n')
  }

  async function tryLocalModel() {
    try {
      if (import.meta.env.DEV) {
        const directText = await callLocalModel(prompt)
        return directText ? cleanText(directText) : null
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!res.ok) return null

      const data = await res.json()
      return data?.response ? cleanText(data.response) : null
    } catch {
      return null
    }
  }

  async function tryGeminiModel() {
    if (!geminiApiKey) return null

    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': geminiApiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: 'You are a professional letter writer. Follow the user instructions exactly and return only the final letter body.' }],
          },
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, topP: 0.9, maxOutputTokens: 10000 },
        }),
      })

      if (!res.ok) return null

      const data = await res.json()
      const candidate = data.candidates?.[0]
      return cleanText(outputText(candidate?.content || data.content || candidate?.output || data.output))
    } catch {
      return null
    }
  }

  const body = (await tryLocalModel()) || (await tryGeminiModel()) || generateLocalFallback()
  const subject = `Graduation Announcement — ${resolvedName}, ${resolvedDegree} '${String(resolvedYear).slice(-2)}`

  return { subject, body: cleanText(body) }
}
