import { IconArrowUpRight } from '@tabler/icons-react'
import { Reveal } from '../components/fx/Reveal'
import { SpotlightCard } from '../components/fx/SpotlightCard'
import { WORKS } from '../data/site'
import classes from './Work.module.css'

export function Work() {
  return (
    <section id="calismalar" className={`section ${classes.root}`} aria-labelledby="calisma-baslik">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Seçilmiş çalışmalar</p>
          <h2 id="calisma-baslik" className={classes.title}>Hepsi açık, hepsi incelenebilir.</h2>
        </Reveal>
        <ul className={classes.list}>
          {WORKS.map((w, i) => (
            <li key={w.no} className={'wide' in w && w.wide ? classes.wide : undefined}>
              <Reveal delay={(i % 3) * 0.08} className={classes.fill}>
                <SpotlightCard as="a" href={w.href} target="_blank" rel="noreferrer noopener" className={classes.card} aria-label={`${w.title}: ${w.meta}. Yeni sekmede açılır.`}>
                  <span className={classes.no}>{w.no}</span>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                  <p className={classes.meta}>{w.meta}</p>
                  <ul className={classes.tags} aria-hidden="true">
                    {w.tags.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                  <IconArrowUpRight className={classes.arrow} size={28} aria-hidden="true" />
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
