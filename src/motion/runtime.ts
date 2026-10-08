import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/** Ortam yetenekleri: cihaz adı veya user-agent değil, gerçek medya sorguları. */
export const Env = {
  reducedMotion: () => matchMedia('(prefers-reduced-motion: reduce)').matches,
  finePointer: () => matchMedia('(hover: hover) and (pointer: fine)').matches,
}

/** Kaydırma hızı: şerit gibi efektler okur. */
export const scrollState = { velocity: 0 }

/** Lenis + ScrollTrigger tek bir yerde senkronlanır. */
export class SmoothScroll {
  private lenis: Lenis | null = null
  private tick = (t: number) => this.lenis?.raf(t * 1000)

  mount(): void {
    if (Env.reducedMotion()) return
    this.lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      // Çekmece, liste kutusu ve diyaloglar kendi içinde kaysın; arkadaki sayfa değil
      prevent: (node) => !!node.closest('[role="dialog"], [role="listbox"], [data-lenis-prevent]'),
    })
    this.lenis.on('scroll', (l: Lenis) => {
      scrollState.velocity = l.velocity
      ScrollTrigger.update()
    })
    gsap.ticker.add(this.tick)
    gsap.ticker.lagSmoothing(0)
    // Sabitleme aralıkları ve is-live sahneleri belge yüksekliğini değiştirir; Lenis sınırını yeniden ölçsün
    ScrollTrigger.addEventListener('refresh', () => this.lenis?.resize())
  }

  resize(): void {
    this.lenis?.resize()
  }

  /** Aynı sayfadaki bir bölüme kay; hedefe odak ver (klavye ve ekran okuyucu). */
  scrollTo(id: string, immediate = false): boolean {
    const el = document.getElementById(id)
    if (!el) return false
    if (this.lenis) this.lenis.scrollTo(el, { offset: -64, duration: 1.6, immediate })
    else el.scrollIntoView({ behavior: immediate || Env.reducedMotion() ? 'auto' : 'smooth' })
    history.replaceState(null, '', `#${id}`)
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
    return true
  }
}

export { gsap, ScrollTrigger }
