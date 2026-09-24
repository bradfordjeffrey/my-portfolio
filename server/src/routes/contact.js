import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { sendContactEmail } from '../mailer.js'

const router = Router()

// At most 5 messages per visitor every 15 minutes, to stop spam floods.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please try again later.' },
})

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

router.post('/', limiter, async (req, res, next) => {
  // Honeypot: real visitors never see the "website" field, so if it's filled in
  // it's a bot. Pretend it worked so the bot doesn't retry.
  if (req.body?.website) {
    return res.json({ ok: true })
  }

  const { data, error } = validate(req.body)
  if (error) {
    return res.status(400).json({ error })
  }

  try {
    await sendContactEmail(data)
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default router
