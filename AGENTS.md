# karacaismail.com proje yönergeleri

Genel kişisel kurallar (Git yazarlığı, açık kaynak, Colima, arayüz ve QA) `~/.claude/CLAUDE.md` ve `~/AGENTS.md` içindedir. Bu dosya yalnızca bu projeye özgü kalıcı kararları tutar.

## Varsayılan yazı tipi: Outfit (kalıcı, değişmez kural)

- Bu projenin varsayılan ve ilk sıradaki yazı tipi **Outfit**'tir (Google Fonts, değişken eksen, `@fontsource-variable/outfit` ile projeye gömülür, uzak yazı tipi servisi kullanılmaz).
- Kullanıcı açıkça başka bir yazı tipi belirtmedikçe her yeni sayfa, bileşen, tuval çizimi, OG görseli ve belge Outfit kullanır. Başlık, gövde, etiket ve kod dahil hiçbir yerde Outfit'in önüne başka yazı tipi konmaz.
- Merkez: `src/styles/tokens.css` içindeki `--font-display`, `--font-body`, `--font-mono` ve `src/main.tsx` içindeki Mantine teması. Bileşenlerde sabit yazı tipi adı yazma; tokenları kullan.
- Metin boyutu en az 1rem kuralı Outfit için de geçerlidir.
- Bu kural yalnızca kullanıcının açık talimatıyla değişir. Bir kütüphane, şablon veya öneri bunu değiştiremez.

## Mimari (kalıcı kararlar): MVVM + OOP, içerik önce JSON, Astro ön planda, Mantine ana kütüphane

- **Desen: MVVM** (MVC değil; bu seçim değişmez). Her şey sınıf tabanlı (OOP) ve sürdürülebilir olmalı.
  - **Model**: `src/models/*` sınıfları. `Entity` tabanından türer, JSON verisini sarar, küçük türetilmiş özellikler sunar (ör. `Work.ariaLabel`). İş kuralı ve biçimlendirme burada veya ViewModel'dedir, görünümde değil.
  - **Repository**: `src/repositories/*`. `ContentRepository` alt sınıfları; JSON koleksiyonlarını okuyup Model nesnelerine çevirir. Görünümler koleksiyonu doğrudan okumaz.
  - **ViewModel**: `src/viewmodels/*`. Bir sayfanın ihtiyacı olan her şeyi toplar (`HomeViewModel`). Saf TypeScript olan ViewModel'ler (ör. `SourcesViewModel`) `astro:content` import etmez, böylece React adacığında da çalışır.
  - **View**: `src/views/*` (Astro bileşenleri ve Mantine/React adacıkları). Yalnızca ViewModel özelliklerini sunar. `src/pages/*` ince tutulur: ViewModel'i yükler, görünümleri sıralar.
  - **Hareket**: `src/motion/*`. Her efekt `Effect` soyut sınıfından türeyen bir sınıftır; statik HTML'e `data-effect="ad"` ile bağlanır ve `src/motion/boot.ts` kaydında tembel yüklenir. Yeni efekt = yeni sınıf + kayıtta bir satır.
- **İçerik önce JSON'da**: tüm metinler `src/content/*.json` içindedir ve `src/content.config.ts` içindeki zod şemalarıyla derleme sırasında doğrulanır. Bileşenlerde sabit metin yazma. `file()` yükleyicisi girdileri kimliğe göre sıralar; sıra gerekiyorsa JSON'a `order` alanı ekle ve Model'de sırala.
- **Astro ön planda** (performans ve SEO): çıktı statik HTML'dir; metinler JS olmadan DOM'da bulunur. JS yalnızca ilerleyici iyileştirmedir. React/Mantine yalnızca etkileşimli adacıklarda (`client:idle`, `client:visible`, `client:load`) ve Mantine bileşeninin statik çizildiği yerlerde (`Providers` ile, client direktifi olmadan) kullanılır. Süs amaçlı bileşenler `aria-hidden` + `inert` olur.
- **Mantine ana kütüphane**: form, tablo, menü, akordeon, düğme, seçim kutuları Mantine'dir; stil `src/styles/tokens.css` tokenlarıyla yapılır, kütüphane varsayılanı tasarım kararı sayılmaz.
- **Yeteneklerin sergilenmesi**: grafik illüstrasyon, UX estetiği, kodlama ve yapay zekâ "Yetenekler" gibi bir başlık altında listelenmez (kalıcı kural). Ziyaretçi sayfayı gezerken bunu hisseder: dört sahne (`acts.json`: çizim, düzen, kod, ajan) kaydırmayla oynar. Yeni içerik de bu ilkeyi izler: anlatma, göster.
- **Ajan akışı sahnesi** canlı model çağrısı değildir; sahne olarak tasarlanmıştır ve bu `note` alanında açıkça yazılıdır. Kod sahnesi sitenin gerçek kaynak dosyasını okur (`acts.json > source`; `tests/home.spec.ts` bunu doğrular).
- **Ekler**: `/kaynaklar` sayfası `content-source/soruces.md` dosyasından `npm run sources:build` ile üretilen `src/content/sources.json` verisini tablo ve filtrelerle sunar. Çizim `npm run art:bogaz` ile üretilir (`scripts/art/bogaz.mjs`); `BogazSvg.astro` elle düzenlenmez.

## Proje bilgisi

- Yığın: Astro 7, React 19, TypeScript, Mantine 9, GSAP ScrollTrigger, anime.js 4, Lenis, Playwright.
- Yayın: GitHub Pages (Actions), özel alan adı `karacaismail.com`, DNS Cloudflare'de ve DNS only (gri bulut). GitHub Pages A kayıtları yalnızca `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (başka adres yazma).
- Doğrulama: `npx astro check` ve `npx playwright test` (Chromium, Firefox, WebKit; `playwright.config.ts` yalnızca 4399 portunda kendi önizlemesini kullanır, başka projelerin sunucusunu yeniden kullanmaz). Testler `deploy.yml` içinde dağıtımdan önce zorunlu çalışır. `astro preview` proje başına tek örnek çalıştırır; test için `--ignore-lock` kullanılır.
- Aynı anda iki `astro build/check/dev` çalıştırma: `.astro` ve `dist` klasörleri çakışır.
- Lisans henüz seçilmedi; sahibi onaylamadan LICENSE ekleme.
