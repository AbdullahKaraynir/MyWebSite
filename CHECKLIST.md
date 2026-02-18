# Proje Çalıştırma & Tamamlama Kontrol Listesi

## Projeyi çalıştırmak için (teknik)

```bash
cd abdullah-portfolio
npm install
npm run dev
```

Tarayıcıda: **http://localhost:3000**

- **Environment variable / API key gerekmez** (statik portfolio).
- Build: `npm run build` → sorunsuz çalışıyor.

---

## Senin güncellemen gerekenler (içerik)

### 1. İletişim linkleri
| Dosya | Ne değiştir | Örnek |
|-------|-------------|--------|
| `src/components/Contact.tsx` | Email, LinkedIn, GitHub URL | `mailto:abdullah@email.com`, kendi profil linklerin |
| `src/components/Navbar.tsx` | Logo tıklanınca (`#`), GitHub, LinkedIn | Aynı profil linkleri |

### 2. CV indirme
| Dosya | Ne değiştir |
|-------|-------------|
| `src/components/Hero.tsx` | "Download CV" butonunun `href="#"` kısmı |

**Seçenekler:**
- CV'yi `public/cv.pdf` koy → `href="/cv.pdf"`
- Veya Google Drive / Dropbox linki → `href="https://..."`

### 3. Projeler
| Dosya | Ne değiştir |
|-------|-------------|
| `src/data/projects.ts` | Örnek 3 proje yerine **kendi projelerin**: gerçek ad, açıklama, tech stack, GitHub repo linki, varsa live demo linki |

---

## Opsiyonel

- **Favicon:** `src/app/favicon.ico` → kendi ikonun
- **README:** Proje açıklaması, nasıl çalıştırılır (isteğe bağlı)
- **Deploy:** GitHub’a push → Vercel’e bağla (repo’yu seç, deploy; env gerekmez)

---

## Özet

| Durum | Açıklama |
|-------|----------|
| Çalışması için | Eksik yok; `npm install` + `npm run dev` yeterli |
| Kişiselleştirme | Contact linkleri, CV linki, Navbar sosyal linkleri, `projects.ts` gerçek projeler |
