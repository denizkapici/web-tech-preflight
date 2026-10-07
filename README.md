https://web-tech-preflight-beta.vercel.app/

# Web Geliştirme – Kampüs Etkinlikleri

Kampüs etkinliklerini listeleyen, ayrıntılarını gösteren ve yeni etkinlik eklemeye yarayan web uygulaması. Uygulama dönem boyunca sprintler hâlinde geliştirilir; her sprint kendi klasöründe durur ve ayrı bir adreste yayındadır.

## Sprintler

| Sprint | Konu | Klasör | Etiket | Canlı adres |
|---|---|---|---|---|
| Sprint 1 | HTML, Git ve yayına alma | kök dizin | `sprint-01` | https://web-tech-preflight-beta.vercel.app/ |
| Sprint 2 | CSS ve responsive tasarım | `sprint2/` | `sprint-02` | Vercel Root Directory: `sprint2` |
| Sprint 3 | JavaScript ve DOM | `sprint3/` | `sprint-03` | https://web-tech-preflight-beta.vercel.app/ (Root Directory: `sprint3`) |

## Klasör yapısı

    web-tech-preflight/
      index.html, sayfalar/   (Sprint 1, dokunulmadı)
      sprint2/
        css/2416501067.css
        index.html, etkinlikler.html, etkinlik-detay.html,
        etkinlik-ekle.html, etkinlik-guncelle.html, robotik-detay.html
      sprint3/
        css/2416501067.css
        js/data.js, event-list.js, event-detail.js, event-form.js
        index.html, etkinlikler.html, etkinlik-detay.html,
        etkinlik-ekle.html, etkinlik-guncelle.html
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

## Sprint 3 – JavaScript ve DOM

Fikir: veri tek yerde durur, sayfalar ondan üretilir. Sprint 2'deki elle yazılmış kartlar kaldırıldı; kartlar, detay sayfası ve form artık JavaScript ile çalışır. Framework, jQuery ve `localStorage` kullanılmadı. Modüller (`type="module"`) kullanıldığı için sayfa `file://` ile değil, Live Server veya Vercel üzerinden açılmalıdır (`http://127.0.0.1:5500/sprint3/`).

### Modüller

| Sayfa | Yüklediği modül | Ne yapar |
|---|---|---|
| `index.html` | `event-list.js` | `data-limit="2"` ile tarihi en yakın 2 etkinliği listeler |
| `etkinlikler.html` | `event-list.js` | 6 etkinliği listeler; arama + kategori filtresi |
| `etkinlik-detay.html` | `event-detail.js` | `?id=` ile doğru etkinliği açar; geçersiz id'de hata kutusu |
| `etkinlik-ekle.html` | `event-form.js` | Form doğrulama, hata/başarı mesajı |
| `etkinlik-guncelle.html` | `event-form.js` | Form `?id=` ile dolu gelir (`data-mode="guncelle"`) |

`data.js` HTML'e bağlanmaz; diğer modüller onu `import` eder.

### Veri (`data.js`)

6 etkinlik, her birinde `id, title, category, date, time, location, description, capacity` alanları vardır. `id` değerleri benzersizdir (`event-1` … `event-6`). Tarih `YYYY-AA-GG`, saat `SS:DD` biçimindedir; ekranda `toLocaleDateString("tr-TR")` ile "12 Ekim 2026" olarak gösterilir. Seminer ve Atölye kategorilerinde ikişer etkinlik vardır.

### Yapılanlar

- Kartlar `createCard` ile şablon metinden (`map + join + innerHTML`) üretilir; "Detayları gör" linki `etkinlik-detay.html?id=event-N` adresine gider.
- Ana sayfa etkinlik dizisinin kopyasını (`[...events]`) tarihe göre sıralayıp ilk 2'sini gösterir; sıralama asıl diziyi bozmaz.
- Etkinlikler sayfasında arama kutusu ve kategori seçimi birlikte çalışır. Kategori seçenekleri `new Set` ile veriden üretilir, arama `toLocaleLowerCase("tr-TR")` ile Türkçe büyük/küçük harfe uyumludur. Sonuç sayısı yazılır, sonuç yoksa "bulunamadı" mesajı çıkar. Enter'a basınca sayfa yenilenmez.
- Detay sayfası `URLSearchParams` + `find` ile etkinliği bulur; başlık, sekme adı ve künye (`dl/dt/dd`) o etkinliğe göre dolar. Bulunamazsa konsolda hata vermeden kırmızı hata kutusu ve "Listeye dön" görünür.
- Formlar `novalidate` ile tarayıcı balonlarını kapatır; kendi hata yerlerine (`span#ad-hata` …) kısa mesaj yazar, hatalı alanı `aria-invalid="true"` ile kırmızı yapar. Hata yoksa oluşan nesne yeşil kutuda JSON olarak gösterilir. Veri kaydedilmez.
- Doğrulama kuralları: ad en az 3 karakter, kategori seçili, tarih ve saat dolu, yer dolu, kontenjan girildiyse 1–1000 arası.
- Güncelleme sayfasına yalnızca detaydaki "Bu etkinliği güncelle" butonuyla gidilir (menüden çıkarıldı). id yoksa veya geçersizse form yerine uyarı ve "Etkinliklere git" görünür. Güncellemede mesaj "güncellendi" der ve id korunur.
- Adresten gelen id ve formdan girilen metin `textContent` ile yazılır; HTML olarak çalışmaz.
- `robotik-detay.html` kaldırıldı: Robotik Atölyesi artık `etkinlik-detay.html?id=event-2` ile açılır.
- CSS'e filtre kutusu, hata/başarı kutuları ve düğme stilleri eklendi; `:user-invalid` yerine JavaScript'in koyduğu `aria-invalid` kullanılır.

### Test

Her sayfa Live Server'da ve Vercel'de elle denendi; konsolda kırmızı hata yoktur.

| Ne yapıldı | Beklenen sonuç |
|---|---|
| Ana sayfa | Tarihi en yakın 2 etkinlik |
| Etkinlikler sayfası | 6 kart, "6 etkinlik listeleniyor." |
| Arama: `ATÖLYE` | 2 atölye |
| Seminer + `yapay` | 1 sonuç |
| Arama: `xyz` | "Aramanıza uygun etkinlik bulunamadı." |
| `?id=event-3` | Siber Güvenlik Söyleşisi açılır |
| `?id=event-99` ve id'siz adres | Kırmızı hata kutusu, sayfa çökmez |
| Boş Kaydet | 5 alanın altında kırmızı mesaj |
| Tüm alanlar doğru | Yeşil kutuda oluşan nesne |
| `etkinlik-guncelle.html?id=event-4` | Form o etkinlikle dolu |
| `etkinlik-guncelle.html` (id'siz) | Form yerine uyarı |

### Yayın

Vercel → Settings → Root Directory: `sprint2` yerine `sprint3`; ardından Deployments → Redeploy. Vercel bir sunucu olduğu için modüller orada da çalışır. Canlı adreste `?id=event-3` denenebilir. Teslim için:

    git add .
    git commit -m "Sprint3 yapıldı"
    git tag sprint-03
    git push
    git push --tags

## Yayına alma

Her sprint Vercel'de yayınlanır. Framework: Other, build komutu yok, Root Directory ilgili sprint klasörü (Sprint 2 için `sprint2`, Sprint 3 için `sprint3`).

## Hazırlayan

Deniz Kapıcı 2416501067
