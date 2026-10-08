export type Pt = { x: number; y: number }

const rnd = (a: number, b: number) => a + Math.random() * (b - a)

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Metni çevrimdışı tuvale çizip dolu pikselleri n noktaya örnekler. */
export function textPoints(text: string, w: number, h: number, n: number, fontFamily: string): Pt[] {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d', { willReadFrequently: true })
  if (!ctx) return []
  let size = 220
  ctx.font = `800 ${size}px ${fontFamily}`
  const m = ctx.measureText(text).width
  size = Math.min(size * ((w * 0.9) / m), h * 0.5)
  ctx.font = `800 ${size}px ${fontFamily}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#fff'
  ctx.fillText(text, w / 2, h / 2)
  const data = ctx.getImageData(0, 0, w, h).data
  const pts: Pt[] = []
  const step = 2
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (data[(y * w + x) * 4 + 3] > 128) pts.push({ x, y })
    }
  }
  shuffle(pts)
  if (pts.length === 0) return cloudPoints(w, h, n)
  const out: Pt[] = []
  for (let i = 0; i < n; i++) {
    const p = pts[i % pts.length]
    out.push(i < pts.length ? p : { x: p.x + rnd(-1.5, 1.5), y: p.y + rnd(-1.5, 1.5) })
  }
  return out
}

/** Başlangıç durumu: sarmal bir galaksi bulutu. */
export function cloudPoints(w: number, h: number, n: number): Pt[] {
  const out: Pt[] = []
  const R = Math.min(w, h) * 0.42
  for (let i = 0; i < n; i++) {
    const arm = i % 3
    const r = Math.pow(Math.random(), 0.7) * R
    const a = (r / R) * 5 + (arm * Math.PI * 2) / 3 + rnd(-0.25, 0.25)
    out.push({ x: w / 2 + Math.cos(a) * r * 1.5, y: h / 2 + Math.sin(a) * r * 0.9 })
  }
  return out
}
