import { toolbelt } from '../data/portfolio'

// Endless scrolling strip of tools. The list is rendered twice and slid left
// by half its width, so the loop is seamless. Hovering pauses it.
export default function SkillsMarquee() {
  return (
    <div
      className="group overflow-hidden border-y border-slate-800/80 bg-slate-900/30 py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      aria-label={`Tools I use: ${toolbelt.join(', ')}`}
    >
      <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {[...toolbelt, ...toolbelt].map((tool, i) => (
          <li
            key={i}
            aria-hidden="true"
            className="flex items-center pr-10 text-sm font-medium tracking-wide whitespace-nowrap text-slate-400"
          >
            <span className="mr-10 h-1.5 w-1.5 rounded-full bg-sky-400/60" />
            {tool}
          </li>
        ))}
      </ul>
    </div>
  )
}
