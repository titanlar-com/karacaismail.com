import { useGSAP } from '@gsap/react'
import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

type Props = { children: ReactNode; as?: ElementType; className?: string; delay?: number; y?: number }

/** Görünür alana girince yukarı süzülerek belirir. */
export function Reveal({ children, as: Tag = 'div', className, delay = 0, y = 40 }: Props) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return
      gsap.fromTo(
        ref.current,
        { y, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', delay, scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } },
      )
    },
    { scope: ref },
  )
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
