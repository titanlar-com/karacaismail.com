import { Effect } from '../Effect'
import { Env, gsap } from '../runtime'

/** Sayfa tepesindeki ilerleme çubuğu. */
export class ScrollProgress extends Effect {
  protected build(): void {
    if (Env.reducedMotion()) return
    gsap.to(this.root, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
  }
}
