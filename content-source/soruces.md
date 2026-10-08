Araçlar, amaçlarına göre ana ve alt kategorilere ayrılmış, her biri için 2-15 kelime aralığında [amaç, fayda, sonuç] yapısına uygun açıklamalar, CDN kodları ve gerekli olanlar için basit kullanım örnekleri eklenmiştir.

İşte tüm araçların derlenmiş ve düzenlenmiş tam listesi:

-----

### **1. Tasarım ve Arayüz (UI & Design)**

Bu kategori, web sitelerinin ve uygulamaların görsel yapısını, stilini ve temel arayüz bileşenlerini oluşturan araçları içerir.

#### **CSS Çerçeveleri ve Stil Kütüphaneleri**

Web siteleri için hazır stiller, bileşenler ve tasarım sistemleri sunarak geliştirme sürecini hızlandırır.

  * **Tailwind CSS**
  Atomik sınıflarla, HTML'den ayrılmadan, hızlıca özgün ve modern tasarımlar oluşturur.

  ```html
  <script src="https://cdn.tailwindcss.com"></script>
  ```

  * **Bootstrap**
  Hazır UI bileşenleriyle, prototip aşamasından canlı ürüne, hızlı ve tutarlı siteler geliştirir.

  ```html
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  ```

  * **Bulma**
  Sadece CSS sınıflarını kullanarak, derleme gerektirmeyen, flexbox tabanlı modern arayüzler sunar.

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css">
  ```

  * **Pico.css**
  Sıfır sınıf (class) ile yalnızca HTML etiketlerini kullanarak şık ve temiz tasarımlar yaratır.

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
  ```

  * **Water.css**
  Hiçbir sınıf gerektirmeden, standart HTML'e otomatik olarak güzel ve basit stiller ekler.

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
  ```

  * **MVP.css**
  Sınıf kullanmadan, standart HTML için minimalist ve şık bir başlangıç görünümü sağlar.

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mvp.css@1.12.0/mvp.min.css">
  ```

  * **Spectre.css**
  Hafif, modern ve duyarlı tasarımlar için esnek ve minimalist bir başlangıç noktası sunar.

  ```html
  <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css">
  ```

  * **Open Props**
  Hazır CSS özel değişkenleri (custom properties) ile tutarlı ve akıcı tasarımlar sunar.

  ```html
  <link rel="stylesheet" href="https://unpkg.com/open-props"/>
  ```

#### **UI Bileşen Kitleri (Component Kits)**

Profesyonel ve kullanıma hazır arayüz bileşenleri (buton, modal, kart vb.) sunan koleksiyonlardır.

  * **Chakra UI / Mantine**
  (React odaklı olsalar da stilleri CDN ile kullanılabilir) Erişilebilirlik ve modülerlik odaklı, kapsamlı UI bileşen setleri sunar.

  * **Shoelace**
  Tüm framework'lerle uyumlu, profesyonel ve erişilebilir web bileşenleri koleksiyonu sunar.

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/themes/light.css" />
  <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/shoelace.js"></script>
  <sl-button variant="primary">Tıkla</sl-button>
  ```

  * **Framework7**
  Mobil uygulama hissi veren, PWA uyumlu, zengin ve modern UI bileşenleri sunar.

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/framework7@8.3.3/framework7-bundle.min.css">
  <script src="https://cdn.jsdelivr.net/npm/framework7@8.3.3/framework7-bundle.min.js"></script>
  ```

  * **Ionic**
  Mobil öncelikli, platformlar arası çalışan, yüksek kaliteli ve modern UI bileşenleri sağlar.

  ```html
  <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>
  <script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script>
  ```

#### **Ikon Setleri (Icon Sets)**

Web arayüzlerine kolayca eklenebilen, ölçeklenebilir ve hafif ikon koleksiyonlarıdır.

  * **FontAwesome**
  Binlerce ikonu, tek bir CSS dosyasıyla projelere ekleyerek, zengin bir görsel dil oluşturur.

  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  <i class="fas fa-camera"></i>
  ```

  * **Feather Icons**
  Minimalist SVG ikonları, JavaScript ile anında HTML'e yerleştirerek, temiz arayüzler yaratır.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
  <i data-feather="circle"></i>
  <script>feather.replace()</script>
  ```

  * **Heroicons**
  Tailwind CSS ekibinin tasarladığı, modern ve sade outline/solid ikon setleri sunar.

  ```html
  <img src="https://cdn.jsdelivr.net/npm/heroicons/24/outline/camera.svg">
  ```

  * **Remix Icon**
  Hem "outline" hem "filled" stillerde, 2000'den fazla ikon sunarak tasarım esnekliği sağlar.

  ```html
  <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet"/>
  <i class="ri-home-line"></i>
  ```

  * **Material Icons**
  Google'ın Tasarım Sistemi'ne ait ikonları, basit bir etiketle web sayfalarına entegre eder.

  ```html
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <span class="material-icons">favorite</span>
  ```

-----

### **2. Etkileşim ve Animasyon (Interaction & Animation)**

Kullanıcı deneyimini zenginleştiren görsel efektler, geçişler ve etkileşimli bileşenler içerir.

