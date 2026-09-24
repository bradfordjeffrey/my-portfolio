import type { ReactNode } from 'react'
import { accents, type Accent } from './accents'

type Props = {
  accent: Accent
  title: string
  text: string
  children: ReactNode // buttons
}

// Call-to-action box with a thin line of light slowly circling its border.
export default function CtaBox({ accent, title, text, children }: Props) {
  const { rgb } = accents[accent]
  return (
    <section className="mx-auto max-w-5xl px-6 pt-4 pb-20">
      <div
        className="animate-border-spin rounded-2xl border border-transparent p-8 text-center sm:p-12"
        style={{
          // Two layered backgrounds: a solid fill inside the border, and a
          // rotating cone of colour that only shows through the 1px border.
          background: `linear-gradient(rgb(15 23 42), rgb(15 23 42)) padding-box,
            conic-gradient(from var(--border-angle), rgb(51 65 85) 0deg, rgb(51 65 85) 240deg, rgb(${rgb}) 300deg, rgb(51 65 85) 360deg) border-box`,
        }}
      >
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">{children}</div>
      </div>
    </section>
  )
}
