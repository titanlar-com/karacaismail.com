import { gsap, ScrollTrigger } from './runtime'

/**
 * Bir DOM köküne bağlanan hareket efektinin soyut tabanı.
 * Alt sınıflar `build` içinde `this.ctx` (gsap.context) altında animasyon kurar; `destroy` hepsini geri alır.
 * `reactsToResize = true` olan efektler, genişlik veya belirgin yükseklik değişince kendini yeniden kurar.
 */
export abstract class Effect {
  protected ctx: gsap.Context | null = null
  protected reactsToResize = false
  private cleanups: Array<() => void> = []
  private resizeOff: (() => void) | null = null
  /** Asenkron kurulum yapan efektler (ör. yazı tipi bekleyen) bunu atar; boot, düzen kesinleşmeden hash kaydırması yapmaz. */
  protected pending: Promise<void> = Promise.resolve()

  get ready(): Promise<void> {
    return this.pending
  }

  constructor(protected readonly root: HTMLElement) {}

  mount(): void {
    this.run()
    if (this.reactsToResize) this.watchResize()
  }

  protected abstract build(): void

  /** Olay dinleyici, gözlemci vb. için temizlik kaydı (her yeniden kurulumda çalışır). */
  protected onDestroy(fn: () => void): void {
    this.cleanups.push(fn)
  }

  destroy(): void {
    this.resizeOff?.()
    this.resizeOff = null
    this.teardown()
  }

  protected $<T extends HTMLElement = HTMLElement>(sel: string): T[] {
    return Array.from(this.root.querySelectorAll<T>(sel))
  }

  private run(): void {
    this.ctx = gsap.context(() => this.build(), this.root)
  }

  private teardown(): void {
    this.cleanups.forEach((fn) => fn())
    this.cleanups = []
    this.ctx?.revert()
    this.ctx = null
  }

  private watchResize(): void {
    let timer = 0
    let w = window.innerWidth
    let h = window.innerHeight
    const on = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        // Mobil adres çubuğu birkaç on piksel oynatır; bunu yeniden kurulum sebebi sayma
        if (Math.abs(window.innerWidth - w) < 1 && Math.abs(window.innerHeight - h) < 80) return
        w = window.innerWidth
        h = window.innerHeight
        this.teardown()
        this.run()
        ScrollTrigger.refresh()
      }, 250)
    }
    window.addEventListener('resize', on)
    this.resizeOff = () => { window.removeEventListener('resize', on); window.clearTimeout(timer) }
  }
}
