import { animate } from 'animejs'
import { Effect } from '../Effect'
import { Env } from '../runtime'

/** Görünür alana girince sayar (anime.js). Gerçek değer `data-to`, son metin DOM'da zaten durur. */
export class CountUp extends Effect {
  protected build(): void {
    if (Env.reducedMotion()) return
    const to = Number(this.root.dataset.to)
    const suffix = this.root.dataset.suffix ?? ''
    const out = this.root.querySelector<HTMLElement>('[data-out]')
    if (!out || Number.isNaN(to)) return
    out.textContent = `0${suffix}`
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const o = { v: 0 }
      animate(o, { v: to, duration: 2200, ease: 'outExpo', onUpdate: () => { out.textContent = `${Math.round(o.v).toLocaleString('tr-TR')}${suffix}` } })
    }, { threshold: 0.6 })
    io.observe(this.root)
    this.onDestroy(() => io.disconnect())
  }
}
