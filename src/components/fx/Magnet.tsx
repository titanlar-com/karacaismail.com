import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, hasFinePointer, prefersReducedMotion } from '../../lib/motion'

/** İmleç yaklaştıkça içeriği kendine çeker (React Bits "Magnet" deseni). Dokunmatikte devre dışı. */
export function Magnet({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !hasFinePointer() || prefersReducedMotion()) return
    const qx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const qy = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      if (Math.hypot(dx, dy) < Math.max(r.width, r.height) * 1.1) {
        qx(dx * strength)
        qy(dy * strength)
      } else {
        qx(0)
        qy(0)
      }
    }
    const leave = () => { qx(0); qy(0) }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [strength])
  return <span ref={ref} style={{ display: 'inline-block' }}>{children}</span>
}
