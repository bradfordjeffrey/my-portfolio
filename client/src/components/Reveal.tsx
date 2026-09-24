import type { ReactNode } from 'react'
import useInView from '../hooks/useInView'

type Props = {
  children: ReactNode
  delay?: number // ms, for staggering several items
  className?: string
}

// Fades and slides its content up the first time it scrolls into view.
export default function Reveal({ children, delay = 0, className = '' }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      // The translate class is removed (not set to 0) once visible, so this
      // wrapper doesn't create a new containing block for fixed-position children.
      className={`transition-[opacity,translate] duration-700 ease-out ${inView ? 'opacity-100' : 'translate-y-8 opacity-0'} ${className}`}
    >
      {children}
    </div>
  )
}
