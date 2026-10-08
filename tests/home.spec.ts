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

/** client:visible adacıkları görünür olunca hidrate olur; etkileşimden önce bunu bekle. */
async function hydrated(page: Page, inner: string) {
  await page.evaluate(async (sel) => {
    const e = document.querySelector(sel) as HTMLElement
    e.scrollIntoView({ block: 'center' })
    const isl = e.closest('astro-island')
    if (!isl || !isl.hasAttribute('ssr')) return
    await new Promise<void>((res) => {
      new MutationObserver(() => { if (!isl.hasAttribute('ssr')) res() }).observe(isl, { attributes: true })
    })
  }, inner)
}

async function settle(page: Page, path = '/') {
  await page.goto(path)
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(1500)
}

test.describe('içerik önce JSON, Astro statik HTML (SEO)', () => {
  test('ham HTML, JS çalışmadan başlık, sahneler, SSS yanıtları ve yapılandırılmış veriyi içerir', async ({ request }) => {
    const html = await (await request.get('/')).text()
    expect(html).toContain('<html lang="tr"')
    expect(html).toContain('Stratejiyi mimariye,')
    for (const t of ['Önce çizerim.', 'Sonra düzenlerim.', 'Sonra yazarım.', 'Sonra bir ajana devrederim.']) expect(html).toContain(t)
    expect(html).toContain('Fractional (yarı zamanlı) CTO ne demek?')
    expect(html).toContain('Kendi kaynağından'.toLowerCase().slice(0, 0) + 'Gösterilen kod bu sitenin kendi kaynağından.')
    const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
    expect(ld).not.toBeNull()
    const graph = JSON.parse(ld![1])['@graph']
    expect(graph.map((g: { '@type': string }) => g['@type']).sort()).toEqual(['FAQPage', 'Person'])
    expect(html).toContain('rel="canonical" href="https://karacaismail.com/"')
  })

  test('kod sahnesi sitenin gerçek kaynağından alınır (Faq modeli)', async ({ request }) => {
    const html = await (await request.get('/')).text()
    expect(html).toContain('FaqData')
    expect(html).toContain('toQuestionLd')
  })

  test('client:visible adacıkları ekrana gelmeden hidrate edilmez, gelince hidrate edilir', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 })
    await settle(page)
    expect(await page.locator('astro-island').count()).toBeGreaterThanOrEqual(3)
    await expect(page.locator('#sss astro-island')).toHaveAttribute('ssr', '')
    await hydrated(page, '#sss button')
    await expect(page.locator('#sss astro-island')).not.toHaveAttribute('ssr', '')
  })

  test('kod sahnesi gösterdiği kaynak aralığıyla uyumlu: Faq modeli sınıfıyla başlar', async ({ page }) => {
    await settle(page)
    const text = await page.evaluate(() => (document.querySelector('#kod .code') as HTMLElement).textContent!.trim())
    expect(text.startsWith('export interface FaqData')).toBe(true)
  })

  test('404 sayfası: durum kodu, başlık ve noindex', async ({ page }) => {
    const res = await page.goto('/boyle-bir-sayfa-yok')
    expect(res?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Aradığınız sayfa burada değil')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
  })
})

test.describe('uyarlanabilir yerleşim', () => {
  for (const w of WIDTHS) {
    test(`${w}px: yatay taşma yok ve metin en az 1rem`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: w < 600 ? 700 : 900 })
      await settle(page)
      const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
      expect(over, 'sayfada yatay taşma').toBeLessThanOrEqual(0)
      expect(await page.evaluate(smallText), '1rem altı metin').toEqual([])
    })
  }

  test('yatay telefon (667x375): taşma yok', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 })
    await settle(page)
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0)
  })
})

