import { Effect } from '../Effect'
import { Env, gsap, scrollState } from '../runtime'

/** Kaydırma hızına tepki veren sonsuz şerit. `data-reverse` ile ters yön. */
export class Marquee extends Effect {
  protected build(): void {
    const track = this.root.querySelector<HTMLElement>('[data-track]')
    if (!track || Env.reducedMotion()) return
    let x = 0
    let half = track.scrollWidth / 2
    let visible = true
    const dir = this.root.hasAttribute('data-reverse') ? 1 : -1
    const t0 = performance.now()
    const ro = new ResizeObserver(() => { half = track.scrollWidth / 2 })
    ro.observe(track)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(this.root)
    const tick = () => {
      if (!visible || half <= 0) return
      const boost = Math.min(Math.abs(scrollState.velocity) * 0.35, 14)
      // Kendiliğinden akış ilk 8 saniye sürer, sonra yalnızca kaydırmaya tepki verir (otomatik hareketi durdurma ilkesi)
      const idle = Math.max(0, 1 - (performance.now() - t0 - 8000) / 2000)
      x += dir * (0.6 * Math.min(1, idle) + boost) * gsap.ticker.deltaRatio(60)
      if (x <= -half) x += half
      if (x > 0) x -= half
      track.style.transform = `translate3d(${x}px,0,0)`
    }
    gsap.ticker.add(tick)
    this.onDestroy(() => { gsap.ticker.remove(tick); ro.disconnect(); io.disconnect() })
  }
}
