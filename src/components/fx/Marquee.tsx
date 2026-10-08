import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap, prefersReducedMotion, scroll } from '../../lib/motion'
import classes from './Marquee.module.css'

/** Kaydırma hızına tepki veren sonsuz şerit (React Bits "ScrollVelocity" benzeri). */
export function Marquee({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const el = track.current
      const box = root.current
      if (!el || !box || prefersReducedMotion()) return
      let x = 0
      let half = el.scrollWidth / 2
      let visible = true
      const dir = reverse ? 1 : -1
      const ro = new ResizeObserver(() => { half = el.scrollWidth / 2 })
      ro.observe(el)
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
      io.observe(box)
      const tick = () => {
        if (!visible || half <= 0) return
        const boost = Math.min(Math.abs(scroll.velocity) * 0.35, 14)
        x += dir * (0.6 + boost) * gsap.ticker.deltaRatio(60)
        if (x <= -half) x += half
        if (x > 0) x -= half
        el.style.transform = `translate3d(${x}px,0,0)`
      }
      gsap.ticker.add(tick)
      return () => { gsap.ticker.remove(tick); ro.disconnect(); io.disconnect() }
    },
    { scope: root },
  )
  const list = [...items, ...items]
  return (
    <div ref={root} className={classes.root} aria-hidden="true">
      <div ref={track} className={classes.track}>
        {list.map((t, i) => (
          <span key={i} className={classes.item}>
            {t}
            <i className={classes.dot} />
          </span>
        ))}
      </div>
    </div>
  )
}
