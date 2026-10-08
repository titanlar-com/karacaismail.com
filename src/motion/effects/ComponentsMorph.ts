import { StickyScene } from '../StickyScene'
import { Env, gsap } from '../runtime'

/**
 * Dağınık arayüz parçaları, kaydırdıkça ızgaraya oturur; hizalama kılavuzları belirip kaybolur;
 * en sonda parçalar yukarı süzülüp dağılır (bir sonraki sahneye geçiş).
 */
export class ComponentsMorph extends StickyScene {
  protected build(): void {
    if (!this.goLive()) return
    const tiles = this.$('[data-tile]').filter((t) => getComputedStyle(t).display !== 'none')
    if (!tiles.length) return
    const w = window.innerWidth
    const spread = Math.min(w, 1100)
    // Deterministik dağılım: aynı parça her seferinde aynı yerden gelir
    const hash = (i: number, k: number) => { const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x) }
    tiles.forEach((t, i) => {
      gsap.set(t, {
        x: (hash(i, 1) - 0.5) * spread * 0.9,
        y: (hash(i, 2) - 0.5) * window.innerHeight * 0.9,
        rotate: (hash(i, 3) - 0.5) * 50,
        scale: 0.55 + hash(i, 4) * 0.3,
        opacity: 0.18,
      })
    })
    gsap.set('[data-copy]', { opacity: 0, y: 40 })
    const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: this.root, start: 'top top', end: 'bottom bottom', scrub: 0.7 } })
    tl.to('[data-copy]', { opacity: 1, y: 0, duration: 0.15 }, 0.02)
    tl.to(tiles, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: { each: 0.025, from: 'random' } }, 0.05)
    tl.to('[data-guide]', { opacity: 1, duration: 0.1 }, 0.5)
    tl.to(this.$('.guides'), { opacity: 0.7, duration: 0.1 }, 0.5)
    tl.to(this.$('.guides'), { opacity: 0, duration: 0.1 }, 0.66)
    // çıkış: parçalar yukarı süzülür
    tiles.forEach((t, i) => tl.to(t, { y: -120 - hash(i, 5) * 160, x: (hash(i, 6) - 0.5) * 240, rotate: (hash(i, 7) - 0.5) * 30, opacity: 0, duration: 0.2 }, 0.82 + (i % 4) * 0.01))
    tl.to('[data-copy]', { opacity: 0, y: -30, duration: 0.12 }, 0.86)
  }
}
