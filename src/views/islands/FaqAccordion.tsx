import { Accordion } from '@mantine/core'
import { Providers } from './Providers'
import classes from './FaqAccordion.module.css'

export interface FaqItem { q: string; a: string }

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Providers>
      <Accordion variant="unstyled" chevron={<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>} classNames={{ item: classes.item, control: classes.control, label: classes.label, chevron: classes.chevron, content: classes.content, panel: classes.panel }}>
        {items.map((f) => (
          <Accordion.Item key={f.q} value={f.q}>
            <Accordion.Control>{f.q}</Accordion.Control>
            <Accordion.Panel>{f.a}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Providers>
  )
}
