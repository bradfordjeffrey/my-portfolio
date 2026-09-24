import type { ReactNode } from 'react'
import useInView from '../hooks/useInView'

// Watches one container and, when it scrolls into view, lets every item inside
// run its entrance effect. Give each item one of the `stagger` classes from staggerStyles.ts
// and a `staggerDelay(...)` style so they appear one after another.
export default function Stagger({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <div ref={ref} data-shown={inView || undefined} className={`group/stagger ${className}`}>
      {children}
    </div>
  )
}
