import { profile } from '../data/portfolio'
import NetworkCanvas from './NetworkCanvas'
import RotatingRole from './RotatingRole'

// Staggers the opening animation: each item starts a little after the last.
const delay = (ms: number) => ({ animationDelay: `${ms}ms` })

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background: drifting colour glows + data network */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 size-112 animate-drift rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute top-10 -right-32 size-104 animate-drift-slow rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-88 animate-drift rounded-full bg-emerald-500/15 blur-3xl [animation-delay:-8s]" />
        <div className="absolute right-1/4 -bottom-24 size-72 animate-drift-slow rounded-full bg-rose-500/15 blur-3xl [animation-delay:-14s]" />
        <NetworkCanvas />
        {/* Fade into the page background at the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-slate-950" />
      </div>

      <div className="mx-auto flex min-h-[85vh] max-w-5xl flex-col justify-center px-6 py-20">
        <h1 className="animate-fade-up text-5xl font-bold tracking-tight text-white sm:text-6xl" style={delay(0)}>
          {profile.name}
        </h1>
        <h2 className="mt-3 animate-fade-up text-3xl font-semibold text-slate-400 sm:text-4xl" style={delay(120)}>
          {profile.role}
        </h2>

        <div className="mt-6 animate-fade-up" style={delay(240)}>
          <RotatingRole />
        </div>

        <p className="mt-4 max-w-2xl animate-fade-up text-lg leading-relaxed" style={delay(360)}>
          {profile.tagline}
        </p>

        <div className="mt-10 flex animate-fade-up flex-wrap gap-4" style={delay(480)}>
          <a
            href="#expertise"
            className="rounded-lg bg-sky-500 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-400"
          >
            Explore my expertise
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-700 bg-slate-950/40 px-6 py-3 font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-400 hover:text-sky-400"
          >
            Download resume
          </a>
        </div>

        <ul className="mt-10 flex animate-fade-up gap-6 text-sm" style={delay(600)}>
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noreferrer" className="hover:text-sky-400">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
