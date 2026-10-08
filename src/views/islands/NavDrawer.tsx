import { Burger, Drawer } from '@mantine/core'
import { useState } from 'react'
import { Providers } from './Providers'
import classes from './NavDrawer.module.css'

export interface NavLink { label: string; href: string }

/** Mobil menü: yalnızca dar ekranda görünür. Masaüstü bağlantıları Astro'da statik HTML'dir. */
export function NavDrawer({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)
  return (
    <Providers>
      <Burger className={classes.burger} opened={open} onClick={() => setOpen((o) => !o)} aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={open} aria-controls="mobil-menu" color="var(--c-bone)" size="md" />
      <Drawer id="mobil-menu" data-lenis-prevent opened={open} onClose={() => setOpen(false)} position="right" size="min(20rem, 88vw)" withCloseButton={false} classNames={{ content: classes.drawer, overlay: classes.overlay }} trapFocus returnFocus>
        <nav className={classes.mobile} aria-label="Mobil gezinme">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="/#iletisim" className={classes.cta} onClick={() => setOpen(false)}>İletişim</a>
        </nav>
      </Drawer>
    </Providers>
  )
}
