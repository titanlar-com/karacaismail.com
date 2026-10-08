import { Effect } from '../Effect'

/** Kaydırınca gezinme çubuğuna buzlu zemin ekler. */
export class NavSolid extends Effect {
  protected build(): void {
    const on = () => this.root.toggleAttribute('data-solid', window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    this.onDestroy(() => window.removeEventListener('scroll', on))
  }
}