#### **Animasyon Motorları ve Kütüphaneleri**

Karmaşık veya basit animasyonları kolayca oluşturmak için kullanılır.

  * **GSAP (GreenSock)**
  Zaman çizelgesi tabanlı, yüksek performanslı animasyonlar oluşturarak profesyonel sonuçlar sunar.

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  ```

  * **Anime.js**
  Hafif ve güçlü API'si ile karmaşık zaman çizelgesi tabanlı animasyonlar oluşturur.

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
  ```

  * **Motion One**
  Web Animations API'yi kullanarak, son derece hafif ve yüksek performanslı animasyonlar yaratır.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/motion"></script>
  ```

  * **Lottie.js (Lottie Web)**
  Adobe After Effects animasyonlarını JSON dosyası olarak web'de canlı ve akıcı hale getirir.

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>
  ```

  * **Animate.css**
  Hazır CSS sınıflarıyla, HTML elemanlarına kolayca dikkat çekici animasyonlar ekler.

  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
  <h1 class="animate__animated animate__bounce">Başlık</h1>
  ```

  * **Popmotion**
  Fizik ve animasyon tabanlı, akıcı ve eğlenceli kullanıcı etkileşimleri oluşturur.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/popmotion@11.0.5/dist/popmotion.min.js"></script>
  ```

  * **ScrollReveal**
  Sayfa kaydırıldıkça elemanları ortaya çıkararak, ilgi çekici ve dinamik bir akış sunar.

  ```html
  <script src="https://unpkg.com/scrollreveal@4.0.9/dist/scrollreveal.min.js"></script>
  ```

  * **Vivus.js**
  SVG çizimlerine sıfırdan çiziliyormuş gibi canlı animasyon efekti kazandırır.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/vivus@0.4.6/dist/vivus.min.js"></script>
  ```

#### **Arayüz Etkileşim Araçları**

Kullanıcının sayfayla etkileşimini (kaydırma, tıklama, sürükleme vb.) iyileştiren araçlardır.

  * **Sortable.js**
  Sürükle ve bırak (drag & drop) yöntemiyle, listeleri yeniden sıralama işlevselliği kazandırır.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
  ```

  * **Swiper.js**
  Mobil ve dokunmatik cihazlar için, yüksek performanslı ve modern kaydırıcılar (slider) oluşturur.

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
  ```

  * **Tippy.js**
  Zengin içerikli, interaktif ve özelleştirilebilir ipucu balonları (tooltip) ekler.

  ```html
  <script src="https://unpkg.com/@popperjs/core@2"></script>
  <script src="https://unpkg.com/tippy.js@6"></script>
  <button data-tippy-content="Bu bir ipucu!">Buton</button>
  ```

  * **Fancybox**
  Görsel ve videolar için, şık, modern ve kullanıcı dostu bir lightbox gösterimi sunar.

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css"/>
  <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"></script>
  ```

  * **Micromodal.js**
  Erişilebilirlik odaklı, hafif ve kullanımı kolay modal (pencere) diyalogları oluşturur.

  ```html
  <script src="https://unpkg.com/micromodal/dist/micromodal.min.js"></script>
  ```

  * **SweetAlert2**
  Standart `alert()` yerine, estetik, duyarlı ve interaktif uyarı kutuları sunar.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  ```

  * **Notyf**
  Basit, duyarlı ve özelleştirilebilir "toast" bildirimleri göstermeyi sağlar.

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
  <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>
  ```

  * **Headroom.js**
  Kullanıcı aşağı kaydırdığında gizlenip yukarı kaydırdığında görünen akıllı başlık çubukları yapar.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/headroom.js@0.12.0/dist/headroom.min.js"></script>
  ```

  * **Shepherd.js**
  Kullanıcılar için, uygulama özelliklerini tanıtan adım adım interaktif ürün turları oluşturur.

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/css/shepherd.css"/>
  <script src="https://cdn.jsdelivr.net/npm/shepherd.js@10.0.1/dist/js/shepherd.min.js"></script>
  ```

-----

### **3. Veri, Mantık ve Yardımcılar (Data, Logic & Utilities)**

Genel amaçlı görevleri basitleştiren, veri işleyen, durum yöneten ve formlarla ilgilenen kütüphanelerdir.

#### **Genel Amaçlı Yardımcılar ve Veri İşleme**

