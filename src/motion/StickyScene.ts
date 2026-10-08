import { Effect } from './Effect'
import { Env } from './runtime'

/**
 * Yüksek bölüm + yapışkan sahne kullanan efektlerin tabanı.
 * Varsayılan (JS yok, hareket azaltılmış ya da ekran sahneye yetmiyor): içerik normal akışta, tam okunur durur.
 * Yalnızca `goLive()` onaylarsa `.is-live` eklenir ve CSS yüksek yapışkan düzene geçer.
 */
export abstract class StickyScene extends Effect {
  protected reactsToResize = true
  /** Sahnenin yapışkan görünüm penceresine sığması gereken en küçük içerik yüksekliği ölçümü için üst boşluk (gezinme çubuğu). */
  private static readonly NAV = 72
  private static readonly MIN_HEIGHT = 420

  /** @returns true ise hareket kurulabilir. */
  protected goLive(): boolean {
    this.root.classList.remove('is-live')
    if (Env.reducedMotion() || window.innerHeight < StickyScene.MIN_HEIGHT) return false
    const fit = this.root.querySelector<HTMLElement>('[data-fit]')
    // Doğal akıştaki içerik görünüm penceresine sığmıyorsa yapışkan sahneyi kurma (kırpılırdı)
    if (fit && fit.offsetHeight + StickyScene.NAV + 24 > window.innerHeight) return false
    this.root.classList.add('is-live')
    this.onDestroy(() => this.root.classList.remove('is-live'))
    return true
  }
}
