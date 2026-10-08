import { Burger, Drawer } from '@mantine/core'
import { useEffect, useState } from 'react'
import { NAV, SITE } from '../data/site'
import { scrollToId } from '../lib/motion'
import classes from './Nav.module.css'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    // Çekmece kapanırken kaydırma kilidinin kalkmasını bekle
    window.setTimeout(() => scrollToId(id), open ? 250 : 0)
  }

  return (
    <header className={`${classes.bar} ${solid ? classes.solid : ''}`}>
      <div className={classes.inner}>
        <a href="#top" className={classes.brand} onClick={go('top')} aria-label={`${SITE.name}, sayfa başı`}>
          <svg viewBox="0 0 64 64" width="32" height="32" aria-hidden="true"><path d="M18 14v36M44 14 24 34l20 16" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span>{SITE.name}</span>
        </a>
        <nav className={classes.links} aria-label="Ana gezinme">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)}>{n.label}</a>
          ))}
          <a href="#iletisim" className={classes.cta} onClick={go('iletisim')}>İletişim</a>
        </nav>
        <Burger className={classes.burger} opened={open} onClick={() => setOpen((o) => !o)} aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'} color="var(--c-bone)" size="md" />
      </div>
      <Drawer opened={open} onClose={() => setOpen(false)} position="right" size="min(20rem, 88vw)" withCloseButton={false} classNames={{ content: classes.drawer, overlay: classes.overlay }} trapFocus returnFocus>
        <nav className={classes.mobile} aria-label="Mobil gezinme">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)}>{n.label}</a>
          ))}
          <a href="#iletisim" className={classes.cta} onClick={go('iletisim')}>İletişim</a>
        </nav>
      </Drawer>
    </header>
  )
}
