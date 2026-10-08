import { animate } from 'animejs'
import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../lib/motion'

/** Görünür alana girince sayar (anime.js). */
export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(prefersReducedMotion() ? to : 0)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const o = { v: 0 }
        animate(o, { v: to, duration: 2200, ease: 'outExpo', onUpdate: () => setVal(Math.round(o.v)) })
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return (
    <span ref={ref} aria-label={`${to}${suffix}`}>
      <span aria-hidden="true">{val.toLocaleString('tr-TR')}{suffix}</span>
    </span>
  )
}
