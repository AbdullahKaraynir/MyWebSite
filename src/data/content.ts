/**
 * Tüm site metinleri tek yerden (TR / EN).
 * Değişiklik yapmak için sadece bu dosyayı düzenle.
 */

export type Locale = "tr" | "en";

export const content = {
  tr: {
    nav: {
      logo: "Abdullah Karaynir",
      projects: "Projeler",
      about: "Hakkımda",
      contact: "İletişim",
    },
    hero: {
      title: "Abdullah Karaynir",
      headline: "Ölçeklenebilir ve Akıllı Sistemler Mühendisliği",
      description:
        "Yapılandırılmış mimari ve yapay zeka odaklı mantıkla ölçeklenebilir mobil ve web uygulamaları geliştiren Full-Stack Developer.",
      tagline: "Şu an ölçeklenebilir kimlik doğrulama ve yapay zeka entegre sistemler üzerine çalışıyorum.",
      viewProjects: "Projeleri Gör",
      downloadCv: "CV İndir",
    },
    sections: {
      techStack: "Teknoloji Yığını",
      projects: "Projeler",
      about: "Hakkımda",
      contact: "İletişim",
    },
    about: {
      paragraph:
        "Ben, temiz mimari prensiplerini (Clean Architecture, SOLID) benimseyerek ölçeklenebilir ve sürdürülebilir yazılım sistemleri geliştirmeye odaklanan 4. sınıf Yazılım Mühendisliği öğrencisiyim. Sistem tasarımı, modüler yapı ve performans odaklı geliştirme konularına önem veriyorum. Aktif olarak yapay zeka sistemleri ve akıllı uygulama tasarımı üzerine çalışıyor; veri odaklı çözümleri gerçek dünya problemlerine entegre etmeyi hedefliyorum. Aynı zamanda full-stack projelerde görev alarak uçtan uca çözüm geliştirme deneyimi kazandım.",
    },
    contact: {
      email: "E-posta",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    projectCard: {
      github: "GitHub",
      liveDemo: "Canlı Demo",
      viewArchitecture: "Mimariyi Gör",
    },
    projects: {
      recycleye: {
        title: "RecycleEye",
        description:
          "YOLOv8 tabanlı mobil uygulama, atıkların fotoğrafını çekerek otomatik sınıflandırır. Gerçek zamanlı nesne tespiti ile geri dönüşüm süreçlerini destekleyen, pratik ve çevre odaklı bir çözüm sunar.",
      },
      screwtrue: {
        title: "ScrewTrue",
        description:
          "İki aşamalı kademeli model kullanan YOLOv11 tabanlı vida tespit sistemi. Mobil uygulama görüntüleri FastAPI backend'e gönderir; Roboflow ile sunucusuz çıkarım yapılarak gerçek vida tipi sınıflandırması yapılır.",
      },
      ecommerceapp: {
        title: "ECommerceApp",
        description:
          "Modern ve kullanıcı dostu bir e-ticaret uygulaması. Ürün listeleme, detay görüntüleme, sepete ekleme ve temel alışveriş akışlarını simüle eden bir demo projedir.",
      },
      fitcore: {
        title: "FitCore",
        description:
          "Evde egzersiz yapmak isteyenler için geliştirilen mobil fitness uygulaması. Kullanıcılar hazır programları seçebilir veya kendi antrenmanlarını oluşturabilir. Hareketler görsel destekli sunulur ve ilerleme takibi sunar.",
      },
    },
    footer: {
      copyright: "© 2026 Abdullah Karaynir",
      builtWith: "Next.js ile geliştirildi",
    },
    scrollToTop: "Yukarı çık",
  },
  en: {
    nav: {
      logo: "Abdullah Karaynir",
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
    hero: {
      title: "Abdullah Karaynir",
      headline: "Engineering Scalable & Intelligent Systems",
      description:
        "Full-Stack Developer building scalable mobile & web applications with structured architecture and AI-driven logic.",
      tagline: "Currently building scalable authentication & AI-integrated systems.",
      viewProjects: "View Projects",
      downloadCv: "Download CV",
    },
    sections: {
      techStack: "Tech Stack",
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
    about: {
      paragraph:
        "I am a 4th year Software Engineering student focused on building scalable applications with clean architecture (Clean Architecture, SOLID). I care about system design, modular structure and performance-oriented development. I am particularly interested in AI systems and intelligent application design, and aim to integrate data-driven solutions into real-world problems. I have also gained end-to-end development experience through full-stack projects.",
    },
    contact: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    projectCard: {
      github: "GitHub",
      liveDemo: "Live Demo",
      viewArchitecture: "View Architecture",
    },
    projects: {
      recycleye: {
        title: "RecycleEye",
        description:
          "The YOLOv8-based mobile app automatically categorizes waste by taking photos of it. It offers a practical and environmentally focused solution that supports recycling processes through real-time object detection.",
      },
      screwtrue: {
        title: "ScrewTrue",
        description:
          "YOLOv11-based screw detection system using a two-stage cascade model. Mobile app sends images to a FastAPI backend, performing serverless inference via Roboflow for accurate real-world screw type classification.",
      },
      ecommerceapp: {
        title: "ECommerceApp",
        description:
          "ECommerceApp is a modern and user-friendly e-commerce application. It is a demo project that simulates product listing, detail viewing, adding to cart, and basic shopping flows.",
      },
      fitcore: {
        title: "FitCore",
        description:
          "FitCore is a mobile fitness app developed for those who want to exercise at home. Users can choose pre-made programs or create their own workouts. Movements are visually supported and offer progress tracking.",
      },
    },
    footer: {
      copyright: "© 2026 Abdullah Karaynir",
      builtWith: "Built with Next.js",
    },
    scrollToTop: "Back to top",
  },
};

export type Content = (typeof content)["en"];

export function getContent(locale: Locale): Content {
  return content[locale] as Content;
}
