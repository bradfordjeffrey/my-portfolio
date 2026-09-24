import { useEffect, useState } from 'react'
import { stats, type Stat } from '../data/portfolio'
import useInView from '../hooks/useInView'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import { accents, type Accent } from './accents'
import Reveal from './Reveal'

const colours: Accent[] = ['sky', 'emerald', 'violet', 'amber']
const DURATION = 1600 // ms

function Counter({ stat }: { stat: Stat }) {
  const [ref, inView] = useInView<HTMLSpanElement>()
  const reduced = usePrefersReducedMotion()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    let frame = 0
    const startTime = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / DURATION, 1)
      const eased = 1 - (1 - progress) ** 3 // ease-out: fast start, gentle finish
      setCurrent(stat.value * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, stat.value])

  // Reduced motion: show the final number straight away, no counting.
  const shown = reduced ? stat.value : current

  return (
    <span ref={ref} className="tabular-nums">
      {shown.toFixed(stat.decimals ?? 0)}
      {stat.suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-16">
      <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 100}>
            <div className="h-full rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center">
              <dd className={`text-4xl font-bold ${accents[colours[i % colours.length]].text}`}>
                <Counter stat={stat} />
              </dd>
              <dt className="mt-2 text-sm text-slate-400">{stat.label}</dt>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
