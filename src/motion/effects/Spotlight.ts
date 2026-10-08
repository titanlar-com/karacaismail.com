import { Effect } from '../Effect'
import { Env } from '../runtime'

/** İmleci izleyen ışık (React Bits "SpotlightCard" deseni): yalnızca yüzeyde, kenarlıksız. */
export class Spotlight extends Effect {
  protected build(): void {
    if (!Env.finePointer()) return
    const move = (e: PointerEvent) => {
      const r = this.root.getBoundingClientRect()
      this.root.style.setProperty('--mx', `${e.clientX - r.left}px`)
      this.root.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    this.root.addEventListener('pointermove', move)
    this.onDestroy(() => this.root.removeEventListener('pointermove', move))
  }
}
