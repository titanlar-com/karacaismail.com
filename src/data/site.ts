// İçerik kaynağı: GitHub profili (karacaismail), public depo README'leri ve sahibin kendi beyanı.
// Doğrulanmamış iddia (müşteri adı, yıl, ciro, referans) bu dosyaya girmez.

export const SITE = {
  name: 'İsmail Karaca',
  role: 'CTO · Dijital Zekâ Stratejisti · Danışman',
  org: 'titanlar.com',
  orgUrl: 'https://titanlar.com',
  city: 'İstanbul',
  github: 'https://github.com/karacaismail',
  githubOrg: 'https://github.com/titanlar-com',
  // Cloudflare Email Routing ile kurulması gereken önerilen takma ad; kurulana kadar gönderim çalışmaz.
  email: 'merhaba@karacaismail.com',
} as const

export const NAV = [
  { id: 'hakkimda', label: 'Hakkımda' },
  { id: 'hizmetler', label: 'Hizmetler' },
  { id: 'surec', label: 'Süreç' },
  { id: 'calismalar', label: 'Çalışmalar' },
  { id: 'sss', label: 'SSS' },
] as const

export const STAGES = [
  { word: 'STRATEJİ', title: 'Strateji', text: 'Doğru soruyu bulur, kanıta dayalı bir karar çerçevesi kurarım. Neyi yapmayacağınız da karara dahildir.' },
  { word: 'MİMARİ', title: 'Mimari', text: 'Çok kiracılı SaaS, kimlik, veri ve yetki katmanlarını baştan doğru çizerim; sonradan söküm gerekmesin.' },
  { word: 'KOD', title: 'Uygulama', text: 'Test edilen, erişilebilir, 320 piksel genişlikten başlayan arayüzler ve servisler yazar, yayına alırım.' },
  { word: 'SONUÇ', title: 'Sonuç', text: 'Açık, ölçülebilir ve devredilebilir bir sistem. Bilgi bende değil, belgede ve kodda kalır.' },
] as const

export const SERVICES = [
  {
    no: '01',
    title: 'CTO ve Strateji Danışmanlığı',
    text: 'Yarı zamanlı CTO olarak teknoloji yol haritası, ekip ve satıcı kararları, mimari inceleme ve yatırım önceliklendirme.',
    tags: ['Fractional CTO', 'Yol haritası', 'Karar çerçevesi'],
  },
  {
    no: '02',
    title: 'Platform ve SaaS Mimarisi',
    text: 'Frappe / ERPNext üzerinde çok kiracılı, self-hosted SaaS; kimlik, yetki ve operasyon düzlemi tasarımı.',
    tags: ['Frappe', 'ERPNext', 'Keycloak', 'Self-hosted'],
  },
  {
    no: '03',
    title: 'Yapay Zekâ Destekli Ürün',
    text: 'Ajan iş akışları, MCP bağlantıları ve AI-first yönetim arayüzleri: gösterişten çok işe yarayan otomasyon.',
    tags: ['MCP', 'Ajan akışları', 'AI-first UI'],
  },
  {
    no: '04',
    title: 'Arayüz Sistemleri',
    text: 'Token tabanlı tasarım sistemleri, 320 pikselden başlayan uyarlanabilir arayüzler, WCAG 2.2 AA ve tarayıcılar arası test.',
    tags: ['React', 'Mantine', 'Playwright', 'WCAG 2.2'],
  },
  {
    no: '05',
    title: 'B2B Pazar Yeri ve E-ticaret',
    text: 'Soğuk başlangıç ve likidite stratejisi, WooCommerce entegrasyonları, kârlılık ve fiyatlandırma araçları.',
    tags: ['B2B', 'WooCommerce', 'Entegrasyon'],
  },
  {
    no: '06',
    title: 'Bilgi Atlasları ve Karar Destek',
    text: 'Dağınık bilgiyi kaynaklı, aranabilir ve puanlanabilir bir atlasa çevirmek: katalog, şablon, karar paneli.',
    tags: ['Astro', 'Veri modeli', 'Kaynak denetimi'],
  },
] as const

export const STEPS = [
  { no: '1', title: 'Keşif ve karar çerçevesi', text: 'Hedefi, kısıtları ve riskleri yazıya dökeriz. Ortak ölçüt ve kabul koşulları belirlenir.' },
  { no: '2', title: 'Mimari ve yol haritası', text: 'Karar kayıtları, faz planı ve görev sahipleri. Her adımın bağımlılığı ve doğrulama ölçütü açıktır.' },
  { no: '3', title: 'Prototip ve uygulama', text: 'Küçük, çalışan dilimler halinde ilerlenir; her dilim test edilir ve gerçek cihazda görülür.' },
  { no: '4', title: 'Devir ve ölçüm', text: 'Belge, otomasyon ve ölçüm panosuyla devredilir; kaynak kod ve kararlar açık depoda kalır.' },
] as const

