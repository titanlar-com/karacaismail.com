import { useGSAP } from '@gsap/react'
import { animate, svg } from 'animejs'
import { useRef } from 'react'
import { STEPS } from '../data/site'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion'
import classes from './Process.module.css'

export function Process() {
  const root = useRef<HTMLElement>(null)
  const line = useRef<SVGPathElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // Ana çizgi kaydırmayla çizilir
      gsap.fromTo(
        line.current,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '[data-steps]', start: 'top 70%', end: 'bottom 60%', scrub: 0.5 } },
      )
      // Her adımın halkası anime.js ile çizilir
      gsap.utils.toArray<HTMLElement>('[data-step]').forEach((el) => {
        const ring = el.querySelector('circle')
        gsap.from(el.querySelector('[data-body]'), { opacity: 0, y: 40, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } })
        if (ring) {
          const [d] = svg.createDrawable(ring)
          d.draw = '0 0'
          ScrollTrigger.create({
            trigger: el,
            start: 'top 80%',
            once: true,
            onEnter: () => { animate(d, { draw: '0 1', duration: 1100, ease: 'inOutQuad' }) },
          })
        }
      })
    },
    { scope: root },
  )

  return (
    <section id="surec" ref={root} className={`section ${classes.root}`} aria-labelledby="surec-baslik">
      <div className={`wrap ${classes.grid}`}>
        <div className={classes.side}>
          <p className="eyebrow">Süreç</p>
          <h2 id="surec-baslik" className={classes.title}>Dört adımda, belirsizlikten teslimata.</h2>
          <p className={classes.lead}>Her adımın sahibi, bağımlılığı ve kabul ölçütü yazılıdır.</p>
        </div>
        <ol className={classes.steps} data-steps>
          <svg className={classes.rail} viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
            <path ref={line} d="M1 0 V100" pathLength={1} strokeDasharray={1} strokeDashoffset={prefersReducedMotion() ? 0 : 1} fill="none" stroke="var(--c-ember)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
          {STEPS.map((s) => (
            <li key={s.no} className={classes.step} data-step>
              <svg className={classes.node} viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="24" cy="24" r="21" fill="var(--c-ink)" stroke="var(--c-ember)" strokeWidth="2" />
                <text x="24" y="30" textAnchor="middle" fill="var(--c-bone)" style={{ font: '700 1rem var(--font-mono)' }}>{s.no}</text>
              </svg>
              <div data-body>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
