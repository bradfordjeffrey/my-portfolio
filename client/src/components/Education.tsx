import { education } from '../data/portfolio'
import Section from './Section'

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="space-y-6">
        {education.map((item) => (
          <div key={item.credential} className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-semibold text-white">{item.credential}</h3>
              <span className="text-sm text-slate-500">{item.period}</span>
            </div>
            <p className="mt-1 text-sky-400">
              {item.institution} <span className="text-slate-500">· {item.location}</span>
            </p>
            {item.highlights && (
              <ul className="mt-5 list-disc space-y-2 pl-5 leading-relaxed">
                {item.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
