import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import contactRouter from './routes/contact.js'

const app = express()

// Comma-separated list of sites allowed to call this API, e.g.
// CLIENT_ORIGIN=https://yourname.dev,https://www.yourname.dev
const allowedOrigins = (process.env.CLIENT_ORIGIN ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())

// Hosts like Render/Railway sit behind a proxy; this lets rate limiting see the real client IP.
app.set('trust proxy', 1)

app.use(helmet())
app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '20kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/contact', contactRouter)

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Catch-all error handler so unexpected errors return JSON instead of an HTML page.
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(err.status ?? 500).json({ error: 'Something went wrong. Please try again later.' })
})

export default app
