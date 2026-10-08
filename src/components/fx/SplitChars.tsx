import { useGSAP } from '@gsap/react'
import { useRef, type ElementType } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

type Props = {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  /** true: görünür alana girince oynat; false: açılışta oynat */
  onScroll?: boolean
}

/** Harf harf açılan başlık. Ekran okuyucu için tam metin aria-label'da, parçalar aria-hidden. */
export function SplitChars({ text, as: Tag = 'span', className, delay = 0, onScroll = false }: Props) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const chars = root.current?.querySelectorAll('[data-ch]')
      if (!chars?.length || prefersReducedMotion()) return
      gsap.set(chars, { yPercent: 110, rotate: 6, opacity: 0 })
      gsap.to(chars, {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.018,
        delay,
        scrollTrigger: onScroll ? { trigger: root.current, start: 'top 85%', once: true } : undefined,
      })
    },
    { scope: root, dependencies: [text] },
  )

  const words = text.split(' ')
  return (
    <Tag ref={root} className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'nowrap', overflow: 'clip', paddingBottom: '0.12em', marginBottom: '-0.12em' }}>
          {Array.from(w).map((c, ci) => (
            <span key={ci} data-ch style={{ display: 'inline-block', willChange: 'transform' }}>
              {c}
            </span>
          ))}
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
