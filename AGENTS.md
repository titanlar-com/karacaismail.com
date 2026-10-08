# karacaismail.com proje yönergeleri

Genel kişisel kurallar (Git yazarlığı, açık kaynak, Colima, arayüz ve QA) `~/.claude/CLAUDE.md` ve `~/AGENTS.md` içindedir. Bu dosya yalnızca bu projeye özgü kalıcı kararları tutar.

## Varsayılan yazı tipi: Outfit (kalıcı, değişmez kural)

- Bu projenin varsayılan ve ilk sıradaki yazı tipi **Outfit**'tir (Google Fonts, değişken eksen, `@fontsource-variable/outfit` ile projeye gömülür, uzak yazı tipi servisi kullanılmaz).
- Kullanıcı açıkça başka bir yazı tipi belirtmedikçe her yeni sayfa, bileşen, tuval çizimi, OG görseli ve belge Outfit kullanır. Başlık, gövde, etiket ve kod dahil hiçbir yerde Outfit'in önüne başka yazı tipi konmaz.
- Merkez: `src/styles/tokens.css` içindeki `--font-display`, `--font-body`, `--font-mono` ve `src/main.tsx` içindeki Mantine teması. Bileşenlerde sabit yazı tipi adı yazma; tokenları kullan.
- Metin boyutu en az 1rem kuralı Outfit için de geçerlidir.
- Bu kural yalnızca kullanıcının açık talimatıyla değişir. Bir kütüphane, şablon veya öneri bunu değiştiremez.

## Proje bilgisi

- Yığın: Vite, React 19, TypeScript, Mantine 9, GSAP ScrollTrigger, anime.js 4, Lenis. İçerik tek dosyada: `src/data/site.ts`; yalnızca doğrulanabilir bilgi girilir.
- Yayın: GitHub Pages (Actions), özel alan adı `karacaismail.com`, DNS Cloudflare'de ve DNS only (gri bulut). GitHub Pages A kayıtları yalnızca `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
- Doğrulama: `npx tsc -b` ve `npx playwright test` (Chromium, Firefox, WebKit). Testler `deploy.yml` içinde dağıtımdan önce zorunlu çalışır.
- Lisans henüz seçilmedi; sahibi onaylamadan LICENSE ekleme.