Tarih, veri formatlama, API istekleri gibi yaygın görevleri kolaylaştıran temel araçlardır.

  * **jQuery**
  DOM manipülasyonu, olay yönetimi ve Ajax işlemlerini basitleştirerek, tarayıcı uyumluluğu sağlar.

  ```html
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  ```

  * **Lodash**
  JavaScript nesneleri, dizileri ve fonksiyonları için, tekrarlayan görevleri basitleştiren yardımcılar sunar.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
  ```

  * **Axios**
  Tarayıcı ve Node.js için Promise tabanlı, modern ve kolay bir HTTP istemcisi sağlar.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  ```

  * **Day.js**
  Moment.js alternatifi, modern ve 2KB boyutunda minimal bir tarih/zaman işleme kütüphanesidir.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
  ```

  * **PapaParse**
  Tarayıcıda çalışan, hızlı ve güçlü bir şekilde CSV verilerini JSON formatına dönüştürür.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>
  ```

  * **Clipboard.js**
  Tek satır kod ile metinleri panoya kopyalama işlevini tarayıcıda kolayca ekler.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js"></script>
  ```

#### **Form Yönetimi ve Doğrulama**

Kullanıcıdan alınan verilerin formatlanmasını ve doğruluğunun kontrol edilmesini sağlar.

  * **Cleave.js**
  Giriş (input) alanlarını telefon, kredi kartı gibi formatlara göre otomatik biçimlendirir.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/cleave.js@1.6.0/dist/cleave.min.js"></script>
  ```

  * **Just-validate**
  Sıfır bağımlılığa sahip modern, basit ve esnek bir form doğrulama kütüphanesidir.

  ```html
  <script src="https://unpkg.com/just-validate@latest/dist/just-validate.production.min.js"></script>
  ```

  * **Choices.js**
  Select kutularını, etiketleme ve arama özellikli modern ve çoklu seçimli bileşenlere dönüştürür.

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js"></script>
  ```

  * **TinyMCE**
  Zengin metin (rich text) düzenleme için güçlü, esnek ve eklentilerle genişletilebilir bir editör sunar.

  ```html
  <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/7/tinymce.min.js" referrerpolicy="origin"></script>
  ```

#### **Durum Yönetimi (State Management)**

Uygulama genelindeki verilerin (state) tutarlı ve reaktif bir şekilde yönetilmesini sağlar.

  * **Zustand**
  React için geliştirilmiş olsa da, minimal, hızlı ve esnek bir durum yönetimi çözümü sunar.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/zustand@4.5.2/vanilla.js"></script>
  ```

  * **Spruce (Alpine.js için)**
  Alpine.js uygulamalarına basit ve reaktif bir global durum yönetimi yeteneği ekler.

  ```html
  <script defer src="https://cdn.jsdelivr.net/npm/@ryangjchandler/spruce@2.x.x/dist/spruce.umd.js"></script>
  ```

-----

### **4. Deklaratif ve DSL Odaklı Araçlar (Declarative & DSL-focused)**

HTML'e doğrudan eklenen nitelikler (attributes) veya özel sözdizimleri ile dinamik davranışlar kazandıran araçlardır.

  * **HTMX**
  HTML nitelikleriyle, JavaScript yazmadan AJAX, WebSocket ve SSE etkileşimleri oluşturur.

  ```html
  <script src="https://unpkg.com/htmx.org@1.9.12"></script>
  <button hx-post="/clicked" hx-swap="outerHTML">Bana Tıkla</button>
  ```

  * **Alpine.js**
  HTML içinde JavaScript kullanarak, Vue benzeri reaktif ve etkileşimli arayüzler oluşturur.

  ```html
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <div x-data="{ count: 0 }">
  <button @click="count++">Arttır</button>
  <span x-text="count"></span>
  </div>
  ```

  * **Petite Vue**
  Vue.js'in 6KB'lık, CDN ile çalışan ve anında reaktivite sağlayan hafif versiyonudur.

  ```html
  <script src="https://unpkg.com/petite-vue" defer init></script>
  <div v-scope="{ count: 0 }">
  {{ count }}
  <button @click="count++">+</button>
  </div>
  ```

  * **Hyperscript**
  HTML içinde `on click wait 2s then add .red` gibi doğal dil benzeri scriptler yazmayı sağlar.

  ```html
  <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
  ```

  * **Reef.js**
  Hafif, basit ve reaktif arayüz bileşenleri oluşturmak için tasarlanmış vanilla JS aracıdır.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/reefjs@13/dist/reef.min.js"></script>
  ```

-----

### **5. Grafik, Görselleştirme ve Motorlar (Graphics, Visualization & Engines)**

Verileri grafiklere dönüştüren, 2D/3D sahneler oluşturan ve özel render işlemleri yapan araçlardır.

#### **Veri Görselleştirme ve Grafikler**

Sayısal verileri anlaşılır, etkileşimli ve modern grafiklere dönüştürmek için kullanılır.

  * **Chart.js**
  HTML5 Canvas kullanarak, modern, duyarlı ve etkileşimli veri grafikleri oluşturur.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  ```

  * **D3.js**
  Veriye dayalı olarak, dinamik ve interaktif SVG tabanlı belgeler oluşturmak için güçlü bir araçtır.

  ```html
  <script src="https://d3js.org/d3.v7.min.js"></script>
  ```

  * **Plotly.js**
  Bilimsel ve istatistiksel, yüksek kaliteli ve interaktif 2D/3D grafikler oluşturur.

  ```html
  <script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>
  ```

  * **ECharts**
  Apache tarafından geliştirilen, güçlü, özelleştirilebilir ve etkileşimli bir grafik kütüphanesidir.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>
  ```

#### **2D/3D Grafik ve Render Motorları**

Web'de iki veya üç boyutlu sahneler, oyunlar, modeller ve çizim animasyonları oluşturmayı sağlar.

  * **Three.js**
  WebGL tabanlı, tam teşekküllü 3D sahneler ve interaktif deneyimler yaratmak için kullanılır.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.min.js"></script>
  ```

  * **Pixi.js**
  WebGL hızlandırmalı, yüksek performanslı 2D render motoru ile etkileşimli grafikler sunar.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/pixi.js@8.1.5/dist/pixi.min.js"></script>
  ```

  * **Matter.js**
  2D fizik motoru ile çarpışma, yerçekimi ve sürtünme gibi gerçekçi hareketler simüle eder.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/matter-js@0.19.0/build/matter.min.js"></script>
  ```

  * **Phaser**
  2D oyun geliştirmek için, Canvas ve WebGL destekli, zengin özellikli bir oyun motorudur.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js"></script>
  ```

  * **p5.js**
  Yaratıcı kodlama (creative coding) odaklı, interaktif grafik ve animasyonlar için bir çizim motorudur.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/p5@1.9.3/lib/p5.js"></script>
  ```

