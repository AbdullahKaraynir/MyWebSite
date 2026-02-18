# Projeyi Daha Dinamik Yapmak İçin Öneriler

Aşağıdaki fikirler hem kullanıcı deneyimini hem de projenin “canlı” hissini artırır. İstediğin sırayla ekleyebilirsin.

---

## Hızlı kazanımlar (1–2 saat)

### 1. **Tema değiştirici (Dark / Light)**
- Navbar’a bir toggle ekle (güneş/ay ikonu).
- Tema tercihini `localStorage`’da sakla, sayfa yüklenince uygula.
- `globals.css` veya Tailwind dark mode ile iki palet tanımla.
- Ziyaretçi kendi tercihini seçer, site daha kişisel hisseder.

### 2. **Projelerde filtre (Tech stack)**
- Projects bölümüne “Tümü”, “React”, “Flutter”, “.NET” gibi filtre butonları ekle.
- `projects.ts` verisini filtreleyip sadece seçilen tech’e göre kartları göster.
- Framer Motion ile filtre değişince kartlara kısa fade/scale animasyonu ver.

### 3. **“Scroll to top” butonu**
- Sayfa aşağı kaydığında sağ altta küçük bir ok butonu çıksın.
- Tıklanınca `window.scrollTo({ top: 0 })` ile yukarı kaydırsın.
- Görünürlüğü scroll pozisyonuna göre ayarla (örn. 400px’ten sonra göster).

### 4. **İçerik tek yerden (data)**
- Tüm metinleri (Hero tagline, About paragraf, Contact mesajı vb.) tek bir `src/data/site.ts` veya `content.ts` dosyasında topla.
- Bileşenler bu dosyayı import etsin. Böylece metin değişikliği tek yerden yapılır, proje daha “data-driven” olur.

---

## Orta seviye (yarım gün – 1 gün)

### 5. **İletişim formu**
- Contact bölümünde “Email / LinkedIn / GitHub” linklerine ek olarak basit bir form: Ad, Email, Mesaj.
- Form submit’i bir serverless function’a (Vercel Functions, Netlify Functions) veya üçüncü parti servise (Formspree, Web3Forms) gönder.
- Gönderince “Teşekkürler, en kısa sürede dönüş yapacağım” mesajı göster.

### 6. **Proje detay sayfaları**
- Her proje için `/projects/[slug]` gibi dinamik bir sayfa aç.
- `projects.ts`’e `slug`, uzun açıklama, ekran görüntüsü, “Öğrendiklerim” gibi alanlar ekle.
- Ana sayfadaki “View Architecture” veya proje adı bu sayfaya linklensin.
- Site tek sayfa olmaktan çıkar, projeler daha anlatıcı olur.

### 7. **Dil seçimi (TR / EN)**
- Basit i18n: Metinleri `tr.json` ve `en.json` gibi dosyalarda tut.
- Navbar’da “TR | EN” seçeneği; seçim `localStorage` + state ile saklansın, tüm bileşenler bu dile göre metin göstersin.
- SEO için `lang` attribute’unu da seçilen dile göre güncelle.

### 8. **Hareket ve görünürlük**
- Scroll’da bölümler görünür oldukça hafif animasyon (örn. yukarıdan slide + fade).
- Butonlarda hover’da hafif scale/glow (zaten var, ek detay eklenebilir).
- Gerekirse “reduce motion” tercihine saygı duy (prefers-reduced-motion).

---

## İleri seviye (birkaç gün)

### 9. **Blog / yazılar**
- `/blog` sayfası ve `/blog/[slug]` detay.
- Yazılar `md` veya `mdx` dosyalarından okunsun (örn. `contentlayer` veya basit `fs` + markdown parser).
- Ana sayfada “Son yazılar” 3 kart olarak gösterilebilir; böylece site sürekli güncelleniyor hissi verir.

### 10. **Basit analytics**
- Vercel Analytics veya Plausible/Umami gibi hafif bir araç ekle.
- Hangi sayfa/bölümün görüntülendiğini (ve isteğe bağlı tıklamaları) görürsün; içeriği buna göre geliştirirsin.

### 11. **RSS / sitemap**
- Blog eklediysen RSS feed.
- `sitemap.xml` (Next.js sitemap API ile) ile arama motorları için daha iyi indeksleme.

### 12. **CMS entegrasyonu**
- Projeler, About, deneyim gibi içeriği Sanity, Contentful veya Notion’dan çek.
- İçerik güncellemek için kod yerine panel kullanırsın; proje tam anlamıyla “dinamik” olur.

---

## Öncelik sırası önerisi

| Sıra | Özellik              | Neden                          |
|------|----------------------|---------------------------------|
| 1    | Tema değiştirici     | Hemen fark edilir, çok istenir |
| 2    | İçerik data dosyası  | Bakımı kolay, tek kaynak       |
| 3    | Proje filtre         | Projeler çoğalınca çok işe yarar |
| 4    | İletişim formu       | Gerçek iletişim kanalı         |
| 5    | TR/EN dil seçimi     | Uluslararası görünürlük        |

İstersen bir sonraki adımda tema değiştirici veya proje filtresini birlikte adım adım kodlayabiliriz; hangisinden başlamak istediğini söylemen yeterli.
