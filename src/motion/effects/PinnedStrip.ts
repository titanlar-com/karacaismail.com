import { Effect } from '../Effect'
import { Env, gsap } from '../runtime'

/**
 * Hizmet kartları: geniş ve yeterince yüksek ekranda bölüm sabitlenir, kartlar yatay akar ve toplanarak girer.
 * Diğer her durumda içerik alt alta, normal akışta kalır. Eşikler rem tabanlıdır (kullanıcının yazı boyutuna uyar).
 */
export class PinnedStrip extends Effect {
  protected build(): void {
    if (Env.reducedMotion()) return
    const track = this.root.querySelector<HTMLElement>('[data-track]')
    const cards = this.$('[data-card]')
    if (!track) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 56rem) and (min-height: 44rem)', () => {
      this.root.classList.add('is-pinned')
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 48)
      const run = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: this.root, pin: true, scrub: 0.8, start: 'top top', end: () => `+=${dist()}`, invalidateOnRefresh: true, anticipatePin: 1 },
      })
      cards.forEach((c, i) => {
        if (i === 0) return
        gsap.fromTo(c, { y: 40 + (i % 3) * 10, rotate: (i % 2 ? 1 : -1) * 5, opacity: 0.25, scale: 0.94 }, {
          y: 0, rotate: 0, opacity: 1, scale: 1, ease: 'power2.out',
          scrollTrigger: { trigger: c, containerAnimation: run, start: 'left 98%', end: 'left 55%', scrub: true },
        })
      })
      return () => this.root.classList.remove('is-pinned')
    })
    mm.add('(max-width: 55.99rem), (max-height: 43.99rem)', () => {
      cards.forEach((c) => gsap.from(c, { y: 50, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 90%', once: true } }))
    })
    this.onDestroy(() => mm.revert())
  }
}
