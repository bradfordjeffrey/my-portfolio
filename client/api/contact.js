// POST /api/contact: the contact form's backend.
//
// On the live site, Vercel runs this file as a serverless function (every file
// in client/api/ becomes an endpoint). During local development, the Express
// server in server/ mounts this same handler, so both behave identically.
import { sendContactEmail } from './_lib/mailer.js'

// Rate limit: at most 5 messages per visitor every 15 minutes.
// This is kept in memory, so on Vercel it's per server instance: a speed bump
// against spam floods rather than a hard guarantee.
const WINDOW_MS = 15 * 60 * 1000
const LIMIT = 5
const recentByIp = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const recent = (recentByIp.get(ip) ?? []).filter((time) => now - time < WINDOW_MS)
  recent.push(now)
  recentByIp.set(ip, recent)
  return recent.length > LIMIT
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(body) {
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const message = typeof body?.message === 'string' ? body.message.trim() : ''

  if (!name || name.length > 100) return { error: 'Please enter your name (max 100 characters).' }
  if (!EMAIL_PATTERN.test(email) || email.length > 200) return { error: 'Please enter a valid email address.' }
  if (message.length < 10 || message.length > 5000) return { error: 'Message must be 10–5000 characters.' }

  // Strip line breaks from fields used in email headers.
  return { data: { name: name.replace(/[\r\n]+/g, ' '), email, message } }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const forwarded = req.headers['x-forwarded-for']
  const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket?.remoteAddress ?? 'unknown').trim()
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many messages sent. Please try again later.' })
  }

  // Honeypot: real visitors never see the "website" field, so if it's filled in
  // it's a bot. Pretend it worked so the bot doesn't retry.
  if (req.body?.website) {
    return res.status(200).json({ ok: true })
  }

  const { data, error } = validate(req.body)
  if (error) {
    return res.status(400).json({ error })
  }

  try {
    await sendContactEmail(data)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Failed to send contact email:', err)
    return res.status(500).json({ error: 'Sorry, your message could not be sent. Please email me directly.' })
  }
}