export const WORKS = [
  {
    no: '01',
    title: 'Frappe Headless SaaS',
    text: 'Press kontrol düzlemi, ERPNext v16 müşteri siteleri, Keycloak kimlik ve MCP tabanlı AI katmanı için mimari karar çerçevesi.',
    meta: '10 karar · 157 gereksinim · 7 faz',
    tags: ['Frappe', 'Astro', 'Mantine'],
    href: 'https://karacaismail.github.io/frappesetup/',
    wide: true,
  },
  {
    no: '02',
    title: 'Kitaplık',
    text: 'Kitap kimlikleri, Türkçe baskılar ve açıklanabilir bir okuma önceliği. 320 piksel öncelikli, JavaScript gerektirmeyen katalog sürümüyle.',
    meta: '920 eser · 29 küme',
    tags: ['320 px', 'Katalog'],
    href: 'https://titanlar-com.github.io/kitaps/',
  },
  {
    no: '03',
    title: 'CronHR',
    text: 'Her yüzeyin içinde AI olan İK yönetim paneli; tek yüzeyde yerinde dönüşen komut kartı.',
    meta: 'Astro · AiCommandCard',
    tags: ['Astro', 'AI-first'],
    href: 'https://karacaismail.github.io/CronHR/',
  },
  {
    no: '04',
    title: 'Arasta B2B Pazar Yeri',
    text: 'Üç tasarım aracında denenen, uyarlanabilir B2B pazar yeri tasarımı ve ölçülmüş araç değerlendirmesi.',
    meta: '484 uyarlanabilir ekran',
    tags: ['Tasarım', 'B2B'],
    href: 'https://github.com/karacaismail/arasta-open-pencil',
  },
  {
    no: '05',
    title: 'Etsy-2-Woo',
    text: 'Etsy ürünlerini WooCommerce\'e aktaran Chrome eklentisi.',
    meta: 'Chrome Extension · REST API',
    tags: ['E-ticaret', 'JavaScript'],
    href: 'https://github.com/karacaismail/Etsy-2-Woo',
  },
  {
    no: '06',
    title: 'Stratejik Kâr Pusulası',
    text: 'E-ticaret satıcıları için ürün ve operasyon kârlılığı, fiyatlandırma ve optimizasyon hesaplama aracı.',
    meta: 'Titanlar aracı',
    tags: ['E-ticaret', 'Analiz'],
    href: 'https://github.com/karacaismail/Stratejik-Kar-Pusulasi',
  },
] as const

export const STATS = [
  { value: 93, suffix: '+', label: 'açık kaynak depo' },
  { value: 920, suffix: '', label: 'eserlik kitap kataloğu' },
  { value: 484, suffix: '', label: 'uyarlanabilir ekran tasarımı' },
  { value: 157, suffix: '', label: 'numaralı mimari gereksinim' },
  { value: 320, suffix: ' px', label: 'her arayüzün başlangıç genişliği' },
] as const

export const PRINCIPLES = [
  { title: 'Açık kaynak', text: 'Kaynak kod ve kararlar herkese açık depoda durur. Gizli bilgiler koddan ayrı tutulur.' },
  { title: 'Kanıt önce', text: 'Her iddia kaynakla, her karar gerekçeyle yazılır. Doğrulanmayan şey doğrulanmadı diye işaretlenir.' },
  { title: '320 pikselden başla', text: 'Önce en dar ekran ve en eski cihaz; sonra büyük ekran. Yazı hiçbir yerde 1 rem altına inmez.' },
  { title: 'Herkes için erişilebilir', text: 'Klavye, ekran okuyucu, yakınlaştırma ve azaltılmış hareket tercihi baştan hesaba katılır.' },
] as const

export const FAQ = [
  { q: 'Fractional (yarı zamanlı) CTO ne demek?', a: 'Tam zamanlı bir CTO\'yu işe almadan, teknoloji yönünü belirleyen kıdemli bir kişiyle belirli saat ve kapsamda çalışmak demektir. Mimari kararlar, ekip ve satıcı seçimi, yol haritası ve kalite kapıları bu kapsama girer.' },
  { q: 'Nasıl bir işte yardımcı olabilirsiniz?', a: 'Ürün veya platformun hangi teknolojiyle, hangi sırayla ve hangi riskle kurulacağı netleşmediğinde. Özellikle Frappe / ERPNext tabanlı SaaS, yapay zekâ destekli ürünler, arayüz sistemleri ve B2B pazar yeri kurgularında.' },
  { q: 'Çalışma biçimi ve ücretlendirme nasıl?', a: 'Kapsam, süre ve çıktıya göre teklif hazırlanır. İlk görüşmede hedefi dinler, ne yapılması gerektiğini ve ne kadar süreceğini yazılı olarak paylaşırım. Sabit bir fiyat listesi yoktur.' },
  { q: 'Çalışmalarım açık kaynak mı olacak?', a: 'Varsayılan yaklaşımım açık kaynaktır. Müşteriye özel gizli bilgiler ve veriler depodan ayrı tutulur; hangi parçanın açılacağı birlikte netleştirilir.' },
  { q: 'Yurt dışından veya uzaktan çalışır mısınız?', a: 'İstanbul merkezliyim ve çalışma düzenim uzaktan çalışmaya uygundur. Gerekli oldukları yerde yüz yüze oturumlar planlanabilir.' },
] as const

export const TICKER = [
  'Frappe', 'ERPNext', 'React', 'TypeScript', 'Astro', 'Mantine', 'Keycloak', 'MCP', 'Claude', 'Codex',
  'Playwright', 'WooCommerce', 'Cloudflare', 'GitHub Actions', 'Hetzner', 'Colima',
] as const
