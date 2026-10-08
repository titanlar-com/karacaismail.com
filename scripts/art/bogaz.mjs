// "Boğaz, akşam" illüstrasyonunu üretir: src/views/sections/art/BogazSvg.astro
// Çizim deterministiktir (sabit tohum): aynı betik her zaman aynı SVG'yi verir.
import { mkdirSync, writeFileSync } from 'node:fs'

let seed = 7
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
const f = (n) => Math.round(n * 10) / 10

// Gökyüzü yıldızları
const stars = Array.from({ length: 46 }, () => ({ x: f(rnd() * 1600), y: f(rnd() * 330), r: f(0.8 + rnd() * 1.6), d: f(rnd() * 4) }))
  .map((s) => `<circle class="star" cx="${s.x}" cy="${s.y}" r="${s.r}" style="animation-delay:${s.d}s"/>`).join('')

// Şehir siluetinin sıradan binaları (yer çizgisi y=650)
const blocks = []
for (let x = -20; x < 1620; ) {
  const w = 26 + Math.floor(rnd() * 44)
  const h = 24 + Math.floor(rnd() * 70)
  // kubbeli camii ve kule için ayrılan aralığı boş bırak
  const skip = (x > 360 && x < 680) || (x > 1010 && x < 1110)
  if (!skip) blocks.push(`M${x} 650V${650 - h}H${x + w}V650Z`)
  x += w + Math.floor(rnd() * 6)
}
const windows = []
for (let i = 0; i < 70; i++) {
  const x = f(rnd() * 1560 + 20)
  if ((x > 360 && x < 680) || (x > 1010 && x < 1110)) continue
  windows.push(`<rect x="${x}" y="${f(600 + rnd() * 40)}" width="3" height="4" rx="1"/>`)
}

// Süleymaniye benzeri camii: ana kubbe, yarım kubbeler, dört minare
const mosque = [
  'M420 650V588Q420 522 520 522Q620 522 620 588V650Z',
  'M370 650V618Q370 588 412 588V650Z',
  'M628 650V618Q628 588 670 588V650Z',
  'M520 522V490',
  ...[388, 404, 636, 652].flatMap((x) => [`M${x - 4} 650V470H${x + 4}V650Z`, `M${x - 7} 470L${x} 430L${x + 7} 470Z`]),
].join('')

// Galata Kulesi
const tower = 'M1032 650V562H1088V650ZM1024 562L1060 506L1096 562ZM1046 506H1074V488H1046ZM1060 488V462'

// Asma köprü: kuleler, kablolar, askı telleri, ışıklar
const T1 = 300, T2 = 1300, TOP = 345, DECK = 592
const cableY = (x) => { const t = (x - T1) / (T2 - T1); return (1 - t) ** 2 * TOP + 2 * (1 - t) * t * 795 + t * t * TOP }
const hangers = []
for (let x = T1 + 40; x < T2; x += 40) hangers.push(`M${x} ${f(cableY(x))}V${DECK}`)
for (let x = 20; x < T1; x += 40) { const t = (x + 20) / (T1 + 20); const y = (1 - t) ** 2 * 575 + 2 * (1 - t) * t * 480 + t * t * TOP; hangers.push(`M${x} ${f(y)}V${DECK}`) }
for (let x = T2 + 40; x < 1600; x += 40) { const t = (x - T2) / 320; const y = (1 - t) ** 2 * TOP + 2 * (1 - t) * t * 480 + t * t * 575; hangers.push(`M${x} ${f(y)}V${DECK}`) }
const lights = Array.from({ length: 40 }, (_, i) => `<circle cx="${20 + i * 40}" cy="${DECK - 3}" r="2.2"/>`).join('')

// Güneşin denizdeki yansıması
const glints = Array.from({ length: 15 }, (_, i) => {
  const w = 24 + i * 15
  return `<rect class="glint" x="${f(800 - w / 2)}" y="${676 + i * 15}" width="${w}" height="3.5" rx="2" style="opacity:${f(0.85 - i * 0.045)};animation-delay:${f(i * 0.2)}s"/>`
}).join('')
const waves = Array.from({ length: 22 }, () => {
  const x = f(rnd() * 1500), y = f(690 + rnd() * 190), w = f(40 + rnd() * 80)
  return `M${x} ${y}q${f(w / 4)} -7 ${f(w / 2)} 0t${f(w / 2)} 0`
}).join('')

const ferry = `<g class="ferry" data-ferry><path d="M0 0H132L152 -20H-12Z"/><path d="M14 -20V-38H92V-20Z"/><path d="M30 -38V-54H74V-38Z"/><path d="M96 -20V-46H108V-20Z"/><path d="M100 -46V-62H112V-46Z"/><g class="lit"><rect x="22" y="-33" width="6" height="6"/><rect x="36" y="-33" width="6" height="6"/><rect x="50" y="-33" width="6" height="6"/><rect x="64" y="-33" width="6" height="6"/><rect x="78" y="-33" width="6" height="6"/></g></g>`
const sailboat = `<g class="sail" data-sail><path d="M0 0H70L60 14H10Z"/><path d="M34 -4V-62L66 -4Z"/><path d="M30 -4V-48L8 -4Z"/></g>`
const bird = (i) => `<path class="bird" data-bird="${i}" d="M0 0q9 -11 18 0q9 -11 18 0" />`

