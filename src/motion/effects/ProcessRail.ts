import { animate, svg } from 'animejs'
import { Effect } from '../Effect'
import { Env, gsap, ScrollTrigger } from '../runtime'

/** Süreç çizgisi kaydırmayla çizilir (GSAP scrub); her adımın halkası anime.js ile çizilir. */
export class ProcessRail extends Effect {
  protected build(): void {
    if (Env.reducedMotion()) return
    const rail = this.$('[data-rail]')[0]
    if (rail) {
      gsap.set(rail, { strokeDasharray: 1, strokeDashoffset: 1 })
      gsap.to(rail, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: this.$('.steps')[0], start: 'top 70%', end: 'bottom 60%', scrub: 0.5 } })
    }
    this.$('[data-step]').forEach((el) => {
      const body = el.querySelector('[data-body]')
      gsap.from(body, { opacity: 0, y: 40, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } })
      const ring = el.querySelector<SVGCircleElement>('[data-ring]')
      if (!ring) return
      const [d] = svg.createDrawable(ring)
      d.draw = '0 0'
      ScrollTrigger.create({ trigger: el, start: 'top 80%', once: true, onEnter: () => { animate(d, { draw: '0 1', duration: 1100, ease: 'inOutQuad' }) } })
    })
  }
}
