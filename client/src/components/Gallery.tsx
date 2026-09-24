import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Photo } from '../data/portfolio'
import useInView from '../hooks/useInView'
import { accents, type Accent } from './accents'

// Photo grid with category filters. Clicking a photo opens a full-screen
// viewer that supports arrow keys, Esc, and the on-screen buttons.
export default function Gallery({ photos, accent }: { photos: Photo[]; accent: Accent }) {
  const [filter, setFilter] = useState('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const categories = ['All', ...new Set(photos.map((p) => p.category))]
  const visible = filter === 'All' ? photos : photos.filter((p) => p.category === filter)

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              filter === c ? accents[accent].chip : 'border border-slate-800 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* CSS columns give a masonry layout that keeps each photo's shape */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {visible.map((photo, i) => (
          <GalleryItem key={photo.src} photo={photo} delay={(i % 3) * 120} onOpen={() => setOpenIndex(i)} />
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox photos={visible} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
      )}
    </>
  )
}

// One photo in the grid. It "develops" like a darkroom print when scrolled
// into view: starting grey, soft and slightly small, then sharpening into colour.
function GalleryItem({ photo, delay, onOpen }: { photo: Photo; delay: number; onOpen: () => void }) {
  const [ref, inView] = useInView<HTMLButtonElement>()

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative mb-4 block w-full overflow-hidden rounded-xl break-inside-avoid transition-[opacity,scale,filter] duration-1200 ease-out ${
        inView ? '' : 'scale-95 opacity-40 blur-sm grayscale'
      }`}
    >
      <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" className="h-auto w-full transition duration-300 group-hover:scale-105" />
      {photo.caption && (
        <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 text-left text-sm text-white opacity-0 transition group-hover:opacity-100">
          {photo.caption}
        </span>
      )}
    </button>
  )
}

type LightboxProps = {
  photos: Photo[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}

function Lightbox({ photos, index, onChange, onClose }: LightboxProps) {
  const photo = photos[index]
  const prev = () => onChange((index - 1 + photos.length) % photos.length)
  const next = () => onChange((index + 1) % photos.length)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onChange((index - 1 + photos.length) % photos.length)
      if (e.key === 'ArrowRight') onChange((index + 1) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    // Stop the page behind from scrolling while the viewer is open.
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, photos.length, onChange, onClose])

  const navButton = 'absolute top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20'

  // Rendered straight into <body> so no animated parent can affect its positioning.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt={photo.alt} className="max-h-[80vh] w-auto rounded-lg object-contain" />
        <figcaption className="mt-3 flex justify-between gap-4 text-sm text-slate-300">
          <span>{photo.caption ?? photo.alt}</span>
          <span className="text-slate-500">
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </figure>

      <button type="button" aria-label="Close" onClick={onClose} className="absolute top-4 right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      {photos.length > 1 && (
        <>
          <button type="button" aria-label="Previous photo" onClick={(e) => (e.stopPropagation(), prev())} className={`${navButton} left-4`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button type="button" aria-label="Next photo" onClick={(e) => (e.stopPropagation(), next())} className={`${navButton} right-4`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </div>,
    document.body,
  )
}
