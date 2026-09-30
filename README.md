# Web Geliştirme – Kampüs Etkinlikleri

Kampüs etkinliklerini listeleyen, ayrıntılarını gösteren ve yeni etkinlik eklemeye yarayan web uygulaması. Uygulama dönem boyunca sprintler hâlinde geliştirilir; her sprint kendi klasöründe durur ve ayrı bir adreste yayındadır.

## Sprintler

| Sprint | Konu | Klasör | Etiket | Canlı adres |
|---|---|---|---|---|
| Sprint 1 | HTML, Git ve yayına alma | kök dizin | `sprint-01` | https://web-tech-preflight-beta.vercel.app/ |
| Sprint 2 | CSS ve responsive tasarım | `sprint2/` | `sprint-02` | Vercel Root Directory: `sprint2` |

## Klasör yapısı

    web-tech-preflight/
      index.html, sayfalar/   (Sprint 1, dokunulmadı)
      sprint2/
        css/2416501067.css
        index.html, etkinlikler.html, etkinlik-detay.html,
        etkinlik-ekle.html, etkinlik-guncelle.html, robotik-detay.html
      .gitignore
      README.md

## Sprint 1 – HTML, Git ve Yayına Alma

Uygulamanın iskeleti yalnızca HTML ile kuruldu; CSS ve JavaScript kullanılmadı.

| Sayfa | İçerik |
|---|---|
| `index.html` | Uygulamanın amacı, yaklaşan iki etkinlik |
| `etkinlikler.html` | Etkinlik listesi (her etkinlik bir hücre) ve Ayın Programı tablosu |
| `etkinlik-detay.html` | Afiş, künye (tarih, yer, kategori, kontenjan), açıklama |
| `etkinlik-ekle.html` | Yeni etkinlik formu |
| `etkinlik-guncelle.html` | Doldurulmuş güncelleme formu |

## Sprint 2 – CSS ve Responsive Tasarım

Sprint 1'deki HTML bozulmadan üzerine CSS giydirildi. Öncelik telefondur (mobile-first); aynı sayfalar geniş ekranda çok sütunlu görünür.

### Numaram = renk ve font

| Değişken | Değer | Açıklama |
|---|---|---|
| `--no` | `2416501067` | Öğrenci numarası |
| `--ton` | `mod(var(--no), 360)` = **347** | Renk tonu (hue) |
| `--renk-ana` | `hsl(347 65% 38%)` | Ana renk |
| `--renk-zemin` | `hsl(347 30% 97%)` | Sayfa zemini |
| `--font` | `"Palatino Linotype", serif` | Son hane 7 |

Renk ve boşluklar dosyada yalnızca `var(--...)` ile kullanılır; ham değerler yalnızca `:root` içindedir. Stil dosyası: `sprint2/css/2416501067.css` (ilk satırda künye bulunur).

### Sayfalar

| Sayfa | Geniş ekran | Telefon |
|---|---|---|
| `index.html` | Amaç metni, yaklaşan 2 etkinlik yan yana | Tek sütun |
| `etkinlikler.html` | Tüm etkinlikler 3 sütun kart | Tek sütun |
| `etkinlik-detay.html` | Afiş solda, künye (`dl`) sağda | Alt alta |
| `etkinlik-ekle.html` | Label üstte form, hatalı alan kırmızı | Aynı, tam genişlik |
| `etkinlik-guncelle.html` | Aynı form, alanlar dolu | Aynı, tam genişlik |

`robotik-detay.html` Sprint 1'den gelen ek detay sayfasıdır. Beş sayfa da aynı başlık ve menüyü kullanır.

### Yapılanlar

- Sprint 1'deki çerçeveli tablolar kaldırıldı; etkinlikler `section > article` kartları oldu (`display: grid`).
- Telefonda tek sütun; 40rem üstünde iki, 64rem üstünde üç sütun (ana sayfada yalnızca 2 etkinlik).
- Tüm sayfalara `viewport` etiketi eklendi, yatay kaydırma ve taşma yoktur.
- Menü telefonda satır atlayarak sığar; buton, bağlantı ve form alanları en az 44 px yüksekliktedir.
- Formlarda boş veya hatalı alan (`:user-invalid`) kırmızı olur ve altında hata mesajı görünür.
- Kategori listesindeki yazım hataları düzeltildi.

### Yayın

Vercel → Settings → Root Directory: `sprint2`. Teslim için:

    git add .
    git commit -m "Sprint2 yapıldı"
    git tag sprint-02
    git push && git push --tags

## Yayına alma

Her sprint Vercel'de ayrı bir proje olarak yayınlanır. Framework: Other, build komutu yok, Root Directory ilgili sprint klasörü (Sprint 2 için `sprint2`).

## Hazırlayan

Deniz Kapıcı 2416501067

