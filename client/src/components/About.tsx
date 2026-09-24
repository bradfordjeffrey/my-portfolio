import { about, profile } from '../data/portfolio'
import Section from './Section'

export default function About() {
  return (
    <Section id="about" title="About me">
      <div className="max-w-3xl space-y-4 text-lg leading-relaxed">
        {about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
        <p className="text-slate-500">Based in {profile.location}</p>
      </div>
    </Section>
  )
}
