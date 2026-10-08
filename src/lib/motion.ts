import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

export const hasFinePointer = () =>
  typeof matchMedia === 'function' && matchMedia('(hover: hover) and (pointer: fine)').matches

export const scroll = { velocity: 0 }
let lenis: Lenis | null = null

export function initSmoothScroll(): () => void {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    // Çekmece, liste kutusu ve iletişim penceresi kendi içinde kaysın; arkadaki sayfa değil
    prevent: (node) => !!node.closest('[role="dialog"], [role="listbox"], [data-lenis-prevent]'),
  })
  lenis.on('scroll', (l: Lenis) => {
    scroll.velocity = l.velocity
    ScrollTrigger.update()
  })
  const tick = (t: number) => lenis?.raf(t * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -64, duration: 1.6 })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  history.replaceState(null, '', `#${id}`)
  // Klavye ve ekran okuyucu kullanıcısı hedef bölüme taşınsın
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

export { gsap, ScrollTrigger }
