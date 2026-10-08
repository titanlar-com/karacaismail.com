import { useRef, type ElementType, type ReactNode } from 'react'
import classes from './SpotlightCard.module.css'

type Props = { children: ReactNode; className?: string; as?: ElementType; [k: string]: unknown }

/** İmleci izleyen ışık (React Bits "SpotlightCard" deseni). Işık yalnızca yüzeyde; kenarlık yok. */
export function SpotlightCard({ children, className = '', as: Tag = 'div', ...rest }: Props) {
  const ref = useRef<HTMLElement>(null)
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag ref={ref} className={`${classes.card} ${className}`} onPointerMove={onMove} {...rest}>
      {children}
    </Tag>
  )
}
