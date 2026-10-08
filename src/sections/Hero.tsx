import { useGSAP } from '@gsap/react'
import { Button } from '@mantine/core'
import { IconArrowDown } from '@tabler/icons-react'
import { DotGrid } from '../components/fx/DotGrid'
import { Magnet } from '../components/fx/Magnet'
import { SplitChars } from '../components/fx/SplitChars'
import { SITE } from '../data/site'
import { useRef } from 'react'
import { gsap, prefersReducedMotion, scrollToId } from '../lib/motion'
import classes from './Hero.module.css'

export function Hero() {
  const root = useRef<HTMLElement>(null)

  // Aşağı kaydırdıkça başlığın harfleri dağılır; geri dönünce toparlanır
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const chars = gsap.utils.toArray<HTMLElement>('[data-ch]')
      if (!chars.length) return
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom 20%', scrub: 0.6 } })
      chars.forEach((c, i) => {
        const a = (i * 137.5 * Math.PI) / 180
        tl.to(c, { x: Math.cos(a) * (120 + (i % 7) * 60), y: Math.sin(a) * (80 + (i % 5) * 50) - 120, skewX: ((i % 9) - 4) * 8, scale: 0.6 + (i % 4) * 0.2, ease: 'none', immediateRender: false }, 0)
      })
      tl.to('[data-hero-fade]', { opacity: 0, ease: 'none' }, 0.1)
    },
    { scope: root },
  )

  return (
    <section ref={root} id="top" className={classes.root} aria-labelledby="hero-baslik">
      <DotGrid />
      <div className={`wrap ${classes.content}`} data-hero-fade>
        <p className={`eyebrow ${classes.kicker}`}>{SITE.role}</p>
        <h1 id="hero-baslik" className={classes.title}>
          <SplitChars text="Stratejiyi mimariye," as="span" delay={0.2} />
          <SplitChars text="mimariyi çalışan" as="span" delay={0.45} />
          <SplitChars text="ürüne çeviririm." as="span" delay={0.7} />
        </h1>
        <p className={classes.lead}>
          Ben {SITE.name}. {SITE.city}'dan, <a href={SITE.orgUrl}>{SITE.org}</a> çatısı altında, iş süreçlerini sürdürülebilir, güvenli ve otomasyona hazır yazılım sistemlerine dönüştürüyorum.
        </p>
        <div className={classes.actions}>
          <Magnet>
            <Button component="a" href="#iletisim" size="lg" radius="xl" className={classes.primary} onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollToId('iletisim') }}>
              Birlikte çalışalım
            </Button>
          </Magnet>
          <Magnet>
            <Button component="a" href="#calismalar" size="lg" radius="xl" variant="subtle" className={classes.ghost} onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollToId('calismalar') }}>
              Çalışmalarım
            </Button>
          </Magnet>
        </div>
      </div>
      <a href="#hakkimda" className={classes.scroll} onClick={(e) => { e.preventDefault(); scrollToId('hakkimda') }} aria-label="Aşağı kaydır">
        <IconArrowDown size={22} aria-hidden="true" />
      </a>
    </section>
  )
}
