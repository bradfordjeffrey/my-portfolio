import { useEffect, useRef } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const LINK_DISTANCE = 130 // px: dots closer than this get joined by a line
const MOUSE_DISTANCE = 180 // px: dots within this range connect to the cursor

type Dot = { x: number; y: number; vx: number; vy: number }

// "Data network" background: slowly drifting dots joined by faint lines,
// which also connect to the mouse cursor. Pauses when scrolled out of view.
export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let dots: Dot[] = []
    let frame = 0
    const mouse = { x: -9999, y: -9999 }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas!.clientWidth
      height = canvas!.clientHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Fewer dots on small screens keeps it light on phones.
      const count = Math.min(90, Math.floor((width * height) / 14000))
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }))
      draw()
    }

    function step() {
      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > width) d.vx *= -1
        if (d.y < 0 || d.y > height) d.vy *= -1
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i]
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < LINK_DISTANCE) {
            ctx!.strokeStyle = `rgb(148 163 184 / ${(1 - dist / LINK_DISTANCE) * 0.18})`
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
        const toMouse = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (toMouse < MOUSE_DISTANCE) {
          ctx!.strokeStyle = `rgb(56 189 248 / ${(1 - toMouse / MOUSE_DISTANCE) * 0.5})`
          ctx!.beginPath()
          ctx!.moveTo(a.x, a.y)
          ctx!.lineTo(mouse.x, mouse.y)
          ctx!.stroke()
        }
        ctx!.fillStyle = 'rgb(148 163 184 / 0.5)'
        ctx!.beginPath()
        ctx!.arc(a.x, a.y, 1.5, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function loop() {
      step()
      draw()
      frame = requestAnimationFrame(loop)
    }
    const start = () => {
      if (!frame && !reduced) frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      if (reduced) draw()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    const viewObserver = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    viewObserver.observe(canvas)
    window.addEventListener('pointermove', onPointerMove)

    return () => {
      stop()
      resizeObserver.disconnect()
      viewObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [reduced])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}
