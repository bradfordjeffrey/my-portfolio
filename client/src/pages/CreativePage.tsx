import { useEffect } from 'react'
import { Link } from 'react-router'
import CtaBox from '../components/CtaBox'
import Gallery from '../components/Gallery'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'
import Stagger from '../components/Stagger'
import { stagger, staggerDelay } from '../components/staggerStyles'
import VideoCard from '../components/VideoCard'
import { accents } from '../components/accents'
import { creative, profile } from '../data/portfolio'

export default function CreativePage() {
  const a = accents[creative.accent]

  useEffect(() => {
    document.title = `${creative.title} | ${profile.name}`
  }, [])

  return (
    <>
      <PageHeader
        accent={creative.accent}
        eyebrow="Creative work"
        title={creative.title}
        summary={creative.summary}
        back={{ to: '/', label: 'Home' }}
      >
        <Stagger className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-400 uppercase">Specialties</h2>
            <ul className="flex flex-wrap gap-2">
              {creative.specialties.map((s, i) => (
                <li key={s} className={`${stagger.pop} rounded-full px-3 py-1 text-sm font-medium ${a.chip}`} style={staggerDelay(i, 60, 700)}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-400 uppercase">Tools</h2>
            <ul className="flex flex-wrap gap-2">
              {creative.tools.map((t, i) => (
                <li
                  key={t}
                  className={`${stagger.pop} rounded-md border border-slate-800 bg-slate-900 px-3 py-1 text-sm`}
                  style={staggerDelay(i, 60, 900)}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Stagger>
      </PageHeader>

      <Section id="photography" title="Photography" accent={creative.accent} variant="draw">
        <Gallery photos={creative.photos} accent={creative.accent} />
      </Section>

      {/* Hidden on the live site until you add videos; shows a reminder while developing. */}
      {(creative.videos.length > 0 || import.meta.env.DEV) && (
        <Section id="videography" title="Videography" accent={creative.accent} variant="draw">
          {creative.videos.length > 0 ? (
            <Stagger className="grid gap-6 sm:grid-cols-2">
              {creative.videos.map((video, i) => (
                <div key={video.title} className={stagger.focus} style={staggerDelay(i, 150)}>
                  <VideoCard video={video} />
                </div>
              ))}
            </Stagger>
          ) : (
            <p className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-slate-400">
              No videos yet. Add them to <code className="text-white">creative.videos</code> in{' '}
              <code className="text-white">client/src/data/portfolio.ts</code>. (This note only shows during
              development.)
            </p>
          )}
        </Section>
      )}

      <CtaBox
        accent={creative.accent}
        title="Need a photographer or videographer?"
        text="I'm available for shoots, events and video projects. Let's create something together."
      >
        <Link to="/#contact" className="rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200">
          Get in touch
        </Link>
      </CtaBox>
    </>
  )
}