-----

### **6. Geliştirici Araçları ve Özel Amaçlı Kütüphaneler**

Kod vurgulama, metin işleme, PWA ve diğer özel geliştirme ihtiyaçlarına yönelik araçlardır.

  * **Prism.js**
  Hafif, genişletilebilir ve modern bir şekilde, kod bloklarına sözdizimi vurgulaması ekler.

  ```html
  <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
  ```

  * **Marked.js**
  Hızlı ve hafif bir şekilde, Markdown metinlerini HTML'e ayrıştırır ve derler.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  ```

  * **DOMPurify**
  HTML'i XSS saldırılarına karşı temizleyerek, kullanıcı tarafından girilen içeriği güvenli hale getirir.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/dompurify@3.1.5/dist/purify.min.js"></script>
  ```

  * **pdf.js**
  PDF dosyalarını, harici bir görüntüleyiciye ihtiyaç duymadan doğrudan tarayıcıda render eder.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@4.3.136/build/pdf.min.mjs" type="module"></script>
  ```

  * **Tesseract.js**
  Görüntülerdeki metinleri, OCR (Optik Karakter Tanıma) motoru ile tarayıcıda okur.

  ```html
  <script src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js'></script>
  ```

  * **PWACompat**
  Manifest desteklemeyen eski tarayıcılar için, PWA özelliklerine (ikon vb.) uyumluluk sağlar.

  ```html
  <script src="https://unpkg.com/pwacompat" async></script>
  ```
---


