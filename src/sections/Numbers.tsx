import { CountUp } from '../components/fx/CountUp'
import { Reveal } from '../components/fx/Reveal'
import { PRINCIPLES, STATS } from '../data/site'
import classes from './Numbers.module.css'

export function Numbers() {
  return (
    <section className={`section ${classes.root}`} aria-labelledby="ilke-baslik">
      <div className="wrap">
        <dl className={classes.stats}>
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className={classes.label}>{s.label}</dt>
              <dd className={classes.value}><CountUp to={s.value} suffix={s.suffix} /></dd>
            </div>
          ))}
        </dl>
        <Reveal>
          <p className="eyebrow">Çalışma ilkelerim</p>
          <h2 id="ilke-baslik" className={classes.title}>Nasıl çalışırım?</h2>
        </Reveal>
        <ul className={classes.principles}>
          {PRINCIPLES.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.08}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
