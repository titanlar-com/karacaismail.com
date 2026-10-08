import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { SITE } from '../data/site'
import { gsap, prefersReducedMotion } from '../lib/motion'
import classes from './Footer.module.css'

export function Footer() {
  const root = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo('[data-mark]', { xPercent: 8 }, { xPercent: -8, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } })
    },
    { scope: root },
  )
  return (
    <footer ref={root} className={classes.root}>
      <div className={classes.mark} data-mark aria-hidden="true">KARACA</div>
      <div className={`wrap ${classes.row}`}>
        <p>© 2026 {SITE.name}. {SITE.city}.</p>
        <p>
          <a href={SITE.orgUrl}>{SITE.org}</a> · <a href={SITE.github} target="_blank" rel="noreferrer noopener">GitHub</a> · <a href={SITE.githubOrg} target="_blank" rel="noreferrer noopener">titanlar-com</a>
        </p>
      </div>
    </footer>
  )
}
