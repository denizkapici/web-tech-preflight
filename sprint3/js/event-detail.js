import { events } from "./data.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("#baslik");

// Afişi olan etkinlikler (diğerleri afişsiz gösterilir)
const afisler = {
  "event-1": "afis.jpg",
  "event-2": "afis2.jpg",
};

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function hataGoster(id) {
  document.title = "Etkinlik bulunamadı";
  baslik.textContent = "Etkinlik bulunamadı";

  const kutu = document.createElement("p");
  kutu.className = "hata-kutusu";
  kutu.setAttribute("role", "alert");
  // id adresten geldiği için textContent ile yazılır (HTML olarak yorumlanmaz)
  kutu.textContent = id
    ? `"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
    : "Etkinlik seçilmedi. Listeden bir etkinlik seçin.";

  const geri = document.createElement("a");
  geri.className = "dugme";
  geri.href = "etkinlikler.html";
  geri.textContent = "← Listeye dön";

  container.replaceChildren(kutu, geri);
}

function detayGoster(event) {
  document.title = event.title;
  baslik.textContent = event.title;

  const afis = afisler[event.id];
  const figure = afis
    ? `<figure>
        <img src="${afis}" alt="${event.title} afişi" width="495" height="723">
        <figcaption>Şekil 1: etkinlik afişi</figcaption>
      </figure>`
    : "";
  const kontenjan = event.capacity ? `${event.capacity} kişi` : "Belirtilmedi";

  container.innerHTML = `<article class="detay${afis ? "" : " afissiz"}">
    ${figure}
    <div>
      <dl class="kunye">
        <div>
          <dt>Tarih</dt>
          <dd><time datetime="${event.date}T${event.time}">${formatDate(event.date)}, ${event.time}</time></dd>
        </div>
        <div>
          <dt>Yer</dt>
          <dd>${event.location}</dd>
        </div>
        <div>
          <dt>Kategori</dt>
          <dd>${event.category}</dd>
        </div>
        <div>
          <dt>Kontenjan</dt>
          <dd>${kontenjan}</dd>
        </div>
      </dl>
      <h2>Açıklama</h2>
      <p>${event.description}</p>
      <div class="dugmeler">
        <a class="dugme" href="etkinlikler.html">← Listeye dön</a>
        <a class="dugme" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
      </div>
    </div>
  </article>`;
}

if (container && baslik) {
  const id = new URLSearchParams(location.search).get("id");
  const event = events.find((e) => e.id === id);

  if (!event) {
    hataGoster(id);
  } else {
    detayGoster(event);
  }
}