const svg = `---
// ÜRETİLDİ: scripts/art/bogaz.mjs ("npm run art:bogaz"). Elle düzenleme; betiği değiştir.
interface Props { label: string }
const { label } = Astro.props
---
<svg class="bogaz" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} data-illustration>
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" style="stop-color:var(--c-ink)"/>
      <stop offset=".45" style="stop-color:#1b1230"/>
      <stop offset=".72" style="stop-color:#7a2f35"/>
      <stop offset="1" style="stop-color:var(--c-ember)"/>
    </linearGradient>
    <radialGradient id="sun" cx=".5" cy=".5" r=".5">
      <stop offset="0" style="stop-color:#fff1c9"/>
      <stop offset=".55" style="stop-color:var(--c-gold)"/>
      <stop offset="1" style="stop-color:var(--c-ember)"/>
    </radialGradient>
    <radialGradient id="halo" cx=".5" cy=".5" r=".5">
      <stop offset="0" style="stop-color:var(--c-gold);stop-opacity:.55"/>
      <stop offset="1" style="stop-color:var(--c-ember);stop-opacity:0"/>
    </radialGradient>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" style="stop-color:#3b2342"/>
      <stop offset=".35" style="stop-color:#1b2a47"/>
      <stop offset="1" style="stop-color:var(--c-ink)"/>
    </linearGradient>
  </defs>

  <rect width="1600" height="900" fill="url(#sky)"/>
  <g data-layer="stars">${stars}</g>
  <circle data-sun-halo cx="800" cy="600" r="430" fill="url(#halo)"/>
  <circle data-sun cx="800" cy="600" r="150" fill="url(#sun)"/>

  <g data-layer="far" class="far"><path data-draw pathLength="1" d="M0 650V566C140 524 270 566 410 548C550 528 640 478 790 486C930 494 1010 544 1170 534C1310 524 1470 492 1600 524V650Z"/></g>

  <g data-layer="city" class="city">
    <path data-draw pathLength="1" d="${blocks.join('')}"/>
    <path data-draw pathLength="1" d="${mosque}"/>
    <path data-draw pathLength="1" d="${tower}"/>
    <g class="lit">${windows.join('')}</g>
  </g>

  <g data-layer="sea">
    <rect y="650" width="1600" height="250" fill="url(#sea)"/>
    <g class="glints">${glints}</g>
    <path class="waves" d="${waves}"/>
  </g>

  <g data-layer="bridge" class="bridge">
    <path data-draw pathLength="1" d="M-20 ${DECK}H1620V${DECK + 9}H-20Z"/>
    <path data-draw pathLength="1" d="M296 ${DECK}V${TOP - 14}H304V${DECK}ZM1296 ${DECK}V${TOP - 14}H1304V${DECK}Z"/>
    <path class="cable" data-draw pathLength="1" d="M${T1} ${TOP}Q800 795 ${T2} ${TOP}M${T1} ${TOP}Q150 480 -20 575M${T2} ${TOP}Q1450 480 1620 575"/>
    <path class="hang" d="${hangers.join('')}"/>
    <g class="lit">${lights}</g>
  </g>

  <g data-layer="boats">
    <g transform="translate(160 668)">${ferry}</g>
    <g transform="translate(1180 720)">${sailboat}</g>
  </g>

  <g data-layer="birds" class="birds" transform="translate(0 0)">
    <g transform="translate(180 250)">${bird(0)}</g>
    <g transform="translate(300 210) scale(.8)">${bird(1)}</g>
    <g transform="translate(120 320) scale(.6)">${bird(2)}</g>
    <g transform="translate(420 290) scale(.7)">${bird(3)}</g>
    <g transform="translate(250 360) scale(.5)">${bird(4)}</g>
  </g>
</svg>

<style>
  .bogaz { width: 100%; height: 100%; display: block; }
  .star { fill: #fff3d6; opacity: .8; animation: twinkle 3.4s ease-in-out infinite; }
  @keyframes twinkle { 50% { opacity: .15; } }
  .far path { fill: #2a1a3d; stroke: #5b3b73; stroke-width: 2; }
  .city path { fill: #130d1f; stroke: #7d4a6a; stroke-width: 1.6; }
  .city .lit rect { fill: var(--c-gold); opacity: .85; }
  .bridge path { fill: #0d0912; stroke: #7d4a6a; stroke-width: 1.4; }
  .bridge .cable, .bridge .hang { fill: none; stroke: #b9808a; stroke-width: 2.2; }
  .bridge .hang { stroke-width: 1; opacity: .8; }
  .bridge .lit circle { fill: var(--c-gold); }
  .glint { fill: var(--c-gold); animation: shimmer 3.2s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
  @keyframes shimmer { from { transform: scaleX(.78); } to { transform: scaleX(1.08); } }
  .waves { fill: none; stroke: #6b4a73; stroke-width: 2; stroke-linecap: round; opacity: .7; }
  .ferry path, .sail path { fill: #0d0912; }
  .ferry .lit rect { fill: var(--c-gold); }
  .bird { fill: none; stroke: #0d0912; stroke-width: 2.4; stroke-linecap: round; }
  @media (prefers-reduced-motion: reduce) { .star, .glint { animation: none; } }
</style>
`
mkdirSync('src/views/sections/art', { recursive: true })
writeFileSync('src/views/sections/art/BogazSvg.astro', svg)
console.log('BogazSvg.astro yazıldı', svg.length, 'bayt')
