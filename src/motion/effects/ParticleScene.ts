import { Effect } from '../Effect'
import { Env, ScrollTrigger } from '../runtime'
import { PointFactory, type Pt } from '../particles'

const COLOR_TOKENS = ['--c-ember', '--c-gold', '--c-bone', '--c-tide'] as const
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

interface Particle { sx: number; sy: number; d: number; swirl: number; color: number; size: number; ph: number }

/**
 * Kaydırmayla bağlantılı parçacık sahnesi: bulut dağılır, kelimelere (`data-words`) toplanır.
 * Sahne yüksek bir bölümde `position: sticky`; ilerleme ScrollTrigger'dan okunur.
 * Metinler HTML'de gerçek içerik olarak durur; tuval yalnızca görsel katmandır.
 */
export class ParticleScene extends Effect {
  private canvas!: HTMLCanvasElement
  private ctx2d!: CanvasRenderingContext2D
  private w = 0
  private h = 0
  private dpr = 1
  private targets: Pt[][] = []
  private parts: Particle[] = []
  private colors: string[] = COLOR_TOKENS.map(() => '#fff')
  private progress = 0
  private shown = 0
  private visible = false
  private dead = false
  private builtW = 0
  private raf = 0
  private prev = 0
  private lastStage = -1
  private readonly ptr = { x: -9999, y: -9999 }

  protected build(): void {
    const cv = this.root.querySelector<HTMLCanvasElement>('canvas')
    const ctx = cv?.getContext('2d')
    if (!cv || !ctx || Env.reducedMotion()) return
    this.canvas = cv
    this.ctx2d = ctx
    const words: string[] = JSON.parse(this.root.dataset.words ?? '[]')
    if (!words.length) return
    const fine = Env.finePointer()

    let timer = 0
    const rebuild = () => {
      // Mobil adres çubuğu yüksekliği değiştirir; yalnızca genişlik değişince yeniden kur
      if (this.builtW && Math.floor(cv.getBoundingClientRect().width) === this.builtW) return
      window.clearTimeout(timer)
      timer = window.setTimeout(() => this.setup(words), 200)
    }
    const ro = new ResizeObserver(rebuild)
    ro.observe(cv)
    const io = new IntersectionObserver(([e]) => { this.visible = e.isIntersecting }, { rootMargin: '10% 0px' })
    io.observe(this.root)
    const st = ScrollTrigger.create({ trigger: this.root, start: 'top top', end: 'bottom bottom', onUpdate: (s) => { this.progress = s.progress } })
    const onMove = (e: PointerEvent) => {
      if (!fine) return
      const r = cv.getBoundingClientRect()
      this.ptr.x = e.clientX - r.left
      this.ptr.y = e.clientY - r.top
    }
    const onLeave = () => { this.ptr.x = this.ptr.y = -9999 }
    cv.addEventListener('pointermove', onMove)
    cv.addEventListener('pointerleave', onLeave)

    // Yazı tipi yüklenemese bile sahne yedek yazı tipiyle kurulur; sahne yalnızca kurulum başarılıysa etkinleşir
    const ready = document.fonts.load("800 100px 'Outfit Variable'").then(() => document.fonts.ready).catch(() => undefined)
    this.pending = ready.then(() => {
      if (this.dead) return
      this.setup(words)
      if (!this.targets.length) return
      this.root.classList.add('is-live')
      ScrollTrigger.refresh() // is-live bölüm yüksekliğini değiştirir
      this.raf = requestAnimationFrame(this.draw)
    })

    this.onDestroy(() => {
      this.dead = true
      cancelAnimationFrame(this.raf)
      window.clearTimeout(timer)
      ro.disconnect(); io.disconnect(); st.kill()
      cv.removeEventListener('pointermove', onMove)
      cv.removeEventListener('pointerleave', onLeave)
      this.root.classList.remove('is-live')
    })
  }

