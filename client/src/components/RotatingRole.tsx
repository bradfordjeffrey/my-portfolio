import { useEffect, useState } from 'react'
import { creative, focusAreas } from '../data/portfolio'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'
import { accents } from './accents'

const words = [...focusAreas, creative].map((page) => ({ text: page.title, className: accents[page.accent].text }))

const TYPE_SPEED = 70 // ms per letter typed
const DELETE_SPEED = 35 // ms per letter deleted
const HOLD_TIME = 1800 // ms to show the full word
const GAP_TIME = 300 // ms pause before typing the next word

// "I work in ___" where the blank types out each area in turn, in its colour.
export default function RotatingRole() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [length, setLength] = useState(0)
  const [deleting, setDeleting] = useState(false)

  const word = words[index]

  useEffect(() => {
    // Reduced motion: just swap whole words, no typing.
    if (reduced) {
      const id = setTimeout(() => setIndex((i) => (i + 1) % words.length), 2500)
      return () => clearTimeout(id)
    }

    let delay = deleting ? DELETE_SPEED : TYPE_SPEED
    let next: () => void

    if (!deleting && length < word.text.length) {
      next = () => setLength(length + 1)
    } else if (!deleting) {
      delay = HOLD_TIME
      next = () => setDeleting(true)
    } else if (length > 0) {
      next = () => setLength(length - 1)
    } else {
      delay = GAP_TIME
      next = () => {
        setDeleting(false)
        setIndex((index + 1) % words.length)
      }
    }

    const id = setTimeout(next, delay)
    return () => clearTimeout(id)
  }, [reduced, deleting, length, index, word.text.length])

  return (
    <p className="min-h-[4.5rem] text-xl font-medium text-slate-300 sm:min-h-0 sm:text-2xl">
      {/* Screen readers get the full list once instead of the typing effect. */}
      <span className="sr-only">I work in {words.map((w) => w.text).join(', ')}.</span>
      <span aria-hidden="true">
        I work in{' '}
        <span className={`font-semibold ${word.className}`}>{reduced ? word.text : word.text.slice(0, length)}</span>
        <span className="ml-0.5 animate-blink font-light text-slate-400">|</span>
      </span>
    </p>
  )
}
