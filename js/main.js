function buildWhatsAppUrl(phone, roomName) {
  const text = encodeURIComponent(
    `Здравствуйте! Хочу забронировать ${roomName}. Подскажите, пожалуйста, свободные даты.`
  );
  return `https://wa.me/${phone}?text=${text}`;
}

function getRoomImages(room) {
  if (room.images?.length) return room.images;
  if (room.image) return [room.image];
  return [];
}

function renderRoomGallery(room) {
  const images = getRoomImages(room);
  const main = images[0] || "";
  const hasGallery = images.length > 1;

  const thumbs = hasGallery
    ? `<div class="room-card__thumbs">
        ${images
          .map(
            (src, i) =>
              `<button type="button" class="room-card__thumb${i === 0 ? " active" : ""}" data-src="${src}" aria-label="Фото ${i + 1}"><img src="${src}" alt="" loading="lazy"></button>`
          )
          .join("")}
      </div>`
    : "";

  const counter = hasGallery
    ? `<span class="room-card__counter">1 / ${images.length}</span>`
    : "";

  const zoomBtn = main
    ? `<button type="button" class="room-card__zoom" aria-label="Увеличить фото">
         <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14zM13 9.5h-2v2H9v-2H7V8h2V6h2v2h2v1.5z"/></svg>
       </button>`
    : "";

  return `
    <div class="room-card__gallery" data-room-name="${room.name}">
      <div class="room-card__image${main ? "" : " room-card__image--placeholder"}">
        <img class="room-card__main" src="${main}" alt="${room.name}" loading="lazy"
             onerror="this.closest('.room-card__image').classList.add('room-card__image--placeholder')">
        <span class="room-card__badge">${room.name}</span>
        ${counter}
        ${zoomBtn}
      </div>
      ${thumbs}
    </div>`;
}

function renderRooms() {
  const grid = document.getElementById("rooms-grid");
  if (!grid) return;

  grid.innerHTML = SITE_CONFIG.rooms
    .map(
      (room) => `
    <article class="room-card" data-room="${room.id}">
      ${renderRoomGallery(room)}
      <div class="room-card__body">
        <p class="room-card__capacity">${room.capacity}</p>
        <p class="room-card__desc">${room.description}</p>
        <a class="btn btn--whatsapp" href="${buildWhatsAppUrl(SITE_CONFIG.whatsappPhone, room.name)}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
          Забронировать в WhatsApp
        </a>
      </div>
    </article>`
    )
    .join("");

  initRoomGalleries();
}

function initRoomGalleries() {
  document.querySelectorAll(".room-card__gallery").forEach((gallery) => {
    const main = gallery.querySelector(".room-card__main");
    const counter = gallery.querySelector(".room-card__counter");
    const thumbs = gallery.querySelectorAll(".room-card__thumb");
    const zoomBtn = gallery.querySelector(".room-card__zoom");
    const imageWrap = gallery.querySelector(".room-card__image");
    if (!main) return;

    let currentIndex = 0;

    function getImages() {
      if (thumbs.length) return [...thumbs].map((t) => t.dataset.src);
      return main.src ? [main.src] : [];
    }

    function setPhoto(index) {
      const images = getImages();
      if (!images.length) return;
      currentIndex = index;
      main.src = images[index];
      thumbs.forEach((t, i) => t.classList.toggle("active", i === index));
      if (counter) counter.textContent = `${index + 1} / ${images.length}`;
    }

    function openZoom() {
      const images = getImages();
      if (!images.length || imageWrap?.classList.contains("room-card__image--placeholder")) return;
      openLightbox(images, currentIndex, gallery.dataset.roomName || "");
    }

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener("click", () => setPhoto(index));
      thumb.addEventListener("dblclick", openZoom);
    });

    zoomBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      openZoom();
    });

    main.addEventListener("click", openZoom);
  });
}

const lightboxState = { images: [], index: 0, title: "" };

function openLightbox(images, index, title) {
  lightboxState.images = images;
  lightboxState.index = index;
  lightboxState.title = title;
  updateLightbox();
  const lb = document.getElementById("lightbox");
  lb.hidden = false;
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  document.getElementById("lightbox").hidden = true;
  document.body.classList.remove("lightbox-open");
}

function updateLightbox() {
  const { images, index, title } = lightboxState;
  const lb = document.getElementById("lightbox");
  const img = lb.querySelector(".lightbox__img");
  img.src = images[index];
  img.alt = `${title} — фото ${index + 1}`;
  lb.querySelector(".lightbox__caption").textContent = title;
  lb.querySelector(".lightbox__counter").textContent = `${index + 1} / ${images.length}`;
  lb.querySelector(".lightbox__prev").hidden = images.length <= 1;
  lb.querySelector(".lightbox__next").hidden = images.length <= 1;
}

function shiftLightbox(delta) {
  const total = lightboxState.images.length;
  if (total <= 1) return;
  lightboxState.index = (lightboxState.index + delta + total) % total;
  updateLightbox();
}

function renderSharedCard(space) {
  const hasImage = Boolean(space.image);
  const imageBlock = hasImage
    ? `<div class="shared-card__image"><img src="${space.image}" alt="${space.name}" loading="lazy"><span class="shared-card__icon">${space.icon}</span></div>`
    : `<div class="shared-card__image shared-card__image--placeholder"><span class="shared-card__icon">${space.icon}</span></div>`;

  return `
    <article class="shared-card">
      ${imageBlock}
      <div class="shared-card__body">
        <h3>${space.name}</h3>
        <p>${space.description}</p>
      </div>
    </article>`;
}

