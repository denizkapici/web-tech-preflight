import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");
const girisNotu = document.querySelector("#form-giris");

const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];
const guncelleme = form && form.dataset.mode === "guncelle";
let etkinlik = null; // güncelleme modunda düzenlenen etkinlik

// ---------- Güncelleme modu: adresteki id ile formu doldur ----------
function guncellemeyiHazirla() {
  const id = new URLSearchParams(location.search).get("id");
  etkinlik = events.find((e) => e.id === id);

  if (!etkinlik) {
    const uyari = document.createElement("div");
    uyari.innerHTML = `<p class="hata-kutusu" role="alert">Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
      <a class="dugme" href="etkinlikler.html">Etkinliklere git</a>`;
    form.replaceWith(uyari);
    if (girisNotu) girisNotu.remove();
    if (mesaj) mesaj.remove();
    return false;
  }

  form.elements.ad.value = etkinlik.title;
  form.elements.kategori.value = etkinlik.category;
  form.elements.tarih.value = etkinlik.date;
  form.elements.saat.value = etkinlik.time;
  form.elements.yer.value = etkinlik.location;
  form.elements.kontenjan.value = etkinlik.capacity ?? "";
  form.elements.aciklama.value = etkinlik.description;
  return true;
}

// ---------- Doğrulama ----------
function dogrula(data) {
  const errors = {};
  if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  if (!data.category) errors.kategori = "Bir kategori seçin.";
  if (!data.date) errors.tarih = "Tarih seçin.";
  if (!data.time) errors.saat = "Saat seçin.";
  if (!data.location) errors.yer = "Yer bilgisini yazın.";
  if (
    data.capacity !== null &&
    !(Number.isInteger(data.capacity) && data.capacity >= 1 && data.capacity <= 1000)
  ) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında bir sayı olmalı.";
  }
  return errors;
}

function hatalariGoster(errors) {
  alanlar.forEach((ad) => {
    const alan = form.elements[ad];
    const yer = document.querySelector(`#${ad}-hata`);
    if (errors[ad]) {
      yer.textContent = errors[ad];
      alan.setAttribute("aria-invalid", "true");
    } else {
      yer.textContent = ""; // düzeltilen alanın eski hatasını temizle
      alan.removeAttribute("aria-invalid");
    }
  });
}

function mesajGoster(tur, metin, nesne) {
  mesaj.className = `mesaj ${tur}`;
  const p = document.createElement("p");
  p.textContent = metin;
  mesaj.replaceChildren(p);
  if (nesne) {
    const pre = document.createElement("pre");
    pre.textContent = JSON.stringify(nesne, null, 2); // textContent: girilen metin HTML olarak çalışmaz
    mesaj.append(pre);
  }
  mesaj.scrollIntoView({ block: "nearest" });
}

// ---------- Gönderim ----------
function gonder(e) {
  e.preventDefault();

  const fd = new FormData(form);
  const kontenjanHam = fd.get("kontenjan").trim();
  const data = {
    id: guncelleme ? etkinlik.id : `event-${events.length + 1}`, // güncellemede id korunur
    title: fd.get("ad").trim(),
    category: fd.get("kategori"),
    date: fd.get("tarih"),
    time: fd.get("saat"),
    location: fd.get("yer").trim(),
    capacity: kontenjanHam === "" ? null : Number(kontenjanHam),
    description: fd.get("aciklama").trim(),
  };
  console.log(data);

  const errors = dogrula(data);
  hatalariGoster(errors);

  const hataliAlanlar = Object.keys(errors);
  if (hataliAlanlar.length > 0) {
    mesajGoster("hata", "Formda hatalı alanlar var.");
    form.elements[hataliAlanlar[0]].focus();
    return;
  }

  mesajGoster(
    "basari",
    guncelleme
      ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
      : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):",
    data
  );
}

if (form && mesaj) {
  const devam = guncelleme ? guncellemeyiHazirla() : true;
  if (devam) form.addEventListener("submit", gonder);
}
