import { Effect } from '../Effect'
import { Env, gsap } from '../runtime'

/** Paragrafın kelimeleri kaydırdıkça tek tek belirginleşir; arkadaki şekil paralaks yapar. */
export class WordReveal extends Effect {
  protected build(): void {
    if (Env.reducedMotion()) return
    const words = this.$('[data-w]')
    gsap.set(words, { opacity: 0.14 })
    gsap.to(words, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: this.root, start: 'top 70%', end: 'bottom 55%', scrub: 0.6 } })
    const shape = this.$('[data-shape]')
    if (shape.length) gsap.to(shape, { yPercent: -35, rotate: 40, ease: 'none', scrollTrigger: { trigger: this.root, start: 'top bottom', end: 'bottom top', scrub: true } })
  }
}
