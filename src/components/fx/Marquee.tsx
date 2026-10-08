import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap, prefersReducedMotion, scroll } from '../../lib/motion'
import classes from './Marquee.module.css'

/** Kaydırma hızına tepki veren sonsuz şerit (React Bits "ScrollVelocity" benzeri). */
export function Marquee({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  const track = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const el = track.current
      if (!el || prefersReducedMotion()) return
      let x = 0
      const dir = reverse ? 1 : -1
      const tick = () => {
        const half = el.scrollWidth / 2
        const boost = Math.min(Math.abs(scroll.velocity) * 0.35, 14)
        x += dir * (0.6 + boost)
        if (x <= -half) x += half
        if (x > 0) x -= half
        el.style.transform = `translate3d(${x}px,0,0)`
      }
      gsap.ticker.add(tick)
      return () => gsap.ticker.remove(tick)
    },
    { scope: track },
  )
  const list = [...items, ...items]
  return (
    <div className={classes.root} aria-hidden="true">
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
