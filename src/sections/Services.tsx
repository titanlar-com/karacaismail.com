import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { SpotlightCard } from '../components/fx/SpotlightCard'
import { SERVICES } from '../data/site'
import { gsap, prefersReducedMotion } from '../lib/motion'
import classes from './Services.module.css'

export function Services() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 56rem) and (min-height: 560px)', () => {
        if (prefersReducedMotion()) return
        const t = track.current!
        const dist = () => Math.max(0, t.scrollWidth - window.innerWidth + 48)
        const run = gsap.to(t, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: { trigger: root.current, pin: true, scrub: 0.8, start: 'top top', end: () => `+=${dist()}`, invalidateOnRefresh: true, anticipatePin: 1 },
        })
        // Kartlar şeride girerken dağınık durumdan toplanır
        gsap.utils.toArray<HTMLElement>('[data-card]').forEach((c, i) => {
          if (i === 0) return
          gsap.fromTo(
            c,
            { y: 90 + (i % 3) * 30, rotate: (i % 2 ? 1 : -1) * 7, opacity: 0.25, scale: 0.92 },
            { y: 0, rotate: 0, opacity: 1, scale: 1, ease: 'power2.out', scrollTrigger: { trigger: c, containerAnimation: run, start: 'left 98%', end: 'left 55%', scrub: true } },
          )
        })
      })
      mm.add('(max-width: 55.99rem), (max-height: 559px)', () => {
        if (prefersReducedMotion()) return
        gsap.utils.toArray<HTMLElement>('[data-card]').forEach((c) => {
          gsap.from(c, { y: 50, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 90%', once: true } })
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="hizmetler" ref={root} className={classes.root} aria-labelledby="hizmet-baslik">
      <div className={classes.stage}>
        <header className={`wrap ${classes.head}`}>
          <p className="eyebrow">Hizmetler</p>
          <h2 id="hizmet-baslik" className={classes.title}>Altı alanda, uçtan uca.</h2>
          <p className={classes.hint}>Yana kaydırarak ilerleyin.</p>
        </header>
        <div ref={track} className={classes.track}>
          {SERVICES.map((s) => (
            <SpotlightCard as="article" key={s.no} className={classes.card} data-card="">
              <span className={classes.no}>{s.no}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul className={classes.tags}>
                {s.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
