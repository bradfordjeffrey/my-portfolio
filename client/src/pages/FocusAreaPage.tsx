import { useEffect } from 'react'
import { Link } from 'react-router'
import { accents } from '../components/accents'
import CtaBox from '../components/CtaBox'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import Section from '../components/Section'
import Stagger from '../components/Stagger'
import { stagger, staggerDelay } from '../components/staggerStyles'
import { focusAreas, profile, type FocusArea } from '../data/portfolio'

// One template for every focus area page; the content comes from portfolio.ts.
export default function FocusAreaPage({ area }: { area: FocusArea }) {
  const a = accents[area.accent]
  const index = focusAreas.indexOf(area)
  const next = focusAreas[(index + 1) % focusAreas.length]

  useEffect(() => {
    document.title = `${area.title} | ${profile.name}`
  }, [area])

  return (
    <>
      <PageHeader
        accent={area.accent}
        eyebrow="Area of expertise"
        title={area.title}
        summary={area.summary}
        back={{ to: '/#expertise', label: 'All areas of expertise' }}
      />

      <Section title="What I do" accent={area.accent} variant="draw">
        <Stagger>
          <ul className="grid gap-4 sm:grid-cols-2">
            {area.highlights.map((h, i) => (
              <li key={h} className={stagger.slide} style={staggerDelay(i, 100)}>
                <div
                  className={`flex h-full gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition hover:translate-x-1 ${a.hoverBorder}`}
                >
                  <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${a.bar}`} />
                  <span className="leading-relaxed">{h}</span>
                </div>
              </li>
            ))}
          </ul>
        </Stagger>
      </Section>

      <Section title="Skills & tools" accent={area.accent} variant="draw">
        <Stagger className={`grid gap-8 ${area.skills.length === 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
          {area.skills.map((group, g) => (
            <div key={group.category}>
              <h3 className="mb-4 font-semibold text-white">{group.category}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <li key={item} className={stagger.pop} style={staggerDelay(i, 50, g * 200)}>
                    <span
                      className={`block rounded-md border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm transition hover:-translate-y-0.5 hover:text-white ${a.hoverBorder}`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Stagger>
      </Section>

      <Section title="Relevant coursework" accent={area.accent} variant="draw">
        <p className="mb-6 text-slate-400">From my postgraduate studies in Information Technology Solutions.</p>
        <Stagger>
          <ul className="grid gap-3 sm:grid-cols-2">
            {area.coursework.map((course, i) => (
              <li key={course} className={stagger.wipe} style={staggerDelay(i, 80)}>
                <div className={`rounded-lg border-l-2 ${a.border} bg-slate-900/50 px-4 py-3`}>{course}</div>
              </li>
            ))}
          </ul>
        </Stagger>
      </Section>

      <Section title="Projects" accent={area.accent} variant="draw">
        <Stagger className="grid gap-6 sm:grid-cols-2">
          {area.projects.map((project, i) => (
            <div key={project.title} className={stagger.focus} style={staggerDelay(i, 150)}>
              <ProjectCard project={project} accent={area.accent} />
            </div>
          ))}
        </Stagger>
      </Section>

      <CtaBox
        accent={area.accent}
        title={`Looking for help with ${area.title.toLowerCase()}?`}
        text="I'm open to new opportunities. Let's talk about how I can help your team."
      >
        <Link to="/#contact" className="rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200">
          Get in touch
        </Link>
        <Link
          to={`/${next.slug}`}
          className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-slate-500"
        >
          Next: {next.title} →
        </Link>
      </CtaBox>
    </>
  )
}