## AYRICA :


  ### **İlk Listede Yer Almayan veya Atlanan Araçlar**

  #### **UI ve Yardımcı Kütüphaneler (Niş ve Minimalistler)**

  Bu araçlar, genellikle daha küçük boyutlu veya belirli bir tasarım felsefesine odaklanmış çözümlerdir.

  * **Luxon**
  Tarih ve saat işlemleri için, Day.js'ten daha kapsamlı ve nesne yönelimli bir çözüm sunar.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/luxon@3.4.4/build/global/luxon.min.js"></script>
  ```

  * **Wired Elements**
  HTML elemanlarına el çizimi (sketch) görünümü vererek, eğlenceli ve özgün prototipler oluşturur.

  ```html
  <script type="module" src="https://cdn.jsdelivr.net/npm/wired-elements/dist/wired-elements.bundled.js"></script>
  <wired-button>El Çizimi Buton</wired-button>
  ```

  * **Isotope**
  Öğeleri filtreleyerek ve sıralayarak, akıllı ve animasyonlu "masonry" düzenleri oluşturur.

  ```html
  <script src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js"></script>
  ```

  * **Popper.js**
  Tooltip ve popover gibi açılır pencerelerin konumlandırılmasını, akıllıca ve hassas şekilde yönetir.

  ```html
  <script src="https://unpkg.com/@popperjs/core@2"></script>
  ```

  * **Tabulator**
  HTML tablolarını, sıralama, filtreleme ve düzenleme gibi özelliklerle interaktif hale getirir.

  ```html
  <link href="https://unpkg.com/tabulator-tables@6.2.1/dist/css/tabulator.min.css" rel="stylesheet">
  <script type="text/javascript" src="https://unpkg.com/tabulator-tables@6.2.1/dist/js/tabulator.min.js"></script>
  ```

  #### **Gelişmiş Animasyon ve Etkileşim**

  Kullanıcı etkileşimini belirli senaryolara (kaydırma, sayfa geçişi) göre yöneten özel araçlardır.

  * **ScrollMagic**
  Sayfa kaydırma (scroll) pozisyonuna bağlı olarak, gelişmiş ve senkronize animasyonlar tetikler.

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/ScrollMagic.min.js"></script>
  ```

  * **Parallax.js**
  Fare veya cihaz hareketine tepki veren, katmanlı ve hafif paralaks (parallax) efektleri yaratır.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/parallax-js@3.1.0/dist/parallax.min.js"></script>
  ```

  * **TypeIt**
  Yazıların harf harf yazılıyormuş gibi görünmesini sağlayarak, dinamik ve dikkat çekici metinler oluşturur.

  ```html
  <script src="https://unpkg.com/typeit@8.8.3/dist/index.umd.js"></script>
  ```

  * **Hover.css**
  Fare ile üzerine gelindiğinde çalışan, 100'den fazla hazır ve dikkat çekici CSS efekti sunar.

  ```html
  <link href="https://cdnjs.cloudflare.com/ajax/libs/hover.css/2.3.1/css/hover-min.css" rel="stylesheet">
  <a href="#" class="hvr-grow">Büyüt</a>
  ```

  #### **Form ve Doğrulama (Alternatifler)**

  Farklı yaklaşımlar sunan form doğrulama ve zenginleştirme araçlarıdır.

  * **Parsley.js**
  HTML nitelikleri ile çalışan, kullanıcı dostu ve otomatik form doğrulama altyapısı sunar.

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/parsley.js/2.9.2/parsley.min.js"></script>
  ```

  * **Validate.js**
  Doğrulama kurallarını JavaScript objesi olarak tanımlayarak, esnek ve model tabanlı doğrulama sağlar.

  ```html
  <script src="//cdnjs.cloudflare.com/ajax/libs/validate.js/0.13.1/validate.min.js"></script>
  ```

  #### **Medya Oynatıcılar ve Görüntüleyiciler**

  Video, ses ve resimler için daha gelişmiş kontrol ve görünüm sağlarlar.

  * **Plyr**
  HTML5 video/audio elemanlarını, modern, erişilebilir ve özelleştirilebilir bir oynatıcıya dönüştürür.

  ```html
  <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
  <script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>
  ```

  * **PhotoSwipe**
  Mobil ve masaüstü için optimize edilmiş, dokunmatik hareketleri destekleyen resim galerisi sunar.

  ```html
  <link rel="stylesheet" href="https://unpkg.com/photoswipe@5.4.3/dist/photoswipe.css">
  <script src="https://unpkg.com/photoswipe@5.4.3/dist/photoswipe.esm.js" type="module"></script>
  ```

  * **Viewer.js**
  Resimler için yakınlaştırma, döndürme ve tam ekran gibi özellikler sunan basit bir görüntüleyicidir.

  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.11.6/viewer.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.11.6/viewer.min.js"></script>
  ```

  #### **Matematik, Kural ve Şablon Motorları**

  İstemci tarafında karmaşık hesaplamalar, kural tabanlı mantık yürütme ve şablonlama yaparlar.

  * **Math.js**
  Matematiksel ifadeleri, sembolik cebir ve matris işlemlerini tarayıcıda çalıştıran bir motordur.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/mathjs@13.0.0/lib/browser/math.min.js"></script>
  ```

  * **Handlebars.js**
  `{{#if}}` gibi mantıksal yapılarla, JSON verisini HTML şablonlarına bağlayan güçlü bir motordur.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/handlebars@4.7.8/dist/handlebars.min.js"></script>
  ```

  * **Mustache.js**
  Mantıksal ifadeler içermeyen (logic-less), basit ve temiz bir HTML şablonlama motorudur.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/mustache@4.2.0/mustache.min.js"></script>
  ```

  * **json-logic-js**
  Karmaşık kuralları JSON formatında tanımlayıp, bu kuralları veri üzerinde çalıştıran bir motordur.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/json-logic-js@2.0.2/dist/json-logic.min.js"></script>
  ```

  #### **Oyun, Fizik ve Düşük Seviye Motorlar**

  Oyun mekanikleri, fizik simülasyonları ve özel render işlemleri için kullanılan temel motorlardır.

  * **Kaboom.js**
  Basit ve eğlenceli bir sözdizimi ile, hızlıca retro arcade tarzı oyunlar geliştirmeyi sağlar.

  ```html
  <script src="https://unpkg.com/kaboom@3000.1.17/dist/kaboom.js"></script>
  ```

  * **Rough.js**
  Canvas veya SVG üzerine, sanki elle çizilmiş gibi görünen şekiller ve çizgiler çizer.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/roughjs@4.6.6/dist/rough.min.js"></script>
  ```

  * **fflate**
  Tarayıcıda yüksek performansla çalışan, GZIP/ZIP gibi formatlarda veri sıkıştırma motorudur.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/fflate@0.8.2/umd/index.js"></script>
  ```

  #### **PWA ve Bildirim Yardımcıları**

  Progressive Web App (PWA) oluşturmayı ve tarayıcı bildirimlerini yönetmeyi kolaylaştırır.

  * **OneSignal SDK**
  Web sitelerine, platformlar arası çalışan anlık bildirim (push notification) özelliği ekler.

  ```html
  <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
  ```

  * **Push.js**
  Tarayıcının Notification API'sini basitleştirerek, masaüstü bildirimleri göndermeyi kolaylaştırır.

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/push.js/1.0.12/push.min.js"></script>
  ```

  #### **Ek Ikon Setleri**

  Farklı tasarım stilleri ve kullanım yöntemleri sunan alternatif ikon kütüphaneleridir.

  * **Lucide Icons**
  Feather Icons'un devamı niteliğinde, daha kapsamlı ve topluluk tarafından geliştirilen bir ikon setidir.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/lucide@latest"></script>
  <i data-lucide="home"></i>
  <script>lucide.createIcons();</script>
  ```

  * **Phosphor Icons**
  Farklı kalınlıklarda (thin, light, bold, fill) sunulan, esnek ve modern bir ikon ailesidir.

  ```html
  <script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
  <i class="ph-bold ph-heart"></i>
  ```

  * **Tabler Icons**
  2000'den fazla, sade, modern ve 1.5px çizgi kalınlığına sahip tutarlı bir ikon setidir.

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
  <i class="ti ti-settings"></i>
  ```

  * **Simple Icons**
  GitHub, Twitter gibi popüler markaların logolarını içeren, SVG formatında bir ikon koleksiyonudur.

  ```html
  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v12/icons/google.svg" />
  ```

