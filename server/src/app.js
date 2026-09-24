import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
// The contact handler lives in client/api/ so Vercel can deploy it as a
// serverless function. Locally, Express runs that exact same code.
import contactHandler from '../../client/api/contact.js'

const app = express()

// Comma-separated list of sites allowed to call this API, e.g.
// CLIENT_ORIGIN=https://yourname.dev,https://www.yourname.dev
const allowedOrigins = (process.env.CLIENT_ORIGIN ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())

// Lets the handler see the real client IP when running behind a proxy.
app.set('trust proxy', 1)

app.use(helmet())
app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '20kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.all('/api/contact', contactHandler)

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Catch-all error handler so unexpected errors return JSON instead of an HTML page.
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(err.status ?? 500).json({ error: 'Something went wrong. Please try again later.' })
})

export default app
