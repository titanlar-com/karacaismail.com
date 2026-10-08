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
  spotlight: () => import('./effects/Spotlight').then((m) => m.Spotlight),
  reveal: () => import('./effects/Reveal').then((m) => m.Reveal),
  illustration: () => import('./effects/Illustration').then((m) => m.Illustration),
  'components-morph': () => import('./effects/ComponentsMorph').then((m) => m.ComponentsMorph),
  'code-typing': () => import('./effects/CodeTyping').then((m) => m.CodeTyping),
  'agent-flow': () => import('./effects/AgentFlow').then((m) => m.AgentFlow),
  'particle-scene': () => import('./effects/ParticleScene').then((m) => m.ParticleScene),
  'pinned-strip': () => import('./effects/PinnedStrip').then((m) => m.PinnedStrip),
  'process-rail': () => import('./effects/ProcessRail').then((m) => m.ProcessRail),
}

/** Çok efektli sayfalar için ek kayıt. */
export function registerEffect(name: string, loader: Loader) {
  registry[name] = loader
}

const mounted: Effect[] = []

/** Bir efektin yüklenememesi ya da kurulurken hata vermesi diğerlerini ve sayfayı durdurmaz. */
async function mountOne(root: HTMLElement, name: string): Promise<void> {
  const load = registry[name]
  if (!load) return
  try {
    const Ctor = await load()
    const fx = new Ctor(root)
    fx.mount()
    mounted.push(fx)
    await fx.ready
  } catch (err) {
    console.error(`[motion] "${name}" etkinleştirilemedi; içerik statik kalır`, err)
  }
}

async function mountAll(scope: ParentNode = document): Promise<void> {
  const jobs: Promise<void>[] = []
  for (const root of Array.from(scope.querySelectorAll<HTMLElement>('[data-effect]'))) {
    for (const name of (root.dataset.effect ?? '').split(/\s+/).filter(Boolean)) jobs.push(mountOne(root, name))
  }
  await Promise.allSettled(jobs)
}

export function destroyAll(): void {
  mounted.splice(0).forEach((fx) => fx.destroy())
}

const isPlainLeftClick = (e: MouseEvent) => e.button === 0 && !e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey

async function boot() {
  const smooth = new SmoothScroll()
  smooth.mount()

  // Aynı sayfadaki hash bağlantıları (menü, çekmece, "/#id" biçimi dahil): yumuşak kaydır ve hedefe odak ver.
  document.addEventListener('click', (e) => {
    if (!isPlainLeftClick(e)) return
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]')
    if (!a || a.target === '_blank') return
    const url = new URL(a.href, location.href)
    if (url.origin !== location.origin || url.pathname.replace(/\/$/, '') !== location.pathname.replace(/\/$/, '') || !url.hash) return
    const id = url.hash.slice(1)
    if (!document.getElementById(id)) return
    e.preventDefault()
    // Mantine çekmecesi açıkken sayfa kaydırması kilitlidir; kapanmasını bekle
    const delay = a.closest('[role="dialog"]') ? 320 : 0
    window.setTimeout(() => smooth.scrollTo(id), delay)
  })

  try {
    await mountAll()
    await document.fonts.ready
  } finally {
    ScrollTrigger.refresh()
    smooth.resize()
    // Doğrudan "/#bolum" ile gelindiyse: sabitleme aralıkları kurulduktan sonra doğru yere in
    if (location.hash.length > 1) smooth.scrollTo(decodeURIComponent(location.hash.slice(1)), true)
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
else void boot()
