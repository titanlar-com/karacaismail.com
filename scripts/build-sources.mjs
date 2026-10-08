// content-source/soruces.md -> src/content/sources.json (deterministik, idempotent).
// Kullanım: npm run sources:build
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(root, 'content-source/soruces.md')
const OUT = resolve(root, 'src/content/sources.json')

/** Parantez içinde yalnızca kısaltmalar kalır; İngilizce karşılıklar ve ek notlar atılır. */
const KEEP_PAREN = new Set(['UX'])
/** Kategori sayılmayan sarmalayıcı başlıklar: altındaki #### başlıkları kategori olur. */
const WRAPPER = /^İlk Listede Yer Almayan/

const clean = (raw) =>
  raw
    .replace(/\*\*/g, '')
    .replace(/^\d+\.\s*/, '')
    .replace(/\s*\(([^)]*)\)/g, (m, inner) => (KEEP_PAREN.has(inner.trim()) ? m : ''))
    .replace(/\s+/g, ' ')
    .trim()

const slug = (s) =>
  s.toLocaleLowerCase('tr')
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const lines = readFileSync(SRC, 'utf8').split(/\r?\n/)
const tools = []
let group = 'ana'
let category = null
let subcategory = null
let usesSubAsCategory = false
let cur = null
let fence = null // { lang, buf }
let section = 'desc' // desc | scenario

const finish = () => {
  if (!cur) return
  cur.description = cur.description.join(' ').replace(/\s+/g, ' ').trim()
  cur.scenario = cur.scenario.length ? cur.scenario.join(' ').replace(/\s+/g, ' ').trim() : null
  tools.push(cur)
  cur = null
}

for (const line of lines) {
  if (fence) {
    if (/^\s*```/.test(line)) {
      const indent = Math.min(...fence.buf.filter((l) => l.trim()).map((l) => l.match(/^\s*/)[0].length), Infinity)
      const code = fence.buf.map((l) => l.slice(Number.isFinite(indent) ? indent : 0)).join('\n').trim()
      if (cur) cur.snippets.push({ lang: fence.lang, code })
      fence = null
    } else fence.buf.push(line)
    continue
  }
  const t = line.trim()
  const fenceOpen = t.match(/^```(\S*)/)
  if (fenceOpen) { fence = { lang: fenceOpen[1] || 'text', buf: [] }; continue }

  if (/^## AYRICA/.test(t)) { finish(); group = 'ayrica'; category = null; subcategory = null; usesSubAsCategory = true; continue }
  const h3 = t.match(/^### (.+)/)
  if (h3) {
    finish()
    const title = clean(h3[1])
    subcategory = null
    if (WRAPPER.test(title)) { category = null; usesSubAsCategory = true } else { category = title; usesSubAsCategory = false }
    continue
  }
  const h4 = t.match(/^#### (.+)/)
  if (h4) {
    finish()
    const title = clean(h4[1])
    if (usesSubAsCategory) { category = title; subcategory = null } else subcategory = title
    continue
  }
  const item = t.match(/^\* \*\*(.+?)\*\*\s*$/)
  if (item) {
    finish()
    if (!category) throw new Error(`Kategorisiz araç: ${item[1]}`)
    cur = { name: item[1].trim(), category, subcategory, group, description: [], snippets: [], scenario: [] }
    section = 'desc'
    continue
  }
  if (!cur || !t || /^-{3,}$/.test(t)) continue
  const sc = t.match(/^\*\*Kullanım Senaryosu:\*\*\s*(.*)/)
  if (sc) { section = 'scenario'; if (sc[1]) cur.scenario.push(sc[1]); continue }
  if (cur.snippets.length === 0 && section === 'desc') cur.description.push(t)
  else if (section === 'scenario') cur.scenario.push(t)
}
finish()

// Kimlikler: kategori+ad slug'ı; çakışmada sayısal sonek.
const seen = new Map()
const dupNames = new Map()
for (const tool of tools) {
  dupNames.set(tool.name, (dupNames.get(tool.name) ?? 0) + 1)
  const base = slug(`${tool.category} ${tool.name}`)
  const n = (seen.get(base) ?? 0) + 1
  seen.set(base, n)
  tool.id = n === 1 ? base : `${base}-${n}`
}
const out = tools.map(({ id, name, category, subcategory, group, description, snippets, scenario }) => ({
  id, name, category, subcategory, group, description, snippets, scenario,
}))
writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n')

// Rapor
const by = (key) => out.reduce((m, t) => ((m[key(t)] = (m[key(t)] ?? 0) + 1), m), {})
console.log(`Toplam araç: ${out.length}`)
console.log('Grup:', by((t) => t.group))
console.log('Kategori:', by((t) => `${t.group}/${t.category}`))
console.log('Kod yok:', out.filter((t) => !t.snippets.length).map((t) => t.name))
console.log('Açıklama yok:', out.filter((t) => !t.description).map((t) => t.name))
console.log('Tekrarlı adlar:', [...dupNames].filter(([, c]) => c > 1).map(([n, c]) => `${n} x${c}`))
console.log('Senaryolu:', out.filter((t) => t.scenario).length)