---



## AYRICA :

  #### **CSS Çerçeveleri ve Yardımcıları (Niş ve Özel Amaçlı)**

  * **Materialize**
  Google'ın Materyal Tasarım ilkelerini, hazır bileşenlerle web'e taşıyarak tutarlı arayüzler sunar.

  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  ```

  * **Balloon.css**
  HTML `data-balloon` niteliğiyle, JavaScript gerektirmeyen, saf CSS ile tooltip'ler oluşturur.

  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/balloon-css/1.2.0/balloon.min.css">
  <button data-balloon="Bu bir ipucu!" data-balloon-pos="up">Buton</button>
  ```

  * **Mobi.css**
  Mobil öncelikli, sadece 4KB boyutunda, esnek ve minimalist bir CSS çerçevesidir.

  ```html
  <link rel="stylesheet" href="https://unpkg.com/mobi.css/dist/mobi.min.css" />
  ```

  * **Basscss**
  Fonksiyonel (utility-first) sınıflarla, hızlı prototipleme ve modüler tasarım imkanı sunar.

  ```html
  <link href="https://unpkg.com/basscss@8.0.2/css/basscss.min.css" rel="stylesheet">
  ```

  #### **Form Yönetimi ve Doğrulama (Alternatifler)**

  * **FormValidation.io**
  Bootstrap dahil birçok framework ile uyumlu, kapsamlı ve güçlü bir form doğrulama motorudur.

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/formvalidation/0.6.2-dev/js/formValidation.min.js"></script>
  ```

  * **AutoNumeric**
  Sayısal girişler için para birimi, ondalık ve otomatik formatlama yetenekleri sunar.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/autonumeric@4.6.0/dist/autoNumeric.min.js"></script>
  ```

  #### **Veri Görselleştirme ve Grafikler (Alternatifler)**

  * **uPlot**
  Zaman serisi verileri için, ultra hızlı, küçük boyutlu ve etkili bir grafik kütüphanesidir.

  ```html
  <link rel="stylesheet" href="https://unpkg.com/uplot@1.6.27/dist/uPlot.min.css">
  <script src="https://unpkg.com/uplot@1.6.27/dist/uPlot.iife.min.js"></script>
  ```

  * **billboard.js**
  D3.js tabanlı, yeniden kullanılabilir ve kolayca özelleştirilebilen interaktif grafikler oluşturur.

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/billboard.js/dist/billboard.min.css">
  <script src="https://cdn.jsdelivr.net/npm/billboard.js/dist/billboard.min.js"></script>
  ```

  #### **Düşük Seviye (Low-Level) ve DSL Araçları**

  * **Sinuous**
  Tagged template literal'lar ile JSX benzeri, son derece hızlı ve reaktif bir UI yapısı sunar.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/sinuous/dist/sinuous.min.js"></script>
  ```

  * **Jexl (JavaScript Expression Language)**
  JSON verileri içinde `user.age > 18` gibi mantıksal ifadeleri değerlendiren bir DSL motorudur.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/jexl@2.3.0/dist/jexl.min.js"></script>
  ```

  * **Nerdamer**
  Tarayıcıda sembolik matematik (cebir, kalkülüs) işlemleri yapabilen bir CAS motorudur.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/nerdamer@1.1.13/nerdamer.core.js"></script>
  ```

  #### **Özel Amaçlı Yardımcılar ve Motorlar**

  * **Chance.js**
  Test veya prototipleme için, isim, adres, sayı gibi rastgele ve sahte veriler üretir.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/chance@1.1.11/chance.min.js"></script>
  ```

  * **Timeago.js**
  Tarih-saat bilgisini, "5 dakika önce" gibi okunabilir ve göreceli bir formata dönüştürür.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/timeago.js@4.0.2/dist/timeago.min.js"></script>
  ```

  * **Babel Standalone**
  Modern JavaScript (ES6+) kodunu, derleme adımı olmadan doğrudan tarayıcıda çalıştırır.

  ```html
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  ```

  #### **Low-Code, Sunum ve Site Oluşturucular**

  * **Retool / BudiBase**
  (Konsept olarak) Hazır bileşenlerle, sürükle-bırak yöntemiyle hızlıca iç yönetim panelleri oluşturur.

  * **Reveal.js**
  HTML veya Markdown kullanarak, şık, interaktif ve dokunmatik uyumlu sunum slaytları oluşturur.

  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/reset.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/reveal.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/reveal.min.js"></script>
  ```

  * **Carrd**
  (Platform olarak) Basit, duyarlı ve genellikle tek sayfalık siteler oluşturmak için kullanılır.

  #### **Kullanıcı Deneyimi (UX) Analiz Araçları**

  * **FullStory Lite**
  Kullanıcı oturumlarını video gibi kaydederek, UX hatalarını ve etkileşimleri analiz etmeyi sağlar.

  ```html
  ```

  * **UXSniff.js**
  Lighthouse benzeri, sitenin kullanıcı deneyimi performansını (hız, erişilebilirlik) analiz eder.

  ```html
  ```

---



## AYRICA :

  #### **Animasyon ve Efekt Kütüphaneleri (Spesifik)**

  * **CSShake**
  Kullanıcı dikkatini çekmek için çeşitli, CSS tabanlı sarsma (shake) efektleri koleksiyonu sunar.

  ```html
  <link rel="stylesheet" type="text/css" href="https://csshake.surge.sh/csshake.min.css">
  <div class="shake">Bu kutu sallanır.</div>
  ```

  * **SpinKit**
  Yalnızca CSS kullanarak, farklı stillerde şık ve çeşitli yükleme (spinner) animasyonları sunar.

  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/spinkit/2.0.1/spinkit.min.css">
  ```

  * **WaitMe.js**
  İşlem anında ekranı kilitleyip, animasyonlu geri bildirim sağlayarak kullanıcıyı bilgilendirir.

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/waitme@1.19.0/waitMe.min.css">
  <script src="https://cdn.jsdelivr.net/npm/waitme@1.19.0/waitMe.min.js"></script>
  ```

  * **AnimXYZ**
  CSS değişkenleri ve nitelikler kullanarak, birleştirilebilir ve özelleştirilebilir animasyonlar yaratır.

  ```html
  <link href="https://cdn.jsdelivr.net/npm/@animxyz/core/dist/animxyz.min.css" rel="stylesheet">
  <div xyz="fade up">Animasyonlu Kutu</div>
  ```

  * **Loaders.css**
  Asenkron işlemlerde bekleme hissini azaltan, 50'den fazla CSS yükleyici animasyonu sunar.

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/loaders.css/loaders.min.css">
  ```

  #### **UI Bileşenleri ve Yardımcı Araçlar**

  * **Awesomplete**
  Sıfır bağımlılığa sahip, ultra hafif ve özelleştirilebilir bir otomatik tamamlama (autocomplete) aracıdır.

  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.5/awesomplete.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.5/awesomplete.min.js"></script>
  ```

  * **Dropzone.js**
  CDN ile çalışan, sürükle-bırak destekli, önizlemeli dosya yükleme (upload) çözümü sunar.

  ```html
  <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css" />
  <script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
  ```

  #### **Bildirimler ve Uyarılar**

  * **Toastr.js**
  Klasik, hızlı ve duyarlı "toast" (geçici bildirim kutucuğu) bildirimleri için popüler bir çözümdür.
  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
  ```

  #### **Kullanıcı Rehberleri ve Turlar**

  * **Intro.js**
  Belirli alanları vurgulayarak, kullanıcıya yol gösteren adım adım ürün tanıtım sihirbazları yaratır.

  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intro.js/7.2.0/introjs.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/intro.js/7.2.0/intro.min.js"></script>
  ```

  * **Hopscotch**
  Geliştiricilerin, kolayca çok adımlı kullanıcı turu ve ürün eğitim adımları oluşturmasını sağlar.

  ```html
  <link href="https://cdnjs.cloudflare.com/ajax/libs/hopscotch/0.3.1/css/hopscotch.min.css" rel="stylesheet"/>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/hopscotch/0.3.1/js/hopscotch.min.js"></script>
  ```

  Bu son liste ile birlikte, sağladığınız orijinal metindeki **tüm** araçların artık eksiksiz bir şekilde listelendiğinden emin olabilirim. Başka bir eksik bulunmamaktadır.


---

## AYRICA :



  ### **1. İnteraktif Arayüz ve Mikro Etkileşimler**

  Bu araçlar, kullanıcı arayüzüne beklenmedik, keyifli ve özel etkileşimler ekler.

  * **canvas-confetti**
  Ekranın herhangi bir yerinden, gerçekçi fizik tabanlı konfeti efektleri fırlatarak başarı anlarını kutlar.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  ```

  **Kullanım Senaryosu:** Ödeme tamamlandığında, bir görev bitirildiğinde veya bir skor kazanıldığında kullanıcıyı ödüllendirmek için idealdir.

  * **Kbar**
  Modern web uygulamalarındaki gibi (Cmd/Ctrl+K), aranabilir bir komut paleti oluşturmayı sağlar.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/kbar@0.1.0-beta.45/dist/index.js"></script>
  ```

  **Kullanım Senaryosu:** Sitede hızlı gezinme, eylem arama veya ayarları değiştirme gibi özellikler sunmak için kullanılır.

  * **Hammer.js**
  Dokunmatik cihazlar için `pinch`, `rotate`, `pan` gibi gelişmiş çoklu dokunma (multi-touch) hareketlerini algılar.

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script>
  ```

  **Kullanım Senaryosu:** Resim galerilerinde yakınlaştırma/döndürme veya harita uygulamalarında gezinme için mükemmeldir.

  * **Macy.js**
  Isotope/Masonry alternatifi, sıfır bağımlılığa sahip, son derece hafif ve performanslı bir "düzensiz grid" düzeni oluşturur.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/macy@2.5.1/dist/macy.min.js"></script>
  ```

  **Kullanım Senaryosu:** Pinterest benzeri, farklı boyutlardaki görsellerden oluşan galeriler ve portfolyolar için idealdir.

  ### **2. Yaratıcı Kodlama ve Görsel Sanatlar**

  Bu araçlar, standart arayüzlerin dışına çıkarak sanatsal ve jeneratif görseller oluşturmaya odaklanır.

  * **Rough Notation**
  Metinlerin belirli kısımlarını, sanki elle çizilmiş gibi (altı çizili, üstü karalanmış, kutu içine alınmış) vurgular.

  ```html
  <script type="module" src="https://unpkg.com/rough-notation?module"></script>
  ```

  **Kullanım Senaryosu:** Blog yazılarında veya ana sayfalarda önemli bir metne dikkat çekmek için özgün ve organik bir yol sunar.

  * **Hydra**
  Canlı kodlama (live-coding) ile modüler, video-synthesizer benzeri, etkileşimli ve akışkan görseller yaratır.

  ```html
  <script src="https://unpkg.com/hydra-synth"></script>
  ```

  **Kullanım Senaryosu:** Web siteleri için dinamik arka planlar, müzik görselleştirmeleri veya dijital sanat enstalasyonları oluşturmak için kullanılır.

  ### **3. Gelişmiş Mantık ve Durum Yönetimi**

  Bu araçlar, uygulama mantığını daha formal ve öngörülebilir bir şekilde yönetmek için kullanılır.

  * **XState**
  Sonlu durum makineleri (state machines) ve statechart'ları kullanarak karmaşık UI akışlarını hatasız ve görselleştirilebilir hale getirir.

  ```html
  <script src="https://unpkg.com/xstate@4/dist/xstate.js"></script>
  ```

  **Kullanım Senaryosu:** Çok adımlı formlar, ödeme süreçleri veya bir kullanıcının (login, loading, success, error gibi) tüm olası durumlarını yönetmek için idealdir.

  * **Immer**
  Değişmez (immutable) state'leri, sanki normal bir JavaScript nesnesini değiştiriyormuş gibi kolayca ve güvenle güncellemenizi sağlar.

  ```html
  <script src="https://unpkg.com/immer@9.0.6/dist/immer.umd.production.min.js"></script>
  ```

  **Kullanım Senaryosu:** Zustand, Redux gibi durum yönetimi kütüphanelerinde state'in kazara değiştirilmesini önlemek ve kod okunabilirliğini artırmak için kullanılır.

  ### **4. WebAssembly ve Tarayıcıda Yüksek Performans**

  Bu araçlar, normalde sunucuda çalışan işlemleri WebAssembly aracılığıyla tarayıcıya taşır.

  * **sql.js**
  SQLite veritabanını tamamen tarayıcı içinde çalıştırarak, istemci tarafında karmaşık SQL sorguları yapmanızı sağlar.
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js"></script>
  ```
  **Kullanım Senaryosu:** Çevrimdışı çalışabilen uygulamalar, istemci tarafında veri analizi araçları veya statik sitelerde dinamik veri sorgulama için kullanılır.

  ### **5. Tipografi ve Metin Manipülasyonu**

  * **SplitType.js**
  Bir metni karakterlerine, kelimelerine ve satırlarına ayırarak, her bir parça üzerinde ayrı ayrı animasyon kontrolü sağlar.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/split-type.min.js"></script>
  ```

  **Kullanım Senaryosu:** GSAP veya Anime.js gibi kütüphanelerle birlikte kullanılarak, gelişmiş ve etkileyici metin animasyonları oluşturulur.

  * **fitty.js**
  Bir başlık veya metni, içinde bulunduğu kapsayıcıya tam olarak sığacak şekilde dinamik olarak ölçeklendirir.

  ```html
  <script src="https://unpkg.com/fitty@2.3.7/dist/fitty.min.js"></script>
  ```

  **Kullanım Senaryosu:** Farklı ekran boyutlarında başlıkların taşmasını veya çok küçük kalmasını önlemek için duyarlı tasarımlarda kullanılır.

  ### **6. Tarayıcı Tabanlı Yapay Zeka ve Gelişmiş API'ler**

  * **TensorFlow.js**
  Yapay zeka ve makine öğrenmesi modellerini, sunucuya ihtiyaç duymadan doğrudan tarayıcıda eğitir ve çalıştırır.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>
  ```

  **Kullanım Senaryosu:** Web kamerası ile nesne tanıma, hareket algılama veya kişiselleştirilmiş öneri sistemleri gibi özellikler için kullanılır.

  * **PeerJS**
  WebRTC'yi basitleştirerek, tarayıcılar arasında sunucuya gerek kalmadan P2P (eşten eşe) ses, video veya veri bağlantısı kurar.

  ```html
  <script src="https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js"></script>
  ```

  **Kullanım Senaryosu:** Basit video sohbet uygulamaları, çok oyunculu tarayıcı oyunları veya dosya paylaşım araçları oluşturmak için idealdir.
