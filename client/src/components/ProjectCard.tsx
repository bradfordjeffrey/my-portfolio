import type { Project } from '../data/portfolio'
import { accents, type Accent } from './accents'

export default function ProjectCard({ project, accent }: { project: Project; accent: Accent }) {
  const a = accents[accent]
  return (
    <article
      className={`flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition hover:-translate-y-1 ${a.hoverBorder}`}
    >
      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed">{project.description}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li key={t} className={`rounded-full px-3 py-1 text-xs font-medium ${a.chip}`}>
            {t}
          </li>
        ))}
      </ul>

      {(project.liveUrl || project.repoUrl) && (
        <div className="mt-5 flex gap-4 text-sm font-medium">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className={`${a.text} hover:underline`}>
              Live demo →
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
              Source code
            </a>
          )}
        </div>
      )}
    </article>
  )
}
