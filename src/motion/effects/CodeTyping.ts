import { Effect } from '../Effect'
import { Env, gsap } from '../runtime'

/**
 * Kod satır satır "yazılır" (kaydırma ilerledikçe), imleç aktif satırı izler;
 * ardından doğrulama adımları sırayla onaylanır (anime.js yerine saf GSAP: halka çizilir, işaret çıkar).
 */
export class CodeTyping extends Effect {
  protected build(): void {
    if (Env.reducedMotion()) return
    const lines = this.$('.line')
    const checks = this.$('[data-check]')
    const caret = this.$('[data-caret]')[0]
    const box = this.$('.code')[0]
    if (!lines.length) return

    gsap.set(lines, { clipPath: 'inset(0 100% 0 0)', opacity: 0.2 })
    gsap.set(checks, { opacity: 0.25 })
    gsap.set('[data-copy]', { opacity: 0, y: 40 })
    checks.forEach((c) => {
      const path = c.querySelector('path') as SVGPathElement | null
      path?.setAttribute('pathLength', '1')
      if (path) gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 })
    })

    const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: this.root, start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
    tl.to('[data-copy]', { opacity: 1, y: 0, duration: 0.12 }, 0.02)
    const span = 0.62 / lines.length
    lines.forEach((ln, i) => {
      tl.to(ln, {
        clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: span * 1.4,
        onUpdate: () => this.placeCaret(caret, box, ln),
      }, 0.08 + i * span)
    })
    checks.forEach((c, i) => {
      const path = c.querySelector('path')
      tl.to(c, { opacity: 1, duration: 0.06 }, 0.72 + i * 0.05)
      if (path) tl.to(path, { strokeDashoffset: 0, duration: 0.06 }, 0.72 + i * 0.05)
    })
    tl.to(caret, { opacity: 0, duration: 0.02 }, 0.7)
    tl.to('[data-copy], .editor', { opacity: 0, y: -30, duration: 0.1 }, 0.92)
  }

  private placeCaret(caret: HTMLElement | undefined, box: HTMLElement | undefined, line: HTMLElement) {
    if (!caret || !box) return
    const b = box.getBoundingClientRect()
    const l = line.getBoundingClientRect()
    caret.style.opacity = '1'
    caret.style.top = `${l.top - b.top + box.scrollTop + 4}px`
    caret.style.left = `${Math.min(l.width, box.clientWidth - 20) + 16}px`
  }
}
