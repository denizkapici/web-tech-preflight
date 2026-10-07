import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const filtreFormu = document.querySelector("#filtre-formu");
const arama = document.querySelector("#arama");
const kategoriSecimi = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

// "2026-10-12" -> "12 Ekim 2026" (yerel gece yarısı: saat dilimi kayması olmaz)
function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function createCard(event) {
  const kontenjan = event.capacity
    ? `<p class="meta">Kontenjan: ${event.capacity} kişi</p>`
    : "";
  return `<article>
    <h3>${event.title}</h3>
    <p class="meta"><span class="etiket">${event.category}</span></p>
    <p class="meta">Tarih: <time datetime="${event.date}T${event.time}">${formatDate(event.date)}, ${event.time}</time></p>
    <p class="meta">Yer: ${event.location}</p>
    ${kontenjan}
    <p>${event.description}</p>
    <a class="baglanti" href="etkinlik-detay.html?id=${event.id}">Detayları gör →</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

// ---------- Filtre (yalnızca filtre alanları olan sayfada) ----------
function kategoriSecenekleriniUret() {
  const kategoriler = [...new Set(events.map((e) => e.category))].sort((a, b) =>
    a.localeCompare(b, "tr-TR")
  );
  kategoriler.forEach((kategori) => {
    const secenek = document.createElement("option");
    secenek.value = kategori;
    secenek.textContent = kategori;
    kategoriSecimi.append(secenek);
  });
}

function filtrele() {
  const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
  const secili = kategoriSecimi.value;

  const sonuc = events.filter((e) => {
    const metin = [e.title, e.category, e.location, e.description]
      .join(" ")
      .toLocaleLowerCase("tr-TR");
    const metinUyuyor = metin.includes(aranan);
    const kategoriUyuyor = secili === "" || e.category === secili;
    return metinUyuyor && kategoriUyuyor;
  });

  render(sonuc);
  sonucSatiri.textContent =
    sonuc.length === 0
      ? "Aramanıza uygun etkinlik bulunamadı."
      : `${sonuc.length} etkinlik listeleniyor.`;
}

// ---------- Başlat ----------
if (list) {
  if (list.dataset.limit) {
    // Ana sayfa: tarihe göre en yakın N etkinlik (asıl diziyi bozmamak için kopya)
    const yaklasan = [...events]
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
      .slice(0, Number(list.dataset.limit));
    render(yaklasan);
  } else if (filtreFormu && arama && kategoriSecimi && sonucSatiri) {
    // Etkinlikler sayfası: arama + kategori
    kategoriSecenekleriniUret();
    arama.addEventListener("input", filtrele);
    kategoriSecimi.addEventListener("change", filtrele);
    filtreFormu.addEventListener("submit", (e) => e.preventDefault());
    window.addEventListener("pageshow", filtrele); // geri/yenile sonrası alanlarla senkron kal
    filtrele();
  } else {
    render(events);
  }
}
