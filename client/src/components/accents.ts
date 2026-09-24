// Each focus area has its own accent colour. Tailwind only generates classes it
// can find written out in full, so every class name is spelled out here.
// `rgb` is the same colour as raw numbers, for use in inline styles and canvas.
export const accents = {
  sky: {
    rgb: '56 189 248',
    text: 'text-sky-400',
    bar: 'bg-sky-400',
    chip: 'bg-sky-400/10 text-sky-300',
    border: 'border-sky-400/40',
    hoverBorder: 'hover:border-sky-400/60',
    glow: 'from-sky-500/15',
  },
  emerald: {
    rgb: '52 211 153',
    text: 'text-emerald-400',
    bar: 'bg-emerald-400',
    chip: 'bg-emerald-400/10 text-emerald-300',
    border: 'border-emerald-400/40',
    hoverBorder: 'hover:border-emerald-400/60',
    glow: 'from-emerald-500/15',
  },
  violet: {
    rgb: '167 139 250',
    text: 'text-violet-400',
    bar: 'bg-violet-400',
    chip: 'bg-violet-400/10 text-violet-300',
    border: 'border-violet-400/40',
    hoverBorder: 'hover:border-violet-400/60',
    glow: 'from-violet-500/15',
  },
  amber: {
    rgb: '251 191 36',
    text: 'text-amber-400',
    bar: 'bg-amber-400',
    chip: 'bg-amber-400/10 text-amber-300',
    border: 'border-amber-400/40',
    hoverBorder: 'hover:border-amber-400/60',
    glow: 'from-amber-500/15',
  },
  rose: {
    rgb: '251 113 133',
    text: 'text-rose-400',
    bar: 'bg-rose-400',
    chip: 'bg-rose-400/10 text-rose-300',
    border: 'border-rose-400/40',
    hoverBorder: 'hover:border-rose-400/60',
    glow: 'from-rose-500/15',
  },
}

export type Accent = keyof typeof accents
