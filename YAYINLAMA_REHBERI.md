# Web Sitesini Domain ile Yayınlama Rehberi

Domain aldıysan aşağıdaki adımları sırayla uygulayarak siteyi canlıya alabilirsin. En pratik yol: **GitHub + Vercel + kendi domain**.

---

## Adım 1: Projeyi GitHub’a Yükle

1. **GitHub’da yeni repo oluştur**
   - https://github.com/new
   - Repository name: `abdullah-portfolio` (veya istediğin isim)
   - Public seç, "Create repository" tıkla

2. **Projeyi bilgisayarından GitHub’a gönder**
   - Proje klasöründe (`abdullah-portfolio`) terminal/PowerShell aç.
   - Aşağıdaki komutları sırayla çalıştır:

```bash
cd abdullah-portfolio
git init
git add .
git commit -m "Portfolio site - initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/REPO_ADI.git
git push -u origin main
```

- `KULLANICI_ADIN` → GitHub kullanıcı adın  
- `REPO_ADI` → Az önce oluşturduğun repo adı (örn. `abdullah-portfolio`)

Eğer proje zaten bir klasörün içindeyse (örn. `AbdullahKaraynirWebSite/abdullah-portfolio`), `cd` ile `abdullah-portfolio` klasörüne girip bu komutları orada çalıştır.

---

## Adım 2: Vercel’e Kayıt ve Proje Bağlama

1. **Vercel’e gir**
   - https://vercel.com → "Sign Up" veya "Log In"
   - "Continue with GitHub" ile GitHub hesabınla giriş yap.

2. **Yeni proje (Import)**
   - "Add New..." → "Project"
   - "Import Git Repository" bölümünde az önce push ettiğin repo’yu seç (örn. `AbdullahKaraynir/abdullah-portfolio`).
   - "Import" tıkla.

3. **Ayarları kontrol et**
   - Framework Preset: **Next.js** (otomatik seçilir)
   - Root Directory: boş bırak (proje kökünde ise)
   - Build Command: `npm run build` (varsayılan)
   - Output Directory: varsayılan kalsın
   - "Deploy" tıkla.

4. **İlk deploy**
   - Birkaç dakika sonra site yayında olur.
   - Vercel sana `https://abdullah-portfolio-xxx.vercel.app` gibi bir adres verir; bu adresi açarak siteyi test et.

---

## Adım 3: Kendi Domain’i Vercel’e Ekleme

1. **Vercel proje sayfasında**
   - Projeyi seç → üst menüden **"Settings"** → sol menüden **"Domains"**.

2. **Domain ekle**
   - "Add" veya "Add Domain" alanına domain’ini yaz (örn. `abdullahkaraynir.com` veya `www.abdullahkaraynir.com`).
   - Enter’a bas. Vercel domain’in sahipliğini kontrol eder ve sana **hangi DNS kayıtlarını eklemen gerektiğini** gösterir.

3. **Vercel’in söylediği kayıtları not al**
   - Genelde şunlardan biri (veya ikisi) istenir:
     - **A record:** `76.76.21.21` (Vercel’in IP’si; bazen farklı bir IP de verebilir, ekrandaki değeri kullan).
     - **CNAME record:** `cname.vercel-dns.com` (çoğu zaman `www` için CNAME kullanılır).

Vercel ekranında tam olarak ne yazacağın (Host / Name, Value, Type) gösterilir; oradaki bilgiyi kullan.

---

## Adım 4: Domain Sağlayıcında DNS Ayarları

Domain’i nereden aldıysan (GoDaddy, Namecheap, Cloudflare, GetDomain, Turhost, vs.) o panelden DNS / Domain Yönetimi bölümüne gir.

### Örnek 1: Sadece `abdullahkaraynir.com` (www’suz)

| Tür   | Name / Host | Value / Hedef        |
|-------|-------------|----------------------|
| A     | `@`         | `76.76.21.21`        |

(Value’yu Vercel’in Domains sayfasında yazdığı ile değiştir.)

### Örnek 2: Hem `www` hem kök domain

| Tür   | Name / Host | Value / Hedef        |
|-------|-------------|----------------------|
| A     | `@`         | `76.76.21.21`        |
| CNAME | `www`       | `cname.vercel-dns.com` |

- **Name/Host:** Bazen `@` “kökle” için, `www` ise “www” için ayrı satırda yazılır. Sağlayıcıya göre alan adı `@`, `""` veya domain adın da olabilir; paneldeki açıklamaya bak.
- **Value:** Vercel’in Domains sayfasında yazdığı değeri aynen kopyala.

Kayıtları ekledikten sonra **Save** / **Kaydet** tıkla.

---

## Adım 5: SSL ve Yayına Alma

1. **Bekleme**
   - DNS değişiklikleri 5 dakika – 48 saat arasında yayılır; çoğu zaman 15–30 dakikada çalışır.

2. **Vercel’de kontrol**
   - Vercel → Proje → **Domains**.
   - Domain’in yanında yeşil tik ve "Valid Configuration" görünene kadar bekleyebilirsin. Hata varsa Vercel hangi kaydı eklemen gerektiğini tekrar gösterir.

3. **SSL (HTTPS)**
   - Vercel, domain’i projeye bağladığında **otomatik** SSL sertifikası verir. Ek bir işlem yapmana gerek yok; `https://abdullahkaraynir.com` şeklinde açılır.

---

## Adım 6: Son Kontroller

- [ ] Tarayıcıda `https://senin-domain.com` açılıyor mu?
- [ ] `www` kullandıysan `https://www.senin-domain.com` da açılıyor mu?
- [ ] TR/EN ve dark mode doğru çalışıyor mu?
- [ ] CV indirme, GitHub/LinkedIn/Email linkleri doğru mu?

---

## Sık Karşılaşılan Durumlar

| Sorun | Çözüm |
|--------|--------|
| "Domain not found" / Site açılmıyor | DNS kayıtlarını kontrol et; A ve CNAME değerlerini Vercel’deki ile aynı yaptığından emin ol. 24 saate kadar bekle. |
| www çalışıyor, kök (domain.com) çalışmıyor | Kök domain için A record’u eklediğinden emin ol (Host: `@`, Value: `76.76.21.21`). |
| "Certificate" / SSL uyarısı | Vercel’de domain "Valid" olduktan sonra birkaç dakika içinde SSL otomatik gelir; sayfayı bir süre sonra tekrar dene. |
| Yeni commit’ler yayına düşmüyor | Vercel, GitHub’a her push’ta otomatik build alır. Repo’yu Vercel’e bağlarken "Deploy on push" açık olmalı (varsayılan). |

---

## Özet Sıra

1. Projeyi GitHub’a push et.  
2. Vercel’e gir, GitHub repo’yu import et, deploy et.  
3. Vercel’de Settings → Domains’ten kendi domain’ini ekle.  
4. Domain sağlayıcında Vercel’in söylediği A ve/veya CNAME kayıtlarını ekle.  
5. DNS yayılmasını bekle, sonra `https://senin-domain.com` ile test et.  

Bu rehberi proje klasöründe `YAYINLAMA_REHBERI.md` olarak kaydettim; istediğin zaman bu dosyadan takip edebilirsin.
