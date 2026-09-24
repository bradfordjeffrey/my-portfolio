import { useState, type FormEvent } from 'react'
import { profile } from '../data/portfolio'
import Section from './Section'

type Status = 'idle' | 'sending' | 'success' | 'error'

// In development Vite proxies /api to the Express server (see vite.config.ts).
// In production, set VITE_API_URL to the deployed server's URL.
const API_URL = import.meta.env.VITE_API_URL ?? ''

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    setStatus('sending')
    setError('')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await res.json().catch(() => ({}))
      // Only treat it as sent when the API explicitly confirms it, so a missing
      // or misconfigured API can never show a false "sent" message.
      if (!res.ok || body.ok !== true) throw new Error(body.error ?? 'Something went wrong. Please try again.')
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const inputClass =
    'w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-sky-400'

  return (
    <Section id="contact" title="Get in touch">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say
            hello, my inbox is open.
          </p>
          <p>
            Email:{' '}
            <a href={`mailto:${profile.email}`} className="text-sky-400 hover:underline">
              {profile.email}
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" required maxLength={100} placeholder="Your name" className={inputClass} />
          <input name="email" type="email" required maxLength={200} placeholder="Your email" className={inputClass} />
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            placeholder="Your message"
            className={inputClass}
          />
          {/* Honeypot field: hidden from people, but bots tend to fill it in. */}
          <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full rounded-lg bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400 disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'success' && <p className="text-green-400">Thanks! Your message has been sent.</p>}
          {status === 'error' && <p className="text-red-400">{error}</p>}
        </form>
      </div>
    </Section>
  )
}
