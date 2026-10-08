import { Button } from '@mantine/core'
import { Providers } from './Providers'
import classes from './CtaButton.module.css'

interface Props { href: string; label: string; tone?: 'primary' | 'ghost'; scrollLink?: boolean }

/** Mantine Button; sunucuda statik HTML olarak çizilir (client direktifi gerekmez). */
export function CtaButton({ href, label, tone = 'primary', scrollLink = true }: Props) {
  return (
    <Providers>
      <Button component="a" href={href} size="lg" radius="xl" variant={tone === 'ghost' ? 'subtle' : 'filled'} className={classes[tone]} {...(scrollLink ? { 'data-scroll-link': '' } : {})}>
        {label}
      </Button>
    </Providers>
  )
}
