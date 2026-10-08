import { StickyScene } from '../StickyScene'
import { Env, gsap } from '../runtime'

/**
 * Boğaz illüstrasyonu: çizgiler çizilir, boyanır, güneş yükselir, katmanlar farklı hızlarda kayar.
 * HTML/SVG tam boyalı halde gelir (JS yoksa da çizim görünür); efekt çizim anını yeniden kurar.
 */
export class Illustration extends StickyScene {
  protected build(): void {
    if (!this.goLive()) return
    const q = <T extends Element>(s: string) => Array.from(this.root.querySelectorAll<T>(s))
    const draw = q<SVGPathElement>('[data-draw]')
    const sun = q('[data-sun]')
    const halo = q('[data-sun-halo]')
    const layer = (n: string) => q(`[data-layer="${n}"]`)
    const birds = q('[data-bird]')

    // Başlangıç: yalnızca çizgi, boya yok; güneş ufkun altında
    gsap.set(draw, { strokeDasharray: 1, strokeDashoffset: 1, fillOpacity: 0 })
    gsap.set([...sun, ...halo], { y: 260, transformOrigin: '50% 50%' })
    gsap.set(layer('stars'), { opacity: 0 })
    gsap.set('[data-copy]', { opacity: 0, y: 40 })

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: this.root, start: 'top top', end: 'bottom bottom', scrub: 0.7 },
    })
    // 0 – 0.3: çizgiler çizilir
    tl.to(draw, { strokeDashoffset: 0, duration: 0.3, stagger: { each: 0.02, from: 'start' } }, 0)
    // 0.28 – 0.5: boya dolar
    tl.to(draw, { fillOpacity: 1, duration: 0.22 }, 0.28)
    tl.to(layer('stars'), { opacity: 1, duration: 0.25 }, 0.25)
    // 0.35 – 1: güneş yükselir, katmanlar derinleşir
    tl.to([...sun, ...halo], { y: -40, duration: 0.65 }, 0.35)
    tl.to(layer('far'), { y: -26, duration: 1 }, 0)
    tl.to(layer('city'), { y: -58, duration: 1 }, 0)
    tl.to(layer('bridge'), { y: -110, duration: 1 }, 0)
    tl.to(layer('boats'), { x: -140, duration: 1 }, 0)
    tl.to('[data-ferry]', { x: 520, duration: 1 }, 0)
    tl.to('[data-sail]', { x: -180, duration: 1 }, 0)
    birds.forEach((b, i) => tl.to(b, { x: 1500 + i * 120, y: -30 - i * 14, duration: 1 }, 0.1 + i * 0.03))
    // metin
    tl.to('[data-copy]', { opacity: 1, y: 0, duration: 0.18 }, 0.4)
  }
}
