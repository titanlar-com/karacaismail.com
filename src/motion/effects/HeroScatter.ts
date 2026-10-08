import { Effect } from '../Effect'
import { Env, gsap } from '../runtime'

/** Aşağı kaydırdıkça başlığın harfleri dağılır; yukarı dönünce toparlanır. */
export class HeroScatter extends Effect {
  protected build(): void {
    if (Env.reducedMotion()) return
    const chars = this.$('.c')
    if (!chars.length) return
    // Giriş animasyonu bitince harflerin kutudan çıkmasına izin ver
    const intro = Math.max(...chars.map((c) => parseFloat(c.style.getPropertyValue('--d')) || 0)) + 1.1
    const timer = window.setTimeout(() => this.root.classList.add('is-scattering'), intro * 1000)
    this.onDestroy(() => window.clearTimeout(timer))
    const tl = gsap.timeline({ scrollTrigger: { trigger: this.root, start: 'top top', end: 'bottom 20%', scrub: 0.6 } })
    chars.forEach((c, i) => {
      const a = (i * 137.5 * Math.PI) / 180
      tl.to(c, { x: Math.cos(a) * (120 + (i % 7) * 60), y: Math.sin(a) * (80 + (i % 5) * 50) - 120, skewX: ((i % 9) - 4) * 8, scale: 0.6 + (i % 4) * 0.2, ease: 'none', immediateRender: false }, 0)
    })
    const fade = this.$('[data-hero-fade]')
    if (fade.length) tl.to(fade, { opacity: 0, ease: 'none' }, 0.1)
  }
}
