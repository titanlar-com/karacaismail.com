import { Effect } from '../Effect'
import { Env, gsap } from '../runtime'

/** İmleç yaklaştıkça öğeyi kendine çeker (React Bits "Magnet" deseni). Yalnızca fare. */
export class Magnet extends Effect {
  constructor(root: HTMLElement, private readonly strength = 0.35) { super(root) }

  protected build(): void {
    if (!Env.finePointer() || Env.reducedMotion()) return
    const el = this.root
    const prevDisplay = el.style.display
    el.style.display = 'inline-block'
    const qx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const qy = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      if (Math.hypot(dx, dy) < Math.max(r.width, r.height) * 1.1) { qx(dx * this.strength); qy(dy * this.strength) }
      else { qx(0); qy(0) }
    }
    const leave = () => { qx(0); qy(0) }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    this.onDestroy(() => { el.style.display = prevDisplay; window.removeEventListener('pointermove', move); document.documentElement.removeEventListener('mouseleave', leave) })
  }
}
