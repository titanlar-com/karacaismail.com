import { Effect } from '../Effect'
import { Env, gsap } from '../runtime'

/** Görünür alana girince yukarı süzülerek belirir. `data-delay` ile gecikme verilebilir. */
export class Reveal extends Effect {
  protected build(): void {
    if (Env.reducedMotion()) return
    gsap.fromTo(this.root, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', delay: Number(this.root.dataset.delay ?? 0), scrollTrigger: { trigger: this.root, start: 'top 88%', once: true } })
  }
}
