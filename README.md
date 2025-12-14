# 🧟‍♂️ Taste of Fear - Official Website

> **"Midem doldu ama ruhum hala aç..."**

Bu proje, geliştirmekte olduğumuz korku ve komedi temalı yemek yapma oyunu **Taste of Fear** için tasarlanmış modern, interaktif ve mobil uyumlu bir tanıtım (landing) web sitesidir.

🔗 **Canlı Demo (Live):** [https://taste-of-fear-website.vercel.app](https://taste-of-fear-website.vercel.app)

---

## 🎯 Proje Hakkında

Bu web sitesi sadece bir vitrin değil, aynı zamanda oyun geliştirme sürecinde **oyunculardan fikir almak ve topluluk oluşturmak** için bir araç olarak geliştirilmiştir.

Ziyaretçiler; oyunun karanlık atmosferini deneyimleyebilir, karakter hikayelerini okuyabilir, forumda tartışabilir ve **özel geliştirilmiş form sistemi** sayesinde bize yeni "iğrenç tarif" fikirleri gönderebilirler.

## 🛠️ Kullanılan Teknolojiler (Tech Stack)

* **Core:** React.js 18
* **Build Tool:** Vite (Hızlı HMR ve Build performansı için)
* **Styling:** Tailwind CSS (Responsive ve Modern UI)
* **Icons:** Lucide React
* **Topluluk:** Disqus React Integration
* **Veri Toplama:** Google Forms (Custom Implementation - Iframe kullanılmadan, arka planda veri gönderimi)

## 🔥 Öne Çıkan Özellikler

* **🎨 Atmosferik UI/UX:** Oyunun korku temasını yansıtan neon yeşil/siyah renk paleti, özel fontlar ve "nefes alan" animasyonlar.
* **📱 Tam Responsive Yapı:** Mobil, tablet ve masaüstü cihazlarda kusursuz görünüm (Tailwind Breakpoints).
* **⚡ Performans Optimizasyonu:** Görseller **WebP** formatına dönüştürülerek optimize edildi ve Lazy Loading uygulandı.
* **💬 Disqus Forumu:** Kullanıcıların oyun hakkında konuşabileceği entegre yorum sistemi.
* **📨 Custom Feedback Formu:**
    * Klasik `iframe` yerine, React state yönetimi ile çalışan özel bir form tasarlandı.
    * Veriler doğrudan Google Sheets'e POST edilir.
    * Sayfa yenilenmeden (SPA mantığına uygun) "Gönderildi" bildirimi verir.

## 📂 Proje Kurulumu (Local Development)

Projeyi kendi bilgisayarınızda çalıştırmak için:

1.  Repoyu klonlayın:
    ```bash
    git clone [https://github.com/zeynelzrn/taste-of-fear-website.git](https://github.com/zeynelzrn/taste-of-fear-website.git)
    ```

2.  Proje dizinine gidin:
    ```bash
    cd taste-of-fear-web
    ```

3.  Gerekli paketleri yükleyin:
    ```bash
    npm install
    ```

4.  Projeyi başlatın:
    ```bash
    npm run dev
    ```

## 📸 Ekran Görüntüleri

| Hero Section | Karakterler | Forum & Form |
|--------------|-------------|--------------|
| *Oyunun ana giriş ekranı ve atmosferi.* | *Karakter kartları ve hikayeleri.* | *Topluluk tartışma alanı ve iletişim.* |

---

Developed by **Zeynel Zeren** | 2025
Computer Engineering Student @ Yaşar University