test.describe('sabitlenen hizmetler şeridi kırpılmaz', () => {
  for (const [w, h] of [[1280, 650], [1280, 720], [1366, 768], [1280, 800], [1440, 900], [1920, 1080]] as const) {
    test(`${w}x${h}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h })
      await settle(page)
      const r = await page.evaluate(() => {
        const s = document.getElementById('hizmetler') as HTMLElement
        const track = s.querySelector('[data-track]') as HTMLElement
        const stage = track.parentElement as HTMLElement
        const bottom = stage.offsetTop + track.offsetTop + track.offsetHeight
        return { clip: bottom - s.clientHeight, pinned: s.classList.contains('is-pinned') }
      })
      // 44rem (704px) altında şerit sabitlenmez, içerik alt alta akar
      if (h < 704) expect(r.pinned, 'alçak ekranda sabitlenmemeli').toBe(false)
      else {
        expect(r.pinned).toBe(true)
        expect(r.clip, 'içerik bölüm yüksekliğinden büyük').toBeLessThanOrEqual(1)
      }
    })
  }
})

test.describe('sahneler her ekranda ve JS olmadan okunur kalır', () => {
  for (const [w, h] of [[320, 568], [390, 844], [667, 375], [768, 1024], [1280, 650]] as const) {
    test(`${w}x${h}: yapışkan sahne ya sığar ya da normal akışta kalır`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h })
      await settle(page)
      const r = await page.evaluate(() =>
        ['duzen', 'kod', 'zeka'].map((id) => {
          const root = document.getElementById(id) as HTMLElement
          const live = root.classList.contains('is-live')
          const fit = root.querySelector('[data-fit]') as HTMLElement
          const stage = root.querySelector('.stage') as HTMLElement
          return {
            id, live,
            fits: !live || fit.offsetHeight + 72 + 24 <= innerHeight,
            sticky: getComputedStyle(stage).position === 'sticky',
            tall: root.offsetHeight / innerHeight,
          }
        }),
      )
      for (const a of r) {
        expect(a.fits, `${a.id} görünüm penceresine sığmıyor`).toBe(true)
        expect(a.sticky, `${a.id}: yapışkan yalnızca etkinken`).toBe(a.live)
        if (!a.live) expect(a.tall, `${a.id}: etkin değilken yüksek boşluk kalmamalı`).toBeLessThan(2.6)
      }
    })
  }

  test('JS kapalı: sahneler normal akışta, başlık ve içerikler okunur', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
    const page = await ctx.newPage()
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const r = await page.evaluate(() =>
      ['cizim', 'duzen', 'kod', 'zeka', 'yaklasim', 'hizmetler'].map((id) => {
        const root = document.getElementById(id) as HTMLElement
        const stage = root.querySelector('.stage, .sticky') as HTMLElement
        return { id, h: root.offsetHeight / innerHeight, sticky: stage ? getComputedStyle(stage).position === 'sticky' : false }
      }),
    )
    for (const a of r) {
      expect(a.sticky, `${a.id} JS yokken yapışkan olmamalı`).toBe(false)
      expect(a.h, `${a.id} JS yokken yüksek boşluk bırakmamalı`).toBeLessThan(2.6)
    }
    await expect(page.locator('#yaklasim .list h3', { hasText: 'Mimari' })).toBeVisible()
    await ctx.close()
  })
})

test.describe('klavye ve bağlantılar', () => {
  test('klavyeyle sayfa içi gezinme: hedefe odak gider, bölüme odak çerçevesi çizilmez', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await settle(page)
    await page.getByRole('navigation', { name: 'Ana gezinme' }).getByRole('link', { name: 'Hizmetler' }).focus()
    await page.keyboard.press('Enter')
    await page.waitForTimeout(2200)
    const r = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement
      const cs = getComputedStyle(el)
      return { id: el.id, outline: cs.outlineStyle, w: cs.outlineWidth }
    })
    expect(r.id).toBe('hizmetler')
    expect(r.outline === 'none' || r.w === '0px', 'bölüm odak çerçevesi').toBe(true)
  })

  test('atlama bağlantısı ana içeriğe odak verir, çerçeve çizmez', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await settle(page)
    await page.locator('.skip-link').focus()
    await page.keyboard.press('Enter')
    await page.waitForTimeout(400)
    const r = await page.evaluate(() => { const el = document.activeElement as HTMLElement; const cs = getComputedStyle(el); return { id: el.id, outline: cs.outlineStyle, w: cs.outlineWidth } })
    expect(r.id).toBe('icerik')
    expect(r.outline === 'none' || r.w === '0px').toBe(true)
  })

  test('soğuk açılış /#iletisim: pin aralıklarından sonra doğru bölüme iner', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/#iletisim')
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(3500)
    const top = await page.evaluate(() => document.getElementById('iletisim')!.getBoundingClientRect().top)
    expect(Math.abs(top - 64), `iletişim bölümü üstten ${Math.round(top)}px`).toBeLessThan(120)
  })

  test('/kaynaklar sayfasından "İletişim" bağlantısı ana sayfada doğru bölüme iner', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/kaynaklar')
    await page.getByRole('navigation', { name: 'Ana gezinme' }).getByRole('link', { name: 'İletişim' }).click()
    await page.waitForURL('**/#iletisim')
    await page.waitForTimeout(3500)
    const top = await page.evaluate(() => document.getElementById('iletisim')!.getBoundingClientRect().top)
    expect(Math.abs(top - 64)).toBeLessThan(120)
  })
})

test.describe('erişilebilir adlar', () => {
  test('h1 tam cümle adı taşır; sayılar ve ilke metinleri gerçek metindir', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await settle(page)
    await expect(page.getByRole('heading', { level: 1, name: 'Stratejiyi mimariye, mimariyi çalışan ürüne çeviririm.' })).toBeVisible()
    // Sayaçlar görünür alana girince 0'dan sayar; ham HTML'de son değerler zaten vardır
    const stats = page.locator('dl').first()
    await stats.scrollIntoViewIfNeeded()
    await expect(stats).toContainText('93+', { timeout: 6000 })
    await expect(stats).toContainText('920')
  })
  test('süs sahnelerinin bileşenleri odaklanamaz ve okunmaz (aria-hidden + inert)', async ({ page }) => {
    await settle(page)
    expect(await page.evaluate(() => {
      const board = document.querySelector('#duzen [aria-hidden="true"][inert]')
      return !!board && [...board.querySelectorAll('button,a,input')].every((e) => e.closest('[inert]'))
    })).toBe(true)
  })
})

test.describe('etkileşim ve erişilebilirlik', () => {
  test('hata, açık liste ve çekmece durumlarında da metin en az 1rem', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 700 })
    await settle(page)
    await hydrated(page, 'form')
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
    await hydrated(page, 'form')
    const msg = page.getByRole('textbox', { name: /Mesajınız/ })
    await msg.fill('Merhaba')
    await page.getByRole('button', { name: 'E-posta taslağını aç' }).click()
    const name = page.getByRole('textbox', { name: /Adınız/ })
    await expect(name).toBeFocused()
    await expect(name).toHaveAttribute('aria-invalid', 'true')
    await expect(msg).not.toHaveAttribute('aria-invalid', 'true')
  })

  test('klavye odağı Mantine kontrollerinde tek, tokenlı ve 3px', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await settle(page)
    await page.keyboard.press('Tab')
    await hydrated(page, '#sss button')
    const faq = page.getByRole('button', { name: /Fractional/ })
    await hydrated(page, 'form')
    const targets = [
      page.getByRole('link', { name: 'Birlikte çalışalım' }),
      faq,
      page.getByRole('textbox', { name: /Adınız/ }),
      page.getByRole('button', { name: 'E-posta taslağını aç' }),
      page.getByRole('link', { name: /meta-framer/ }),
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
    await page.locator('.skip-link').focus()
    const f = await page.evaluate(() => { const el = document.activeElement as HTMLElement; const cs = getComputedStyle(el); return { text: el.textContent, s: cs.outlineStyle } })
    expect(f.text).toContain('İçeriğe geç')
    expect(f.s).not.toBe('none')
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

  test('iletişim formu boş gönderimde alan başına hata gösterir', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await settle(page)
    await hydrated(page, 'form')
    await page.getByRole('button', { name: 'E-posta taslağını aç' }).click()
    await expect(page.getByText('Lütfen adınızı yazın.')).toBeVisible()
    await expect(page.getByText('Lütfen mesajınızı yazın.')).toBeVisible()
  })

  test('SSS akordeonu klavye ile açılır', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await settle(page)
    await hydrated(page, '#sss button')
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
      const sec = document.getElementById('yaklasim') as HTMLElement
      window.scrollTo(0, sec.getBoundingClientRect().top + scrollY + innerHeight * 1.15)
      await new Promise((r) => setTimeout(r, 2500))
      const cv = sec.querySelector('canvas') as HTMLCanvasElement
      const d = cv.getContext('2d')!.getImageData(0, 0, cv.width, cv.height).data
      let n = 0
      for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++
      return n
    })
    expect(lit).toBeGreaterThan(2000)
  })

  test('çizim sahnesi: kaydırınca çizgiler çizilir (stroke-dashoffset 1 den 0 a)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await settle(page)
    const offs = await page.evaluate(async () => {
      const sec = document.getElementById('cizim') as HTMLElement
      const p = sec.querySelector('[data-draw]') as SVGPathElement
      const top = sec.getBoundingClientRect().top + scrollY
      window.scrollTo(0, top + 20)
      await new Promise((r) => setTimeout(r, 1500))
      const start = parseFloat(getComputedStyle(p).strokeDashoffset)
      window.scrollTo(0, top + innerHeight * 1.4)
      await new Promise((r) => setTimeout(r, 2000))
      const end = parseFloat(getComputedStyle(p).strokeDashoffset)
      return { start, end }
    })
    expect(offs.start).toBeGreaterThan(offs.end)
  })

  test('azaltılmış hareket: tuval etkinleşmez, aşamalar düz metin olarak görünür', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 800 } })
    const page = await ctx.newPage()
    await page.goto('/')
    await page.waitForTimeout(800)
    await expect(page.locator('#yaklasim.is-live')).toHaveCount(0)
    await expect(page.locator('#yaklasim .list h3', { hasText: 'Mimari' })).toBeVisible()
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
