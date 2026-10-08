import { expect, test, type Page } from '@playwright/test'

const WIDTHS = [320, 360, 375, 390, 768, 1280]
const FOCUS = 'rgb(255, 178, 127)'

const smallText = () => {
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
}

async function settle(page: Page) {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(1500)
}

test.describe('uyarlanabilir yerleşim', () => {
  for (const w of WIDTHS) {
    test(`${w}px: yatay taşma yok ve metin en az 1rem`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: w < 600 ? 700 : 900 })
      await settle(page)
      const r = await page.evaluate(() => {
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
        return { over: document.documentElement.scrollWidth - innerWidth, small }
      })
      expect(r.over, 'sayfada yatay taşma').toBeLessThanOrEqual(0)
      expect(r.small, '1rem altı metin').toEqual([])
    })
  }
})

test('yatay telefon (667x375): taşma yok', async ({ page }) => {
  await page.setViewportSize({ width: 667, height: 375 })
  await settle(page)
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0)
})

test.describe('sabitlenen hizmetler şeridi kırpılmaz', () => {
  for (const [w, h] of [[1280, 650], [1280, 720], [1366, 768], [1280, 800], [1440, 900], [1920, 1080]] as const) {
    test(`${w}x${h}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h })
      await settle(page)
      const r = await page.evaluate(() => {
        const s = document.getElementById('hizmetler') as HTMLElement
        // Dönüşümlerden etkilenmeyen yerleşim ölçüsü: şeridin alt kenarı bölüm yüksekliğini aşmamalı
        const track = s.querySelector('[data-card]')!.parentElement as HTMLElement
        const stage = track.parentElement as HTMLElement
        const bottom = stage.offsetTop + track.offsetTop + track.offsetHeight
        return { clip: bottom - s.clientHeight, pinned: getComputedStyle(track).display === 'flex' }
      })
      // 44rem (704px) altında şerit sabitlenmez, içerik alt alta akar: kırpma ölçüsü anlamsız
      if (h < 704) expect(r.pinned, 'alçak ekranda sabitlenmemeli').toBe(false)
      else expect(r.clip, 'içerik bölüm yüksekliğinden büyük').toBeLessThanOrEqual(1)
    })
  }
})

test.describe('erişilebilir adlar', () => {
  test('h1 ve sayılar ekran okuyucuya gerçek metin verir', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await settle(page)
    await expect(page.getByRole('heading', { level: 1, name: 'Stratejiyi mimariye, mimariyi çalışan ürüne çeviririm.' })).toBeVisible()
    await expect(page.locator('dl').first()).toContainText('93+')
    await expect(page.locator('dl').first()).toContainText('920')
  })
})

test.describe('etkileşim ve erişilebilirlik', () => {
  test('hata, açık liste ve çekmece durumlarında da metin en az 1rem', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 700 })
    await settle(page)
    await page.getByRole('button', { name: 'E-posta taslağını aç' }).click()
    await expect(page.getByText('Lütfen adınızı yazın.')).toBeVisible()
    await page.getByLabel('Konu').first().click()
    await expect(page.getByRole('option').first()).toBeVisible()
    expect(await page.evaluate(smallText), 'hata ve liste').toEqual([])
    await page.keyboard.press('Escape')
    await page.getByRole('button', { name: 'Menüyü aç' }).click()
    await expect(page.getByRole('navigation', { name: 'Mobil gezinme' })).toBeVisible()
    expect(await page.evaluate(smallText), 'çekmece').toEqual([])
  })

  test('hata ilk geçersiz alana odak verir ve alan başına bildirilir', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await settle(page)
    await page.getByRole('textbox', { name: /Mesajınız/ }).fill('Merhaba')
    await page.getByRole('button', { name: 'E-posta taslağını aç' }).click()
    const name = page.getByRole('textbox', { name: /Adınız/ })
    await expect(name).toBeFocused()
    await expect(name).toHaveAttribute('aria-invalid', 'true')
    await expect(page.getByRole('textbox', { name: /Mesajınız/ })).not.toHaveAttribute('aria-invalid', 'true')
  })

  test('klavye odağı Mantine kontrollerinde tek, tokenlı ve 3px', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await settle(page)
    await page.keyboard.press('Tab')
    const targets = [
      page.getByRole('link', { name: 'Birlikte çalışalım' }),
      page.getByRole('button', { name: /Fractional/ }),
      page.getByRole('textbox', { name: /Adınız/ }),
      page.getByRole('button', { name: 'E-posta taslağını aç' }),
      page.getByRole('link', { name: /Frappe Headless SaaS/ }),
    ]
    for (const t of targets) {
      await t.focus()
      const o = await t.evaluate((el) => { const c = getComputedStyle(el); return { w: c.outlineWidth, s: c.outlineStyle, c: c.outlineColor } })
      expect(o.s).not.toBe('none')
      expect(o.w).toBe('3px')
      expect(o.c).toBe(FOCUS)
    }
  })

  test('atlama bağlantısı odaklanınca görünür odak göstergesi çizer', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await settle(page)
    // WebKit varsayılan olarak Tab ile bağlantılara odaklanmaz; odağı doğrudan ver
    await page.locator('.skip-link').focus()
    const f = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement
      const cs = getComputedStyle(el)
      return { text: el.textContent, outlineWidth: cs.outlineWidth, outlineStyle: cs.outlineStyle }
    })
    expect(f.text).toContain('İçeriğe geç')
    expect(f.outlineStyle).not.toBe('none')
  })

  test('fare tıklaması bölüm ve kapsayıcılarda odak çerçevesi bırakmaz', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await settle(page)
    await page.mouse.click(640, 400)
    const framed = await page.evaluate(() =>
      [...document.querySelectorAll('section, main, header, footer, ul, ol, article')].filter((e) => {
        const cs = getComputedStyle(e)
        return cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0
      }).length,
    )
    expect(framed).toBe(0)
  })

  test('mobilde menü çekmecesi açılır, bağlantılar odaklanabilir, Escape kapatır', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 })
    await settle(page)
    await page.getByRole('button', { name: 'Menüyü aç' }).click()
    const nav = page.getByRole('navigation', { name: 'Mobil gezinme' })
    await expect(nav).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Hizmetler' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(nav).toBeHidden()
  })

  test('iletişim formu boş gönderimde hata gösterir', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await settle(page)
    await page.getByRole('button', { name: 'E-posta taslağını aç' }).click()
    await expect(page.getByText('Lütfen adınızı yazın.')).toBeVisible()
    await expect(page.getByText('Lütfen mesajınızı yazın.')).toBeVisible()
  })

  test('SSS akordeonu klavye ile açılır', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await settle(page)
    const q = page.getByRole('button', { name: /Fractional/ })
    await q.focus()
    await page.keyboard.press('Enter')
    await expect(q).toHaveAttribute('aria-expanded', 'true')
  })
})

test.describe('hareket', () => {
  test('parçacık sahnesi kaydırınca kelimeyi çizer (tuval boş değil)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await settle(page)
    const lit = await page.evaluate(async () => {
      const sec = document.querySelector('[aria-labelledby=yaklasim-baslik]') as HTMLElement
      window.scrollTo(0, sec.getBoundingClientRect().top + scrollY + innerHeight * 1.15)
      await new Promise((r) => setTimeout(r, 2500))
      const cv = document.querySelector('canvas') as HTMLCanvasElement
      const d = cv.getContext('2d')!.getImageData(0, 0, cv.width, cv.height).data
      let n = 0
      for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++
      return n
    })
    expect(lit).toBeGreaterThan(2000)
  })

  test('azaltılmış hareket: tuval yok, aşamalar düz metin olarak görünür', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 800 } })
    const page = await ctx.newPage()
    await page.goto('/')
    await page.waitForTimeout(800)
    await expect(page.locator('canvas')).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Mimari', level: 3, exact: true })).toBeVisible()
    await ctx.close()
  })

  test('konsolda hata yok', async ({ page }) => {
    const errs: string[] = []
    page.on('pageerror', (e) => errs.push(e.message))
    page.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
    await settle(page)
    expect(errs).toEqual([])
  })
})
