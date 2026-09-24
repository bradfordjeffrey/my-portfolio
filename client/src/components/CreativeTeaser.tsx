import { Link } from 'react-router'
import { creative } from '../data/portfolio'
import { accents } from './accents'
import Section from './Section'

// Home page preview of the photography & videography page.
export default function CreativeTeaser() {
  const a = accents[creative.accent]
  return (
    <Section id="creative" title="Beyond IT" accent={creative.accent}>
      <Link
        to={`/${creative.slug}`}
        className={`group grid gap-8 rounded-xl border border-slate-800 bg-linear-to-br ${a.glow} to-slate-900/40 p-6 transition sm:p-8 md:grid-cols-2 ${a.hoverBorder}`}
      >
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-white">{creative.title}</h3>
          <p className="mt-3 leading-relaxed">{creative.tagline}</p>
          <span className={`mt-6 text-sm font-semibold ${a.text}`}>
            View my work <span className="inline-block transition group-hover:translate-x-1">→</span>
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {creative.photos.slice(0, 3).map((photo) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              className="aspect-[3/4] w-full rounded-lg object-cover"
            />
          ))}
        </div>
      </Link>
    </Section>
  )
}
