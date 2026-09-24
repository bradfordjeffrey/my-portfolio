import type { MouseEvent } from 'react'
import { Link } from 'react-router'
import { focusAreas, type FocusArea } from '../data/portfolio'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import { accents } from './accents'
import Reveal from './Reveal'
import Section from './Section'

const MAX_TILT = 6 // degrees

// A card with a soft glow that follows the cursor, and a slight 3D tilt.
function AreaCard({ area }: { area: FocusArea }) {
  const a = accents[area.accent]
  const reduced = usePrefersReducedMotion()

  function onMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--x', `${x}px`)
    el.style.setProperty('--y', `${y}px`)
    if (!reduced) {
      const tiltX = (0.5 - y / rect.height) * MAX_TILT
      const tiltY = (x / rect.width - 0.5) * MAX_TILT
      el.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
    }
  }

  function onMouseLeave(e: MouseEvent<HTMLAnchorElement>) {
    e.currentTarget.style.transform = ''
  }

  return (
    <Link
      to={`/${area.slug}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-800 bg-linear-to-br ${a.glow} to-slate-900/40 p-6 transition-[transform,border-color] duration-200 ease-out ${a.hoverBorder}`}
    >
      {/* Cursor spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(360px circle at var(--x) var(--y), rgb(${a.rgb} / 0.14), transparent 65%)` }}
      />
      <span className={`mb-4 block h-1 w-10 rounded ${a.bar}`} />
      <h3 className="text-xl font-semibold text-white">{area.title}</h3>
      <p className="mt-2 flex-1 leading-relaxed">{area.tagline}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {area.skills
          .flatMap((group) => group.items)
          .slice(0, 5)
          .map((skill) => (
            <li key={skill} className={`rounded-full px-3 py-1 text-xs font-medium ${a.chip}`}>
              {skill}
            </li>
          ))}
      </ul>
      <span className={`mt-6 text-sm font-semibold ${a.text}`}>
        View {area.title} <span className="inline-block transition group-hover:translate-x-1">→</span>
      </span>
    </Link>
  )
}

// Home page grid of cards, one per focus area, each linking to its own page.
export default function FocusAreas() {
  return (
    <Section id="expertise" title="Areas of expertise">
      <div className="grid gap-6 sm:grid-cols-2">
        {focusAreas.map((area, i) => (
          <Reveal key={area.slug} delay={i * 120}>
            <AreaCard area={area} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
