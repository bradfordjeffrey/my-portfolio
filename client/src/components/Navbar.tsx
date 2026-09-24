import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { creative, focusAreas, profile } from '../data/portfolio'
import { accents } from './accents'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const progressRef = useRef<HTMLDivElement>(null)

  // Update the progress bar directly (not via state) so scrolling doesn't re-render the navbar.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      progressRef.current?.style.setProperty('scale', `${progress} 1`)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const linkClass = (isActive: boolean, activeText: string) =>
    `transition hover:text-white ${isActive ? `font-semibold ${activeText}` : ''}`

  const links = (
    <>
      {[...focusAreas, creative].map((page) => (
        <li key={page.slug}>
          <NavLink
            to={`/${page.slug}`}
            onClick={close}
            className={({ isActive }) => `block py-2 lg:py-0 ${linkClass(isActive, accents[page.accent].text)}`}
          >
            {page.navLabel}
          </NavLink>
        </li>
      ))}
      <li>
        <Link to="/#contact" onClick={close} className="block py-2 transition hover:text-white lg:py-0">
          Contact
        </Link>
      </li>
    </>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" onClick={close} className="text-lg font-bold text-white">
          {profile.name}
        </Link>

        <ul className="hidden gap-6 text-sm lg:flex">{links}</ul>

        <button
          type="button"
          className="rounded p-2 text-slate-300 hover:text-white lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && <ul className="border-t border-slate-800 px-6 py-4 lg:hidden">{links}</ul>}

      {/* Scroll progress: fills from left to right as you scroll down the page */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-sky-400 via-violet-400 to-rose-400"
      />
    </header>
  )
}
