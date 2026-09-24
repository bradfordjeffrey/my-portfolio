import { useEffect, useRef, useState } from 'react'

// Returns a ref to attach to an element, and whether that element has
// scrolled into view. Once it's been seen it stays true.
// `rootMargin` shifts the trigger line: the default fires slightly before the
// element is fully on screen; '0px 0px -40% 0px' fires when it reaches 60% down the screen.
export default function useInView<T extends Element>(rootMargin = '0px 0px -60px 0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return [ref, inView] as const
}
