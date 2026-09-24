import type { Video } from '../data/portfolio'

// Shows a YouTube/Vimeo embed or a self-hosted video file, in a 16:9 frame.
export default function VideoCard({ video }: { video: Video }) {
  const frame = 'aspect-video w-full rounded-t-xl bg-black'

  let player
  if (video.youtubeId) {
    player = (
      <iframe
        className={frame}
        src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
        title={video.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  } else if (video.vimeoId) {
    player = (
      <iframe
        className={frame}
        src={`https://player.vimeo.com/video/${video.vimeoId}`}
        title={video.title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    )
  } else if (video.src) {
    player = <video className={frame} src={video.src} poster={video.poster} controls preload="metadata" />
  }

  return (
    <article className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
      {player}
      <div className="p-5">
        <h3 className="font-semibold text-white">{video.title}</h3>
        {video.description && <p className="mt-2 text-sm leading-relaxed">{video.description}</p>}
      </div>
    </article>
  )
}
