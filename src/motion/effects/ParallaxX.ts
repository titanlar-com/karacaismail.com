import { Effect } from '../Effect'
import { Env, gsap } from '../runtime'

/** Alt bilgideki dev yazı: kaydırdıkça yatayda kayar. */
export class ParallaxX extends Effect {
  protected build(): void {
    if (Env.reducedMotion()) return
    gsap.fromTo(this.root, { xPercent: 8 }, { xPercent: -8, ease: 'none', scrollTrigger: { trigger: this.root.parentElement, start: 'top bottom', end: 'bottom bottom', scrub: true } })
  }
}