  private setup(words: string[]): void {
    if (this.dead) return
    const rect = this.canvas.getBoundingClientRect()
    this.w = Math.max(1, Math.floor(rect.width))
    this.h = Math.max(1, Math.floor(rect.height))
    this.builtW = this.w
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.canvas.width = Math.floor(this.w * this.dpr)
    this.canvas.height = Math.floor(this.h * this.dpr)
    const css = getComputedStyle(document.documentElement)
    this.colors = COLOR_TOKENS.map((t) => css.getPropertyValue(t).trim() || '#fff')
    const n = Math.round(clamp((this.w * this.h) / 260, 1100, 4200))
    const family = css.getPropertyValue('--font-display').trim() || 'sans-serif'
    const f = new PointFactory(this.w, this.h, n, family)
    this.targets = [f.cloud(), ...words.map((w) => f.text(w))]
    this.parts = Array.from({ length: n }, (_, i) => {
      const ang = Math.random() * Math.PI * 2
      const mag = (0.35 + Math.random() * 0.65) * Math.min(this.w, this.h) * 0.7
      return {
        sx: Math.cos(ang) * mag, sy: Math.sin(ang) * mag, d: Math.random(), swirl: (Math.random() - 0.5) * 2.4,
        color: Math.floor((i / n) * this.colors.length + Math.random() * 0.9) % this.colors.length,
        size: 1.4 + Math.random() * 1.6, ph: Math.random() * Math.PI * 2,
      }
    })
  }

  private draw = (time: number): void => {
    this.raf = requestAnimationFrame(this.draw)
    if (!this.visible || this.targets.length < 2) return
    const dt = Math.min(0.1, (time - this.prev) / 1000 || 0.016)
    this.prev = time
    this.shown += (this.progress - this.shown) * (1 - Math.exp(-dt * 7))
    const s = clamp(this.shown) * (this.targets.length - 1)
    const a = Math.min(Math.floor(s), this.targets.length - 2)
    const t = s - a
    const stage = Math.round(s)
    if (stage !== this.lastStage) { this.lastStage = stage; this.root.dataset.stage = String(stage) }

    const { ctx2d: ctx, w, h, parts, colors } = this
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    const A = this.targets[a], B = this.targets[a + 1]
    const cx = w / 2, cy = h / 2
    const sec = time * 0.001
    const { x: px, y: py } = this.ptr
    for (let c = 0; c < colors.length; c++) {
      ctx.fillStyle = colors[c]
      ctx.globalAlpha = c === 2 ? 0.85 : 1
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        if (p.color !== c) continue
        // parçacığa özgü gecikme: önce dağılır, sonra toplanır
        const lt = ease(clamp((t - 0.28 - p.d * 0.22) / 0.5))
        const burst = Math.sin(clamp((t - 0.2) / 0.7) * Math.PI)
        let x = A[i].x + (B[i].x - A[i].x) * lt
        let y = A[i].y + (B[i].y - A[i].y) * lt
        if (burst > 0) {
          const ang = p.swirl * burst
          const dx = x - cx, dy = y - cy
          x = cx + dx * Math.cos(ang) - dy * Math.sin(ang) + p.sx * burst * 0.9
          y = cy + dx * Math.sin(ang) + dy * Math.cos(ang) + p.sy * burst * 0.9
        }
        x += Math.sin(sec * 1.3 + p.ph) * 0.8
        y += Math.cos(sec * 1.1 + p.ph) * 0.8
        const ddx = x - px, ddy = y - py
        const d2 = ddx * ddx + ddy * ddy
        if (d2 < 9000) {
          const f = (1 - d2 / 9000) * 26
          const d = Math.sqrt(d2) || 1
          x += (ddx / d) * f
          y += (ddy / d) * f
        }
        ctx.fillRect(x - p.size / 2, y - p.size / 2, p.size, p.size)
      }
    }
    ctx.globalAlpha = 1
  }
}
