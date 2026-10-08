import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import classes from './Manifesto.module.css'

const TEXT =
  'Teknoloji kararı, bir iş kararıdır. Önce doğru soruyu bulur, sonra mimariyi çizer, ilk satırı yazar ve sistem sahibinin elinde sorunsuz çalışana kadar yanında durarım. Süs değil sonuç, söz değil kanıt.'

export function Manifesto() {
  const root = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>('[data-w]')
      if (prefersReducedMotion()) return
      gsap.set(words, { opacity: 0.14 })
      gsap.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 55%', scrub: 0.6 },
      })
      gsap.to('[data-speed-shape]', {
        yPercent: -35,
        rotate: 40,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    },
    { scope: root },
  )
  return (
    <section id="hakkimda" ref={root} className={`section ${classes.root}`} aria-labelledby="hakkimda-baslik">
      <div className={classes.shape} data-speed-shape aria-hidden="true" />
      <div className="wrap">
        <p className="eyebrow">Hakkımda</p>
        <h2 id="hakkimda-baslik" className="sr-only">Hakkımda</h2>
        <p className={classes.text}>
          {TEXT.split(' ').map((w, i) => (
            <span key={i} data-w>{w} </span>
          ))}
        </p>
        <p className={classes.sub}>
          İstanbul merkezli, titanlar.com'un başındayım. Frappe / ERPNext tabanlı SaaS mimarisinden yapay zekâ destekli ürünlere, uyarlanabilir arayüz sistemlerinden e-ticaret entegrasyonlarına uzanan işleri, hepsini açık kaynak ve kanıt disiplini ile yürütürüm.
        </p>
      </div>
    </section>
  )
}
