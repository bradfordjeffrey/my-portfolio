import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { accents, type Accent } from './accents'

type Props = {
  accent: Accent
  eyebrow: string
  title: string
  summary: string
  back: { to: string; label: string }
  children?: ReactNode // extra content under the summary
}

// Header for the inner pages. Quieter than the home page hero: the title's
// words rise into place, an underline draws in, a faint grid drifts in the
// background, and a soft light sweeps along the bottom edge now and then.
export default function PageHeader({ accent, eyebrow, title, summary, back, children }: Props) {
  const a = accents[accent]
  const words = title.split(' ')
  const afterTitle = 250 + words.length * 90 // ms: when the title has finished

  return (
    <section className={`relative isolate overflow-hidden border-b border-slate-800 bg-linear-to-b ${a.glow} to-transparent`}>
      {/* Drifting grid, fading out towards the bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-grid-pan [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
        style={{
          backgroundImage: `linear-gradient(rgb(${a.rgb} / 0.07) 1px, transparent 1px), linear-gradient(90deg, rgb(${a.rgb} / 0.07) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Light sweeping along the bottom border */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-1/4 animate-sweep"
        style={{ background: `linear-gradient(90deg, transparent, rgb(${a.rgb}), transparent)` }}
      />

      <div className="mx-auto max-w-5xl px-6 pt-12 pb-16">
        <Link to={back.to} className="animate-fade-in text-sm text-slate-400 hover:text-white">
          ← {back.label}
        </Link>
        <p className={`mt-8 animate-fade-in font-medium ${a.text}`} style={{ animationDelay: '100ms' }}>
          {eyebrow}
        </p>

        <h1 aria-label={title} className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {words.map((word, i) => (
            <span key={i} aria-hidden="true">
              {i > 0 && ' '}
              {/* Each word slides up from behind an invisible edge */}
              <span className="inline-block overflow-hidden pb-1 align-bottom">
                <span className="inline-block animate-rise" style={{ animationDelay: `${200 + i * 90}ms` }}>
                  {word}
                </span>
              </span>
            </span>
          ))}
        </h1>
        <span
          aria-hidden="true"
          className={`mt-4 block h-1 w-16 origin-left animate-draw rounded ${a.bar}`}
          style={{ animationDelay: `${afterTitle}ms` }}
        />

        <p className="mt-6 max-w-3xl animate-fade-in text-lg leading-relaxed" style={{ animationDelay: `${afterTitle + 100}ms` }}>
          {summary}
        </p>
        {children && (
          <div className="animate-fade-in" style={{ animationDelay: `${afterTitle + 250}ms` }}>
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
