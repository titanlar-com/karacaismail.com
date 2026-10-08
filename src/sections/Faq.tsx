import { Accordion } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { Reveal } from '../components/fx/Reveal'
import { FAQ } from '../data/site'
import classes from './Faq.module.css'

export function Faq() {
  return (
    <section id="sss" className={`section ${classes.root}`} aria-labelledby="sss-baslik">
      <div className={`wrap ${classes.grid}`}>
        <Reveal>
          <p className="eyebrow">Sık sorulanlar</p>
          <h2 id="sss-baslik" className={classes.title}>Aklınızdaki sorular.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion variant="unstyled" chevron={<IconPlus size={24} aria-hidden="true" />} classNames={{ item: classes.item, control: classes.control, label: classes.label, chevron: classes.chevron, content: classes.content, panel: classes.panel }}>
            {FAQ.map((f) => (
              <Accordion.Item key={f.q} value={f.q}>
                <Accordion.Control>{f.q}</Accordion.Control>
                <Accordion.Panel>{f.a}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
