import { readFileSync } from 'node:fs'
import { expect, test, type Page } from '@playwright/test'

const DATA = JSON.parse(readFileSync('src/content/sources.json', 'utf8')) as Array<{ snippets: Array<{ code: string }> }>
const CDN = DATA.filter((t) => t.snippets.some((s) => /https?:\/\//.test(s.code))).length

const WIDTHS = [320, 360, 375, 390, 768, 1280]
const TOTAL = 135

const rows = (page: Page) => page.getByTestId('row')
const count = (page: Page) => page.getByTestId('result-count')

async function open(page: Page, qs = '') {
  await page.goto(`/kaynaklar${qs}`)
  await page.evaluate(() => document.fonts.ready)
  // adacık hazır: URL durumu geri yüklendikten sonra
  await expect(rows(page).first()).toBeVisible()
  await page.waitForFunction(() => document.querySelector('[data-testid="sources-table"]') && (window as any).__ready !== false)
  await page.waitForTimeout(300)
}

const smallText = (page: Page) =>
  page.evaluate(() => {
    const small: string[] = []
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    let n: Node | null
    while ((n = walker.nextNode())) {
      const el = n.parentElement
      if (!el || !n.textContent?.trim() || el.closest('script,style,noscript')) continue
      const cs = getComputedStyle(el)
      if (cs.display === 'none' || cs.visibility === 'hidden') continue
      if (parseFloat(cs.fontSize) < 15.99) small.push(`${n.textContent.trim().slice(0, 24)} (${cs.fontSize})`)
    }
    return small
  })

async function pick(page: Page, label: string, option: RegExp | string) {
  await page.getByRole('combobox', { name: label, exact: true }).click()
  await page.getByRole('option', { name: option }).first().click()
}

test('ilk sayfa sunucu HTML ile gelir ve 24 satır gösterir', async ({ page }) => {
  await open(page)
  await expect(rows(page)).toHaveCount(24)
  await expect(count(page)).toContainText(`${TOTAL} sonuçtan 1–24`)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('arama Türkçe karakterlerle daralır', async ({ page }) => {
  await open(page)
  const search = page.getByRole('searchbox', { name: 'Ara' })
  await search.fill('animasyon')
  expect(await rows(page).count()).toBeGreaterThan(0)
  await expect(count(page)).not.toContainText(`${TOTAL} sonuç`)
  // aksan duyarsız eşleşme: "arayuz" ile "Arayüz" aynı sonucu verir
  await search.fill('Arayüz')
  const withAccent = await count(page).innerText()
  await search.fill('ARAYUZ')
  expect(await count(page).innerText()).toBe(withAccent)
  await search.fill('İŞLEM')
  await expect(count(page)).not.toHaveText('0 sonuç')
  await search.fill('zzzzyokboylebirsey')
  await expect(count(page)).toHaveText('0 sonuç')
  await expect(page.getByText('Bu filtrelerle eşleşen kaynak bulunamadı.')).toBeVisible()
  await page.getByRole('button', { name: 'Filtreleri temizle' }).first().click()
  await expect(count(page)).toContainText(`${TOTAL} sonuçtan`)
})

test('kategori ve alt kategori filtreleri ve sayımlar', async ({ page }) => {
  await open(page)
  await pick(page, 'Kategori', /^Tasarım ve Arayüz \(17\)$/)
  await expect(count(page)).toContainText('17 sonuçtan')
  await expect(page).toHaveURL(/kategori=Tasar/)
  // alt kategori seçenekleri seçili kategoriye göre daralır
  await pick(page, 'Alt kategori', /^Ikon Setleri \(\d+\)$/)
  const text = await count(page).innerText()
  expect(Number(text.split(' ')[0])).toBeLessThan(17)
  await expect(page).toHaveURL(/alt=Ikon/)
  // diğer filtreler kategori sayımına yansır: CDN anahtarı açıkken toplam azalmaz ama sayılar tutarlı kalır
  await page.getByRole('button', { name: 'Filtreleri temizle' }).first().click()
  await expect(count(page)).toContainText(`${TOTAL} sonuçtan`)
})

test('yalnızca CDN anahtarı kodsuz kayıtları eler', async ({ page }) => {
  await open(page)
  await page.getByRole('switch', { name: 'Yalnızca CDN kodu olanlar' }).check({ force: true })
  await expect(count(page)).toContainText(`${CDN} sonuçtan`)
  await expect(page).toHaveURL(/cdn=1/)
})

test('liste grubu ve sayfalama', async ({ page }) => {
  await open(page)
  await page.getByText(/^Ayrıca \(69\)$/).click()
  await expect(count(page)).toContainText('69 sonuçtan')
  await page.getByText(/^Tümü \(135\)$/).click()
  await page.getByRole('button', { name: 'Sayfa 2' }).click()
  await expect(count(page)).toContainText('25–48')
  await expect(page).toHaveURL(/sayfa=2/)
  await pick(page, 'Sayfa başına', '96')
  await expect(rows(page)).toHaveCount(96)
  await expect(page).toHaveURL(/adet=96/)
  await expect(page).not.toHaveURL(/sayfa=/)
})

test('URL parametreleri yenilemede durumu geri yükler', async ({ page }) => {
  await open(page, '?q=animasyon&cdn=1&sirala=name&yon=desc&adet=48')
  await expect(page.getByRole('searchbox', { name: 'Ara' })).toHaveValue('animasyon')
  await expect(page.getByRole('switch', { name: 'Yalnızca CDN kodu olanlar' })).toBeChecked()
  const first = await rows(page).first().innerText()
  await page.reload()
  await expect(page.getByRole('searchbox', { name: 'Ara' })).toHaveValue('animasyon')
  expect(await rows(page).first().innerText()).toBe(first)
  await expect(page.getByRole('combobox', { name: 'Sayfa başına' })).toHaveValue('48')
})

test('satır açılır, kod gösterilir ve kopyalanır', async ({ page, context, browserName }) => {
  if (browserName === 'chromium') await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await open(page, '?q=bulma')
  const toggle = rows(page).first().getByRole('button', { expanded: false })
  await toggle.click()
  await expect(rows(page).first().getByRole('button', { expanded: true })).toBeVisible()
  await expect(page.locator('pre code').first()).toContainText('bulma@1.0.0')
  await page.getByRole('button', { name: /kodunu kopyala/ }).first().click()
  await expect(page.getByRole('button', { name: /kodunu kopyala/ }).first()).toHaveText('Kopyalandı')
  if (browserName === 'chromium') {
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('bulma@1.0.0')
  }
  // kullanım senaryosu
  await open(page, '?q=confetti')
  await rows(page).first().getByRole('button').click()
  await expect(page.getByText('Kullanım senaryosu.')).toBeVisible()
})

test('klavye: Tab, Enter/Space ile aç, Escape ile açılır menüyü kapat', async ({ page }) => {
  await open(page, '?q=bulma')
  const btn = rows(page).first().getByRole('button', { name: /Bulma/ })
  await btn.focus()
  await page.keyboard.press('Enter')
  await expect(btn).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Space')
  await expect(btn).toHaveAttribute('aria-expanded', 'false')
  // odak göstergesi tek ve yalnızca odaklanan düğmede
  const ring = await btn.evaluate((el) => getComputedStyle(el).outlineStyle)
  expect(ring).toBe('solid')
  // açılır menü: aç, Escape ile kapat
  const cat = page.getByRole('combobox', { name: 'Kategori', exact: true })
  await cat.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('option').first()).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('option').first()).toBeHidden()
})

test('fare tıklaması kapsayıcılarda odak çerçevesi bırakmaz', async ({ page }) => {
  await open(page)
  await page.getByTestId('table-scroller').click({ position: { x: 5, y: 5 } })
  const outline = await page.getByTestId('table-scroller').evaluate((el) => getComputedStyle(el).outlineStyle)
  expect(outline).toBe('none')
})

for (const w of WIDTHS) {
  test(`${w}px: sayfa taşmaz, metin >= 1rem (açık menü ve ayrıntı dahil)`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: w < 600 ? 700 : 900 })
    await open(page)
    await rows(page).first().getByRole('button').click()
    await page.getByRole('combobox', { name: 'Kategori', exact: true }).click()
    await expect(page.getByRole('option').first()).toBeVisible()
    expect(await smallText(page), '1rem altı metin').toEqual([])
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), 'sayfa taşması').toBeLessThanOrEqual(0)
    await page.keyboard.press('Escape')
    // kelime ortasından bölünme yok: ilk sütunda break-all/anywhere kullanılmaz
    const wrap = await rows(page).first().locator('td').first().evaluate((el) => {
      const cs = getComputedStyle(el)
      return `${cs.wordBreak}|${cs.overflowWrap}`
    })
    expect(wrap).not.toMatch(/break-all|anywhere/)
  })
}

test('320px: tablo kendi kapsayıcısında yatay kayar, sayfa kaymaz', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 })
  await open(page)
  const m = await page.getByTestId('table-scroller').evaluate((el) => ({ sw: el.scrollWidth, cw: el.clientWidth }))
  expect(m.sw).toBeGreaterThan(m.cw)
  await page.getByTestId('table-scroller').evaluate((el) => { el.scrollLeft = 200 })
  expect(await page.getByTestId('table-scroller').evaluate((el) => el.scrollLeft)).toBeGreaterThan(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0)
  expect(await page.evaluate(() => window.scrollX)).toBe(0)
  // klavyeyle odaklanınca yalnızca klavye odağında gösterge
  await page.keyboard.press('Tab')
})
