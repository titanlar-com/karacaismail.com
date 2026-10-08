# karacaismail.com

İsmail Karaca'nın kişisel ve danışmanlık sitesi. Vite, React 19, TypeScript, Mantine 9, GSAP (ScrollTrigger), anime.js ve Lenis.

## Komutlar

```sh
npm ci
npm run dev        # geliştirme sunucusu
npx tsc -b         # tip denetimi
npm run build      # üretim derlemesi (dist/)
npx playwright test  # Chromium, Firefox, WebKit regresyon testleri
```

## Yayın

`main` dalına her gönderim GitHub Pages'e dağıtılır (`.github/workflows/deploy.yml`). Alan adı Cloudflare DNS üzerindedir; `public/CNAME` özel alan adını sabitler.

## İçerik kaynağı

Tüm içerik `src/data/site.ts` dosyasındadır; yalnızca GitHub profili, açık depo README'leri ve site sahibinin beyanından türetilmiştir. Doğrulanmamış müşteri, yıl veya rakam eklenmez.

## Arayüz kuralları

Tasarım tokenları `src/styles/tokens.css`. Tüm metinler en az 1 rem; 320 px öncelikli; odak yalnızca odaklanan öğede (`:focus-visible`); hareket `prefers-reduced-motion` ile kapanır.
