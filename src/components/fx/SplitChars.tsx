import { useGSAP } from '@gsap/react'
import { useRef, type ElementType } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/motion'
import classes from './SplitChars.module.css'

type Props = {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  /** true: görünür alana girince oynat; false: açılışta oynat */
  onScroll?: boolean
  /** true: gerçek metin üst öğenin aria-label'ında; burada yalnızca görsel parçalar (çift metin olmaz) */
  decorative?: boolean
}

/** Harf harf açılan başlık. Gerçek metin sr-only olarak DOM'da; görsel parçalar aria-hidden. */
export function SplitChars({ text, as: Tag = 'span', className, delay = 0, onScroll = false, decorative = false }: Props) {
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
        // Giriş maskesi bitince kırpmayı kaldır: harfler kaydırmayla kutudan çıkıp dağılabilsin
        onComplete: () => root.current?.querySelectorAll<HTMLElement>('[data-word]').forEach((w) => w.classList.add(classes.free)),
      })
    },
    { scope: root, dependencies: [text] },
  )

  const words = text.split(' ')
  return (
    <Tag ref={root} className={className}>
      {!decorative && <span className="sr-only">{text}</span>}
      <span aria-hidden="true">
        {words.map((w, wi) => (
          <span key={wi} data-word className={classes.word}>
            {Array.from(w).map((c, ci) => (
              <span key={ci} data-ch className={classes.ch}>
                {c}
              </span>
            ))}
            {wi < words.length - 1 ? '\u00a0' : ''}
          </span>
        ))}
      </span>
    </Tag>
  )
}
