import { Button } from '@mantine/core'
import { IconArrowDown } from '@tabler/icons-react'
import { DotGrid } from '../components/fx/DotGrid'
import { Magnet } from '../components/fx/Magnet'
import { SplitChars } from '../components/fx/SplitChars'
import { SITE } from '../data/site'
import { scrollToId } from '../lib/motion'
import classes from './Hero.module.css'

export function Hero() {
  return (
    <section id="top" className={classes.root} aria-labelledby="hero-baslik">
      <DotGrid />
      <div className={`wrap ${classes.content}`}>
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
