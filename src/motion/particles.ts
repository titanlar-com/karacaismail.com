export interface Pt { x: number; y: number }

const rnd = (a: number, b: number) => a + Math.random() * (b - a)

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Hedef noktaları üreten saf yardımcılar (DOM yalnızca çevrimdışı tuval için). */
export class PointFactory {
  constructor(private readonly w: number, private readonly h: number, private readonly count: number, private readonly fontFamily: string) {}

  /** Başlangıç durumu: sarmal bir galaksi bulutu. */
  cloud(): Pt[] {
    const { w, h, count: n } = this
    const R = Math.min(w, h) * 0.42
    return Array.from({ length: n }, (_, i) => {
      const arm = i % 3
      const r = Math.pow(Math.random(), 0.7) * R
      const a = (r / R) * 5 + (arm * Math.PI * 2) / 3 + rnd(-0.25, 0.25)
      return { x: w / 2 + Math.cos(a) * r * 1.5, y: h / 2 + Math.sin(a) * r * 0.9 }
    })
  }

  /** Metni çevrimdışı tuvale çizip dolu pikselleri `count` noktaya örnekler. */
  text(text: string): Pt[] {
    const { w, h, count: n } = this
    const c = document.createElement('canvas')
    c.width = w
    c.height = h
    const ctx = c.getContext('2d', { willReadFrequently: true })
    if (!ctx) return this.cloud()
    let size = 220
    ctx.font = `800 ${size}px ${this.fontFamily}`
    size = Math.min(size * ((w * 0.9) / ctx.measureText(text).width), h * 0.5)
    ctx.font = `800 ${size}px ${this.fontFamily}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#fff'
    ctx.fillText(text, w / 2, h / 2)
    const data = ctx.getImageData(0, 0, w, h).data
    const pts: Pt[] = []
    for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) if (data[(y * w + x) * 4 + 3] > 128) pts.push({ x, y })
    if (!pts.length) return this.cloud()
    shuffle(pts)
    return Array.from({ length: n }, (_, i) => {
      const p = pts[i % pts.length]
      return i < pts.length ? p : { x: p.x + rnd(-1.5, 1.5), y: p.y + rnd(-1.5, 1.5) }
    })
  }
}
