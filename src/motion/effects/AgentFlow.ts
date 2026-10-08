import { StickyScene } from '../StickyScene'
import { Env, gsap } from '../runtime'

/**
 * Ajan akışı sahnesi: istek "yazılır", plan belirir, araç çağrıları sırayla çalışıp onaylanır, sonuç gelir.
 * İçerik JSON'dandır ve HTML'de eksiksiz durur; efekt yalnızca sunumu zamanlar. Canlı model çağrısı yoktur.
 */
export class AgentFlow extends StickyScene {
  protected build(): void {
    if (!this.goLive()) return
    const steps = this.$('[data-step]')
    if (!steps.length) return
    gsap.set(steps, { opacity: 0, y: 24 })
    gsap.set('[data-copy]', { opacity: 0, y: 40 })
    const ticks = steps.map((s) => s.querySelector<SVGPathElement>('.tick path'))
    ticks.forEach((t) => { if (t) { t.setAttribute('pathLength', '1'); gsap.set(t, { strokeDasharray: 1, strokeDashoffset: 1 }) } })
    // İstek metni harf harf yazılır
    const prompt = steps[0].querySelector<HTMLElement>('[data-msg]')
    const full = prompt?.textContent ?? ''
    const typed = { n: 0 }

    const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: this.root, start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
    tl.to('[data-copy]', { opacity: 1, y: 0, duration: 0.12 }, 0.02)
    const slot = 0.78 / steps.length
    steps.forEach((s, i) => {
      const at = 0.08 + i * slot
      tl.to(s, { opacity: 1, y: 0, duration: slot * 0.6 }, at)
      if (i === 0 && prompt) {
        tl.to(typed, { n: full.length, duration: slot * 0.9, onUpdate: () => { prompt.textContent = full.slice(0, Math.round(typed.n)) } }, at)
      }
      const t = ticks[i]
      if (t) tl.to(t, { strokeDashoffset: 0, duration: slot * 0.5 }, at + slot * 0.55)
    })
    tl.to('[data-copy], .flow', { opacity: 0, y: -30, duration: 0.1 }, 0.92)
    this.onDestroy(() => { if (prompt) prompt.textContent = full })
  }
}
