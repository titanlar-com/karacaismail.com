import { animate, stagger } from 'animejs'
import { Effect } from '../Effect'
import { Env } from '../runtime'

const CELL = 44

/** anime.js ızgara dalgası: yüklenirken, dokununca ve imleç gezerken noktalar dalgalanır. */
export class DotGrid extends Effect {
  private cols = 0
  private rows = 0
  private last = 0

  protected build(): void {
    this.measure()
    const ro = new ResizeObserver(() => this.measure())
    ro.observe(this.root)
    this.onDestroy(() => ro.disconnect())

    const down = (e: PointerEvent) => this.wave(this.indexAt(e), true)
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const now = performance.now()
      if (now - this.last < 450) return
      this.last = now
      this.wave(this.indexAt(e))
    }
    // Üstteki içerik tıklamayı yuttuğundan dinleyiciler bölüme bağlanır
    const host = this.root.parentElement ?? this.root
    host.addEventListener('pointerdown', down)
    host.addEventListener('pointermove', move)
    this.onDestroy(() => { host.removeEventListener('pointerdown', down); host.removeEventListener('pointermove', move) })
    this.wave(Math.floor((this.cols * this.rows) / 2), true)
  }

  private measure(): void {
    const r = this.root.getBoundingClientRect()
    let cols = Math.max(4, Math.floor(r.width / CELL))
    let rows = Math.max(3, Math.floor(r.height / CELL))
    while (cols * rows > 520) { cols--; rows = Math.max(3, Math.floor(rows * 0.92)) }
    if (cols === this.cols && rows === this.rows) return
    this.cols = cols
    this.rows = rows
    this.root.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
    this.root.style.gridTemplateRows = `repeat(${rows}, 1fr)`
    this.root.replaceChildren(...Array.from({ length: cols * rows }, () => document.createElement('i')))
  }

  private indexAt(e: PointerEvent): number {
    const r = this.root.getBoundingClientRect()
    const c = Math.min(this.cols - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * this.cols)))
    const rw = Math.min(this.rows - 1, Math.max(0, Math.floor(((e.clientY - r.top) / r.height) * this.rows)))
    return rw * this.cols + c
  }

  private wave(from: number, strong = false): void {
    if (Env.reducedMotion() || !this.cols) return
    animate(this.root.querySelectorAll('i'), {
      scale: [{ to: strong ? 2.6 : 1.9, ease: 'outQuad', duration: 200 }, { to: 1, ease: 'outElastic(1, .6)', duration: 700 }],
      opacity: [{ to: 1, duration: 200 }, { to: 0.32, duration: 700 }],
      delay: stagger(strong ? 26 : 38, { grid: [this.cols, this.rows], from }),
    })
  }
}
