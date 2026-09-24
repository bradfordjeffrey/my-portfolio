// Entrance effects for items inside a <Stagger> container (see Stagger.tsx).

const base = 'transition-[opacity,translate,scale,filter,clip-path] duration-700 ease-out'

// Class names are written out in full because Tailwind only generates
// classes it can find as complete strings in the source code.
export const stagger = {
  // Slides in from the left
  slide: `${base} -translate-x-6 opacity-0 group-data-[shown]/stagger:translate-x-0 group-data-[shown]/stagger:opacity-100`,
  // Grows from small to full size
  pop: `${base} scale-75 opacity-0 group-data-[shown]/stagger:scale-100 group-data-[shown]/stagger:opacity-100`,
  // Revealed from left to right, like a wipe
  wipe: `${base} [clip-path:inset(0_100%_0_0)] group-data-[shown]/stagger:[clip-path:inset(0_0_0_0)]`,
  // Comes into focus from a blur
  focus: `${base} translate-y-4 opacity-0 blur-md group-data-[shown]/stagger:translate-y-0 group-data-[shown]/stagger:opacity-100 group-data-[shown]/stagger:blur-none`,
}

export const staggerDelay = (index: number, step = 80, start = 0) => ({
  transitionDelay: `${start + index * step}ms`,
})
