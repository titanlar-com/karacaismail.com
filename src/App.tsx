import { useGSAP } from '@gsap/react'
import { useEffect, useRef } from 'react'
import { Marquee } from './components/fx/Marquee'
import { Nav } from './components/Nav'
import { TICKER } from './data/site'
import { gsap, initSmoothScroll, prefersReducedMotion, ScrollTrigger } from './lib/motion'
import { Contact } from './sections/Contact'
import { Faq } from './sections/Faq'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Manifesto } from './sections/Manifesto'
import { Numbers } from './sections/Numbers'
import { ParticleScene } from './sections/ParticleScene'
import { Process } from './sections/Process'
import { Services } from './sections/Services'
import { Work } from './sections/Work'
import './styles/app.css'

export default function App() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stop = initSmoothScroll()
    // Yazı tipi yüklenince ölçüler değişir; ScrollTrigger'ı yeniden hesapla
    document.fonts.ready.then(() => ScrollTrigger.refresh())
    return stop
  }, [])

  useGSAP(() => {
    if (prefersReducedMotion() || !bar.current) return
    gsap.to(bar.current, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
  })

  return (
    <>
      <a className="skip-link" href="#icerik">İçeriğe geç</a>
      <div ref={bar} className="progress" aria-hidden="true" />
      <Nav />
      <main id="icerik">
        <Hero />
        <Marquee items={TICKER} />
        <Manifesto />
        <ParticleScene />
        <Services />
        <Marquee items={TICKER} reverse />
        <Process />
        <Work />
        <Numbers />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
