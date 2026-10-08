import { gsap } from './runtime'

/**
 * Bir DOM köküne bağlanan hareket efektinin soyut tabanı.
 * Alt sınıflar `build` içinde `this.ctx` (gsap.context) altında animasyon kurar; `destroy` hepsini geri alır.
 */
export abstract class Effect {
  protected ctx: gsap.Context | null = null
  private cleanups: Array<() => void> = []

  constructor(protected readonly root: HTMLElement) {}

  mount(): void {
    this.ctx = gsap.context(() => this.build(), this.root)
  }

  protected abstract build(): void

  /** Olay dinleyici, gözlemci vb. için temizlik kaydı. */
  protected onDestroy(fn: () => void): void {
    this.cleanups.push(fn)
  }

  destroy(): void {
    this.cleanups.forEach((fn) => fn())
    this.cleanups = []
    this.ctx?.revert()
    this.ctx = null
  }

  protected $<T extends HTMLElement = HTMLElement>(sel: string): T[] {
    return Array.from(this.root.querySelectorAll<T>(sel))
  }
}