function initSharedCarousel() {
  const track = document.getElementById("shared-track");
  const dotsContainer = document.getElementById("shared-dots");
  const about = SITE_CONFIG.about || {};
  const spaces = about.places || [];
  if (!track || !dotsContainer || !spaces.length) return;

  track.innerHTML = spaces.map(renderSharedCard).join("");
  dotsContainer.innerHTML = spaces
    .map(
      (_, i) =>
        `<button type="button" class="shared-carousel__dot${i === 0 ? " active" : ""}" data-index="${i}" aria-label="${spaces[i].name}"></button>`
    )
    .join("");

  let current = 0;
  let timer;

  function goTo(index) {
    current = (index + spaces.length) % spaces.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll(".shared-carousel__dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  }

  function startAutoplay() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), about.slideInterval || 4500);
  }

  dotsContainer.querySelectorAll(".shared-carousel__dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(Number(dot.dataset.index));
      startAutoplay();
    });
  });

  startAutoplay();
}

function renderAboutSection() {
  const about = SITE_CONFIG.about;
  if (!about) return;

  const title = document.getElementById("about-title");
  const subtitle = document.getElementById("about-subtitle");
  const text = document.getElementById("about-text");

  if (title && about.title) title.textContent = about.title;
  if (subtitle && about.subtitle) subtitle.textContent = about.subtitle;
  if (text && about.paragraphs?.length) {
    text.innerHTML = about.paragraphs.map((p) => `<p>${p}</p>`).join("");
  }
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    if (isInViewport(el)) {
      el.classList.add("visible");
    } else {
      observer.observe(el);
    }
  });
}

function initHeroSlideshow() {
  const container = document.getElementById("hero-slideshow");
  const slides = SITE_CONFIG.heroSlides || [];
  if (!container || slides.length === 0) return;

  container.innerHTML = slides
    .map(
      (src, i) =>
        `<div class="hero__slide${i === 0 ? " active" : ""}" style="background-image:url('${src}')"></div>`
    )
    .join("");

  if (slides.length === 1) return;

  const elements = container.querySelectorAll(".hero__slide");
  let current = 0;
  const interval = SITE_CONFIG.heroSlideInterval || 5000;

  setInterval(() => {
    elements[current].classList.remove("active");
    current = (current + 1) % elements.length;
    elements[current].classList.add("active");
  }, interval);
}

function initLightbox() {
  const lb = document.getElementById("lightbox");
  if (!lb) return;

  lb.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
  lb.querySelector(".lightbox__prev").addEventListener("click", () => shiftLightbox(-1));
  lb.querySelector(".lightbox__next").addEventListener("click", () => shiftLightbox(1));

  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") shiftLightbox(-1);
    if (e.key === "ArrowRight") shiftLightbox(1);
  });
}

function renderDirections() {
  const directions = SITE_CONFIG.directions;
  if (!directions) return;

  const subtitle = document.getElementById("location-subtitle");
  const list = document.getElementById("directions-list");
  const transfer = document.getElementById("transfer-note");

  if (subtitle && directions.subtitle) subtitle.textContent = directions.subtitle;

  if (list && directions.routes?.length) {
    list.innerHTML = directions.routes
      .map(
        (route) => `
      <article class="direction-card">
        <div class="direction-card__head">
          <span class="direction-card__icon">${route.icon}</span>
          <h4 class="direction-card__title">${route.title}</h4>
        </div>
        <p class="direction-card__text">${route.text}</p>
      </article>`
      )
      .join("");
  }

  if (transfer && directions.transfer) {
    const transferUrl = buildWhatsAppUrl(
      SITE_CONFIG.whatsappPhone,
      "Здравствуйте! Интересует трансфер до гостевого дома."
    );
    transfer.innerHTML = `
      <p>${directions.transfer}</p>
      <a class="btn btn--primary" href="${transferUrl}" target="_blank" rel="noopener">Уточнить трансфер</a>`;
  }
}

function renderAttractions() {
  const list = document.getElementById("attractions-list");
  if (!list) return;

  list.innerHTML = SITE_CONFIG.attractions
    .map(
      (a) => `
    <li class="attraction">
      <span class="attraction__icon">${a.icon}</span>
      <div>
        <strong>${a.name}</strong>
        <span>${a.distance}</span>
      </div>
    </li>`
    )
    .join("");
}

function fillStaticContent() {
  const addr = SITE_CONFIG.address;

  document.getElementById("hero-address").textContent = addr.full;
  document.getElementById("hero-sea").textContent = addr.seaWalk;
  document.getElementById("location-address").textContent = addr.full;
  document.getElementById("location-sea").textContent = addr.seaWalk;
  document.getElementById("map-link").href = addr.mapUrl;
  document.getElementById("footer-address").textContent = addr.full;

  const qrImg = document.getElementById("qr-code");
  const qrUrl = document.getElementById("qr-url");
  if (qrImg && SITE_CONFIG.siteUrl) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(SITE_CONFIG.siteUrl)}`;
    qrImg.alt = "QR-код для доступа к сайту";
  }
  if (qrUrl) qrUrl.textContent = SITE_CONFIG.siteUrl;
}

document.addEventListener("DOMContentLoaded", () => {
  fillStaticContent();
  renderAboutSection();
  initHeroSlideshow();
  initSharedCarousel();
  renderRooms();
  renderDirections();
  renderAttractions();
  initScrollReveal();
  initLightbox();
});
