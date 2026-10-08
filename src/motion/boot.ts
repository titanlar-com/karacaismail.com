import type { Effect } from './Effect'
import { ScrollTrigger, SmoothScroll } from './runtime'

type EffectCtor = new (root: HTMLElement) => Effect
type Loader = () => Promise<EffectCtor>

/**
 * `data-effect="ad"` işaretli her öğeyi ilgili Effect sınıfına bağlar.
 * Efektler tembel yüklenir: sayfada kökü yoksa kodu hiç indirilmez. Yeni efekt = bu kayda bir satır.
 */
const registry: Record<string, Loader> = {
  'nav-solid': () => import('./effects/NavSolid').then((m) => m.NavSolid),
  'scroll-progress': () => import('./effects/ScrollProgress').then((m) => m.ScrollProgress),
  'parallax-x': () => import('./effects/ParallaxX').then((m) => m.ParallaxX),
  'hero-scatter': () => import('./effects/HeroScatter').then((m) => m.HeroScatter),
  'dot-grid': () => import('./effects/DotGrid').then((m) => m.DotGrid),
  magnet: () => import('./effects/Magnet').then((m) => m.Magnet),
  marquee: () => import('./effects/Marquee').then((m) => m.Marquee),
  'word-reveal': () => import('./effects/WordReveal').then((m) => m.WordReveal),
  'count-up': () => import('./effects/CountUp').then((m) => m.CountUp),
  'components-morph': () => import('./effects/ComponentsMorph').then((m) => m.ComponentsMorph),
  'code-typing': () => import('./effects/CodeTyping').then((m) => m.CodeTyping),
  'agent-flow': () => import('./effects/AgentFlow').then((m) => m.AgentFlow),
  'particle-scene': () => import('./effects/ParticleScene').then((m) => m.ParticleScene),
  'pinned-strip': () => import('./effects/PinnedStrip').then((m) => m.PinnedStrip),
  'process-rail': () => import('./effects/ProcessRail').then((m) => m.ProcessRail),
  reveal: () => import('./effects/Reveal').then((m) => m.Reveal),
  illustration: () => import('./effects/Illustration').then((m) => m.Illustration),
  spotlight: () => import('./effects/Spotlight').then((m) => m.Spotlight),
}

/** Çok efektli sayfalar için ek kayıt (ör. sahneler). */
export function registerEffect(name: string, loader: Loader) {
  registry[name] = loader
}

async function mountAll(scope: ParentNode = document): Promise<Effect[]> {
  const mounted: Effect[] = []
  const roots = Array.from(scope.querySelectorAll<HTMLElement>('[data-effect]'))
  await Promise.all(
    roots.map(async (root) => {
      for (const name of (root.dataset.effect ?? '').split(/\s+/).filter(Boolean)) {
        const load = registry[name]
        if (!load) continue
        const Ctor = await load()
        const fx = new Ctor(root)
        fx.mount()
        mounted.push(fx)
      }
    }),
  )
  return mounted
}

async function boot() {
  const smooth = new SmoothScroll()
  smooth.mount()
  // Sayfa içi bağlantılar: aynı sayfada kaydır, başka sayfaya gidiyorsa tarayıcıya bırak
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-scroll-link], a[href^="#"]')
    if (!a) return
    const url = new URL(a.href, location.href)
    if (url.pathname !== location.pathname || !url.hash) return
    if (smooth.scrollTo(url.hash.slice(1))) e.preventDefault()
  })
  await mountAll()
  await document.fonts.ready
  ScrollTrigger.refresh()
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
else void boot()
