import type { ReactNode } from 'react'
import useInView from '../hooks/useInView'
import { accents, type Accent } from './accents'
import Reveal from './Reveal'

type Props = {
  id?: string
  title: string
  accent?: Accent
  // 'fade' (home page): heading and content fade up.
  // 'draw' (inner pages): heading is wiped in and its bar draws across;
  //   the content handles its own entrance (see Stagger).
  variant?: 'fade' | 'draw'
  children: ReactNode
}

// Shared wrapper so every section has the same spacing and heading style.
export default function Section({ id, title, accent = 'sky', variant = 'fade', children }: Props) {
  const [ref, inView] = useInView<HTMLElement>()
  const bar = accents[accent].bar

  if (variant === 'draw') {
    return (
      <section ref={ref} id={id} data-shown={inView || undefined} className="group/section mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-10 text-3xl font-bold text-white">
          <span className="block pb-1 transition-[clip-path] duration-700 ease-out [clip-path:inset(0_100%_0_0)] group-data-[shown]/section:[clip-path:inset(0_0_0_0)]">
            {title}
          </span>
          <span
            className={`mt-2 block h-1 w-12 origin-left scale-x-0 rounded transition-[scale] delay-300 duration-700 ease-out group-data-[shown]/section:scale-x-100 ${bar}`}
          />
        </h2>
        {children}
      </section>
    )
  }

  return (
    <section id={id} className="mx-auto max-w-5xl px-6 py-16">
      <Reveal>
        <h2 className="mb-10 text-3xl font-bold text-white">
          {title}
          <span className={`mt-3 block h-1 w-12 rounded ${bar}`} />
        </h2>
      </Reveal>
      <Reveal delay={100}>{children}</Reveal>
    </section>
  )
}
