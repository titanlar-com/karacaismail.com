# karacaismail.com

İsmail Karaca'nın kişisel ve danışmanlık sitesi. Astro 7 (statik HTML), React 19 + Mantine 9 adacıkları, GSAP ScrollTrigger, anime.js ve Lenis ile hareket.

Mimari MVVM + OOP'dir, içerik önce JSON'dadır. Ayrıntı ve kalıcı kararlar: [AGENTS.md](AGENTS.md).

## Komutlar

```sh
npm ci
npm run dev            # geliştirme sunucusu
npm run check          # astro check (tip denetimi)
npm run build          # üretim derlemesi (dist/)
npm run sources:build  # content-source/soruces.md -> src/content/sources.json
npm run art:bogaz      # Boğaz illüstrasyonunu yeniden üretir
npx playwright test    # Chromium, Firefox, WebKit
```

## Yayın

`main` dalına her gönderim, testler geçtikten sonra GitHub Pages'e dağıtılır (`.github/workflows/deploy.yml`). Alan adı Cloudflare DNS üzerindedir; `public/CNAME` özel alan adını sabitler.

## İçerik

Tüm metin `src/content/*.json` içindedir ve `src/content.config.ts` şemalarıyla derleme sırasında doğrulanır. Yalnızca GitHub profili, açık depo README'leri ve site sahibinin beyanından türetilmiş, doğrulanabilir bilgi girilir.
