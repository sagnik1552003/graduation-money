export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { prompt } = req.body || {}
  const localEndpoint = process.env.OLLAMA_BASE_URL
  const localModel = process.env.OLLAMA_MODEL || 'llama3.2'

  if (!localEndpoint) {
    return res.status(503).json({ error: 'No public Ollama endpoint is configured.' })
  }

  try {
    const response = await fetch(localEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: localModel,
        prompt,
        stream: false,
      }),
    })

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Local model request failed.' })
    }

    const data = await response.json()
    return res.status(200).json({ response: data.response || data.output?.text || '' })
  } catch {
    return res.status(503).json({ error: 'Local model is unavailable.' })
  }
}
