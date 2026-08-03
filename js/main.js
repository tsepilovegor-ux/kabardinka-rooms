function buildWhatsAppUrl(phone, roomName) {
  const text = encodeURIComponent(
    `Здравствуйте! Хочу забронировать ${roomName}. Подскажите, пожалуйста, свободные даты.`
  );
  return `https://wa.me/${phone}?text=${text}`;
}

function formatPhoneDisplay(phone) {
  const digits = phone.replace(/\D/g, "");
  const local = digits.startsWith("7")
    ? digits.slice(1)
    : digits.startsWith("8")
      ? digits.slice(1)
      : digits;
  if (local.length !== 10) return phone;
  return `8 (${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6, 8)}-${local.slice(8)}`;
}

function renderContactLinks() {
  const contacts = SITE_CONFIG.contacts || [];
  if (!contacts.length) return "";

  return contacts
    .map((contact) => {
      const label = `${formatPhoneDisplay(contact.phone)} — ${contact.name}`;
      const tel = contact.phone.replace(/\D/g, "").replace(/^8/, "7");
      return `<a class="contact-link" href="tel:+${tel}">${label}</a>`;
    })
    .join("");
}

function renderBookingBlock() {
  const contacts = SITE_CONFIG.contacts || [];
  if (!contacts.length) return "";

  const phones = contacts
    .map((contact) => {
      const tel = contact.phone.replace(/\D/g, "").replace(/^8/, "7");
      return `<a class="room-card__phone" href="tel:+${tel}">${formatPhoneDisplay(contact.phone)} — ${contact.name}</a>`;
    })
    .join("");

  return `
    <div class="room-card__booking">
      <p class="room-card__booking-label">Бронирование по телефону</p>
      ${phones}
    </div>`;
}

function renderContacts() {
  const html = renderContactLinks();
  const location = document.getElementById("location-contacts");
  const footer = document.getElementById("footer-contacts");
  if (location) location.innerHTML = html;
  if (footer) footer.innerHTML = html;
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
        ${renderBookingBlock()}
      </div>
    </article>`
    )
    .join("");

  initRoomGalleries();
}

function bindSwipe(el, { onSwipeLeft, onSwipeRight, onTap } = {}) {
  if (!el) return;

  let startX = 0;
  let startY = 0;
  let tracking = false;
  let swiped = false;
  const threshold = 40;

  el.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length !== 1) return;
      tracking = true;
      swiped = false;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: true }
  );

  el.addEventListener(
    "touchend",
    (e) => {
      if (!tracking) return;
      tracking = false;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy) * 1.2) {
        swiped = true;
        if (dx < 0) onSwipeLeft?.();
        else onSwipeRight?.();
        return;
      }

      if (Math.abs(dx) < 12 && Math.abs(dy) < 12) {
        onTap?.(e);
      }
    },
    { passive: true }
  );

  el.addEventListener(
    "click",
    (e) => {
      if (!swiped) return;
      e.preventDefault();
      e.stopPropagation();
      swiped = false;
    },
    true
  );
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
      currentIndex = ((index % images.length) + images.length) % images.length;
      main.src = images[currentIndex];
      thumbs.forEach((t, i) => t.classList.toggle("active", i === currentIndex));
      if (counter) counter.textContent = `${currentIndex + 1} / ${images.length}`;
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

    bindSwipe(imageWrap, {
      onSwipeLeft: () => {
        if (getImages().length > 1) setPhoto(currentIndex + 1);
      },
      onSwipeRight: () => {
        if (getImages().length > 1) setPhoto(currentIndex - 1);
      },
      onTap: openZoom,
    });
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

  const viewport = track.closest(".shared-carousel__viewport") || track.parentElement;
  bindSwipe(viewport, {
    onSwipeLeft: () => {
      goTo(current + 1);
      startAutoplay();
    },
    onSwipeRight: () => {
      goTo(current - 1);
      startAutoplay();
    },
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

  bindSwipe(lb.querySelector(".lightbox__content") || lb, {
    onSwipeLeft: () => shiftLightbox(1),
    onSwipeRight: () => shiftLightbox(-1),
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
    const primary = SITE_CONFIG.contacts?.[0];
    const tel = primary
      ? `tel:+${primary.phone.replace(/\D/g, "").replace(/^8/, "7")}`
      : "#";
    transfer.innerHTML = `
      <p>${directions.transfer}</p>
      <a class="btn btn--primary" href="${tel}">Уточнить трансфер</a>`;
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
  renderContacts();
  renderAboutSection();
  initHeroSlideshow();
  initSharedCarousel();
  renderRooms();
  renderDirections();
  renderAttractions();
  initScrollReveal();
  initLightbox();
});
