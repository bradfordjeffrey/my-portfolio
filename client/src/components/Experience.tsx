import { useEffect, useRef } from 'react'
import { experience, type Job } from '../data/portfolio'
import useInView from '../hooks/useInView'
import { accents, type Accent } from './accents'
import Section from './Section'

// Each job gets its own colour, matching the gradient of the timeline line.
const colours: Accent[] = ['sky', 'violet', 'emerald', 'amber', 'rose']

// Timeline of jobs. As you scroll, a coloured line fills down the timeline;
// each job's dot lights up with a ripple when the line reaches it, and the
// job card slides in with its bullet points appearing one by one.
export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  // Fill the line in step with scrolling (set directly, so scrolling doesn't re-render).
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const list = listRef.current
      if (!list) return
      const rect = list.getBoundingClientRect()
      // Progress = how far the point 60% down the screen has travelled through the list.
      const progress = Math.min(Math.max((window.innerHeight * 0.6 - rect.top) / rect.height, 0), 1)
      fillRef.current?.style.setProperty('scale', `1 ${progress}`)
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

  return (
    <Section id="experience" title="Experience">
      <ol ref={listRef} className="relative space-y-8 pl-10 sm:pl-12">
        {/* Grey track, with the coloured fill on top */}
        <div aria-hidden="true" className="absolute top-3 bottom-3 left-2.75 w-0.5 rounded bg-slate-800" />
        <div
          ref={fillRef}
          aria-hidden="true"
          className="absolute top-3 bottom-3 left-2.75 w-0.5 origin-top rounded bg-linear-to-b from-sky-400 via-emerald-400 to-rose-400 scale-[1_0]"
        />
        {experience.map((job, i) => (
          <TimelineItem key={`${job.company}-${job.role}`} job={job} accent={colours[i % colours.length]} />
        ))}
      </ol>
    </Section>
  )
}

function TimelineItem({ job, accent }: { job: Job; accent: Accent }) {
  const a = accents[accent]
  // The card appears as soon as it scrolls into view...
  const [itemRef, shown] = useInView<HTMLLIElement>()
  // ...but the dot only lights up once it reaches 60% down the screen,
  // roughly where the filling line is.
  const [dotRef, reached] = useInView<HTMLSpanElement>('0px 0px -40% 0px')

  return (
    <li ref={itemRef} className="relative">
      {/* Timeline dot */}
      <span
        ref={dotRef}
        aria-hidden="true"
        className="absolute top-5 -left-10 grid size-6 place-items-center rounded-full border-2 border-slate-700 bg-slate-950 transition-[border-color,box-shadow] duration-500 sm:-left-12"
        style={reached ? { borderColor: `rgb(${a.rgb})`, boxShadow: `0 0 16px rgb(${a.rgb} / 0.5)` } : undefined}
      >
        <span
          className={`size-2 rounded-full transition-[scale,background-color] duration-500 ${reached ? 'scale-100' : 'scale-50 bg-slate-700'}`}
          style={reached ? { backgroundColor: `rgb(${a.rgb})` } : undefined}
        />
        {reached && (
          <span className="absolute inset-0 animate-ripple rounded-full border-2" style={{ borderColor: `rgb(${a.rgb})` }} />
        )}
      </span>

      {/* Job card */}
      <div
        className={`rounded-xl border border-slate-800 bg-slate-900/40 p-5 transition-[opacity,translate,border-color,background-color] duration-700 ease-out hover:bg-slate-900/70 sm:p-6 ${a.hoverBorder} ${
          shown ? 'opacity-100' : 'translate-x-8 opacity-0'
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div>
            <h3 className="text-lg font-semibold text-white">{job.role}</h3>
            <p className={`mt-1 ${a.text}`}>
              {job.company}
              {job.location && <span className="text-slate-500"> · {job.location}</span>}
            </p>
          </div>
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${a.chip}`}>{job.period}</span>
        </div>

        <ul className="mt-4 space-y-2 text-sm leading-relaxed">
          {job.points.map((point, i) => (
            <li
              key={point}
              className={`flex gap-3 transition-[opacity,translate] duration-500 ease-out ${shown ? 'opacity-100' : 'translate-y-2 opacity-0'}`}
              style={{ transitionDelay: shown ? `${300 + i * 120}ms` : '0ms' }}
            >
              <span className={`mt-2 size-1.5 shrink-0 rounded-full ${a.bar}`} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
