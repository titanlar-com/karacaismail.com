import { useEffect, useRef, useState } from 'react'
import { STAGES } from '../data/site'
import { cloudPoints, textPoints, type Pt } from '../lib/particles'
import { ScrollTrigger, prefersReducedMotion, hasFinePointer } from '../lib/motion'
import classes from './ParticleScene.module.css'

const COLOR_TOKENS = ['--c-ember', '--c-gold', '--c-bone', '--c-tide'] as const
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

type Particle = { sx: number; sy: number; d: number; swirl: number; color: number; size: number; ph: number }

/**
 * Kaydırmayla bağlantılı parçacık sahnesi: bulut dağılır, kelimelere (STRATEJİ, MİMARİ, KOD, SONUÇ) toplanır.
 * Bölüm yüksek, içindeki sahne `position: sticky`. İlerleme ScrollTrigger'dan okunur.
 */
export function ParticleScene() {
  const section = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState(0)
  const [reduced] = useState(prefersReducedMotion)

  useEffect(() => {
    const sec = section.current
    const cv = canvas.current
    if (!sec || !cv || reduced) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, dpr = 1
    let targets: Pt[][] = []
    let parts: Particle[] = []
    let progress = 0
    let shown = 0
    let visible = false
    let raf = 0
    let lastStage = 0
    let dead = false
    let builtW = 0
    let colors: string[] = COLOR_TOKENS.map(() => '#fff')
    let prev = 0
    const ptr = { x: -9999, y: -9999 }
    const fine = hasFinePointer()

    const build = () => {
      if (dead) return
      const rect = cv.getBoundingClientRect()
      w = Math.max(1, Math.floor(rect.width))
      const css = getComputedStyle(document.documentElement)
      colors = COLOR_TOKENS.map((t) => css.getPropertyValue(t).trim() || '#fff')
      builtW = w
      h = Math.max(1, Math.floor(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.floor(w * dpr)
      cv.height = Math.floor(h * dpr)
      const n = Math.round(clamp((w * h) / 260, 1100, 4200))
      const family = getComputedStyle(document.body).getPropertyValue('--font-display') || 'sans-serif'
      targets = [cloudPoints(w, h, n), ...STAGES.map((s) => textPoints(s.word, w, h, n, family))]
      parts = Array.from({ length: n }, (_, i) => {
        const ang = Math.random() * Math.PI * 2
        const mag = (0.35 + Math.random() * 0.65) * Math.min(w, h) * 0.7
        return {
          sx: Math.cos(ang) * mag,
          sy: Math.sin(ang) * mag,
          d: Math.random(),
          swirl: (Math.random() - 0.5) * 2.4,
          color: Math.floor((i / n) * colors.length + Math.random() * 0.9) % colors.length,
          size: 1.4 + Math.random() * 1.6,
          ph: Math.random() * Math.PI * 2,
        }
      })
    }

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw)
      if (!visible) return
      const dt = Math.min(0.1, (time - prev) / 1000 || 0.016)
      prev = time
      shown += (progress - shown) * (1 - Math.exp(-dt * 7))
      const s = clamp(shown) * (targets.length - 1)
      const a = Math.min(Math.floor(s), targets.length - 2)
      const t = s - a
      const stageNow = Math.round(s)
      if (stageNow !== lastStage) { lastStage = stageNow; setActive(stageNow) }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const A = targets[a], B = targets[a + 1]
      const cx = w / 2, cy = h / 2
      const sec = time * 0.001
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
          if (fine) {
            const ddx = x - ptr.x, ddy = y - ptr.y
            const d2 = ddx * ddx + ddy * ddy
            if (d2 < 9000) {
              const f = (1 - d2 / 9000) * 26
              const d = Math.sqrt(d2) || 1
              x += (ddx / d) * f
              y += (ddy / d) * f
            }
          }
          ctx.fillRect(x - p.size / 2, y - p.size / 2, p.size, p.size)
        }
      }
      ctx.globalAlpha = 1
    }

    let timer = 0
    const rebuild = () => {
      // Mobil adres çubuğu yüksekliği değiştirir; yalnızca genişlik değişince yeniden kur
      if (builtW && Math.floor(cv.getBoundingClientRect().width) === builtW) return
      window.clearTimeout(timer)
      timer = window.setTimeout(build, 200)
    }
    const ro = new ResizeObserver(rebuild)
    ro.observe(cv)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { rootMargin: '10% 0px' })
    io.observe(sec)
    const st = ScrollTrigger.create({
      trigger: sec,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => { progress = self.progress },
    })
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      ptr.x = e.clientX - r.left
      ptr.y = e.clientY - r.top
    }
    cv.addEventListener('pointermove', onMove)
    const onLeave = () => { ptr.x = ptr.y = -9999 }
    cv.addEventListener('pointerleave', onLeave)

    document.fonts.ready.then(() => {
      if (dead) return
      build()
      raf = requestAnimationFrame(draw)
    })

    return () => {
      dead = true
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
      ro.disconnect()
      io.disconnect()
      st.kill()
      cv.removeEventListener('pointermove', onMove)
      cv.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  const stage = STAGES[Math.max(0, Math.min(STAGES.length, active) - 1)]

  return (
    <section ref={section} className={reduced ? classes.staticRoot : classes.root} aria-labelledby="yaklasim-baslik">
      <div className={reduced ? undefined : classes.sticky}>
        <div className={classes.head}>
          <span className="eyebrow">Yaklaşım</span>
          <h2 id="yaklasim-baslik" className={classes.title}>Dağınık fikir, çalışan sistem.</h2>
        </div>
        {!reduced && <canvas ref={canvas} className={classes.canvas} aria-hidden="true" />}
        {!reduced && (
          <div className={classes.caption} aria-hidden="true" key={active}>
            {active > 0 && (
              <>
                <span className={classes.step}>{String(active).padStart(2, '0')} / {String(STAGES.length).padStart(2, '0')}</span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </>
            )}
            {active === 0 && <p className={classes.hint}>Aşağı kaydırın.</p>}
          </div>
        )}
        {/* Ekran okuyucu ve azaltılmış hareket için gerçek içerik */}
        <ol className={reduced ? classes.list : 'sr-only'}>
          {STAGES.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
