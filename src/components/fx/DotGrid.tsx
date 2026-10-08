import { animate, stagger } from 'animejs'
import { useCallback, useEffect, useRef, useState } from 'react'
import { hasFinePointer, prefersReducedMotion } from '../../lib/motion'
import classes from './DotGrid.module.css'

const CELL = 44

/** anime.js ızgara dalgası: yüklenirken, tıklanırken ve imleç gezerken noktalar dalgalanır. */
export function DotGrid() {
  const root = useRef<HTMLDivElement>(null)
  const [dim, setDim] = useState({ cols: 0, rows: 0 })
  const last = useRef(0)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      let cols = Math.max(4, Math.floor(r.width / CELL))
      let rows = Math.max(3, Math.floor(r.height / CELL))
      while (cols * rows > 520) { cols--; rows = Math.max(3, Math.floor(rows * 0.92)) }
      setDim((d) => (d.cols === cols && d.rows === rows ? d : { cols, rows }))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const wave = useCallback((from: number, strong = false) => {
    if (prefersReducedMotion() || !root.current || !dim.cols) return
    animate(root.current.querySelectorAll('i'), {
      scale: [{ to: strong ? 2.6 : 1.9, ease: 'outQuad', duration: 200 }, { to: 1, ease: 'outElastic(1, .6)', duration: 700 }],
      opacity: [{ to: 1, duration: 200 }, { to: 0.32, duration: 700 }],
      delay: stagger(strong ? 26 : 38, { grid: [dim.cols, dim.rows], from }),
    })
  }, [dim])

  useEffect(() => {
    if (!dim.cols) return
    wave(Math.floor((dim.cols * dim.rows) / 2), true)
  }, [dim.cols, dim.rows, wave])

  const indexAt = (e: React.PointerEvent) => {
    const r = root.current!.getBoundingClientRect()
    const c = Math.min(dim.cols - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * dim.cols)))
    const rw = Math.min(dim.rows - 1, Math.max(0, Math.floor(((e.clientY - r.top) / r.height) * dim.rows)))
    return rw * dim.cols + c
  }

  return (
    <div
      ref={root}
      className={classes.grid}
      style={{ gridTemplateColumns: `repeat(${dim.cols || 1}, 1fr)`, gridTemplateRows: `repeat(${dim.rows || 1}, 1fr)` }}
      onPointerDown={(e) => wave(indexAt(e), true)}
      onPointerMove={(e) => {
        if (!hasFinePointer()) return
        const now = performance.now()
        if (now - last.current < 450) return
        last.current = now
        wave(indexAt(e))
      }}
      aria-hidden="true"
    >
      {Array.from({ length: dim.cols * dim.rows }, (_, i) => <i key={i} />)}
    </div>
  )
}
