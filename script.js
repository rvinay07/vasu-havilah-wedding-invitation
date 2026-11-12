// ========================================
// CENTRALIZED WEDDING CONFIGURATION
// All details editable in this single block
// ========================================
const weddingConfig = {
  groomName: "VASU",
  brideName: "MERCY HAVILAH",
  groomFather: "N.JEPHANIAH",
  groomMother: "N.UMA DEVI",
  brideFather: "S.DEENA SHEKHAR",
  brideMother: "S.ESTHER",
  contactNumbers: [
    "+91 8978148996",
    "+91 9652296062 (VASU)",
    "+91 6281047922 (HOSHI)"
  ],
  weddingDate: "2027-02-03T09:00:00",
  receptionDate: "2027-02-28T19:00:00",
  weddingVenue: "Mahendra Kalyana Mandapam",
  weddingAddress: "Tilak Nagar,Guntakal",
  weddingMapsUrl: "https://maps.app.goo.gl/Mic6WHfh54kWS1m6A",
  receptionVenue: "Sri Thimmaih Kalyana Mandapam",
  receptionAddress: "Bollavaram Rural,Proddatur",
  receptionMapsUrl: "https://maps.app.goo.gl/g9VhPVfzPj7Lbq7h9",
  bibleVerse: "Therefore what God has joined together, let no one separate.",
  bibleReference: "Matthew 19:6",
  music: "assets/music/wedding.mp3",
  video: "assets/videos/wedding.mp4"
};

// ========================================
// IMAGE ASSETS (16:9 PROPORTIONS)
// ========================================
const images = {
  hero: "assets/images/hero.jpg",
  groom: "assets/images/groom.jpg",
  bride: "assets/images/bride.jpg",
  groomParents: "assets/images/groom-parents.jpg",
  brideParents: "assets/images/bride-parents.jpg",
  gallery: [
    "assets/images/gallery-1.jpg",
    "assets/images/gallery-2.jpg",
    "assets/images/gallery-3.jpg",
    "assets/images/gallery-4.jpg",
    "assets/images/gallery-5.jpg",
    "assets/images/gallery-6.jpg"
  ],
  galleryCaptions: [
    "A walk of grace and peace",
    "Walking together in faith and joy",
    "Joy, faith, and laughter in His light",
    "Joyful beginnings guided by love",
    "A cherished promise sealed before God",
    "Forever united in His holy love"
  ]
};

// ========================================
// THEME CONTROLLER (Light & Sacred Dark)
// ========================================
const THEME_KEY = "weddingTheme";
const themeToggleBtn = document.getElementById("theme-toggle");

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
}

const savedTheme = (() => {
  try {
    return localStorage.getItem(THEME_KEY) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  } catch (e) {
    return "light";
  }
})();
applyTheme(savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    applyTheme(isDark ? "light" : "dark");
  });
}

// ========================================
// DOM DATA BINDING
// ========================================
const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach(element => {
    element.textContent = value;
  });
};

Object.entries(weddingConfig).forEach(([key, value]) => {
  if (typeof value === "string") {
    setText(`[data-config="${key}"]`, value);
  }
});

document.title = `${weddingConfig.groomName} & ${weddingConfig.brideName} | Wedding Invitation`;

// Bind Main Portraits
const imageBindings = [
  ["hero-image", images.hero],
  ["groom-image", images.groom],
  ["bride-image", images.bride],
  ["groom-parents-image", images.groomParents],
  ["bride-parents-image", images.brideParents]
];

imageBindings.forEach(([id, path]) => {
  const image = document.getElementById(id);
  if (!image) return;
  const frame = image.closest(".media-frame");
  image.src = path;
  image.addEventListener("load", () => frame?.classList.add("has-image"));
  image.addEventListener("error", () => frame?.classList.remove("has-image"));
});

// Bind Gallery Images
document.querySelectorAll("[data-gallery-image]").forEach((image, index) => {
  const frame = image.closest(".media-frame");
  if (images.gallery[index]) {
    image.src = images.gallery[index];
    image.addEventListener("load", () => frame?.classList.add("has-image"));
    image.addEventListener("error", () => frame?.classList.remove("has-image"));
  }
});

// Bind Footer Contacts
document.querySelectorAll("[data-footer-contact]").forEach(link => {
  const index = Number(link.dataset.footerContact);
  const number = weddingConfig.contactNumbers[index] || "";
  link.textContent = number;
  if (number) {
    link.href = `tel:${number.replace(/[^+\d]/g, "")}`;
  }
});

// ========================================
// DATE FORMATTING & GOOGLE MAPS
// ========================================
const validDate = val => !Number.isNaN(new Date(val).getTime());
const prettyDate = val => validDate(val)
  ? new Intl.DateTimeFormat(undefined, { day: "numeric", month: "long", year: "numeric" }).format(new Date(val))
  : "Date to be announced";
const prettyTime = val => validDate(val)
  ? new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date(val))
  : "Time to be announced";

document.querySelectorAll("[data-wedding-date]").forEach(el => { el.textContent = prettyDate(weddingConfig.weddingDate); });
document.querySelectorAll("[data-wedding-time]").forEach(el => { el.textContent = prettyTime(weddingConfig.weddingDate); });
document.querySelectorAll("[data-reception-date]").forEach(el => { el.textContent = prettyDate(weddingConfig.receptionDate); });
document.querySelectorAll("[data-reception-time]").forEach(el => { el.textContent = prettyTime(weddingConfig.receptionDate); });

[
  ["wedding", weddingConfig.weddingMapsUrl],
  ["reception", weddingConfig.receptionMapsUrl]
].forEach(([kind, mapUrl]) => {
  const link = document.getElementById(`${kind}-directions`);
  const preview = document.querySelector(`[aria-label*="${kind}"]`);

  if (mapUrl) {
    if (link) link.href = mapUrl;
    if (preview) {
      preview.style.cursor = "pointer";
      preview.addEventListener("click", () => window.open(mapUrl, "_blank", "noopener"));
    }
  }
});

// ========================================
// LIVE WEDDING & RECEPTION COUNTDOWNS
// ========================================
function updateCountdown(elementId, dateString) {
  const element = document.getElementById(elementId);
  if (!element) return;
  const status = element.querySelector(".countdown-status");
  const grid = element.querySelector(".countdown-grid");

  if (!validDate(dateString)) {
    if (grid) grid.hidden = true;
    if (status) { status.hidden = false; status.textContent = "Date to be announced"; }
    return;
  }

  const distance = new Date(dateString).getTime() - Date.now();
  if (distance <= 0) {
    if (grid) grid.hidden = true;
    if (status) { status.hidden = false; status.textContent = "The celebration has begun ✨"; }
    return;
  }

  if (grid) grid.hidden = false;
  if (status) status.hidden = true;

  const units = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };

  Object.entries(units).forEach(([unit, value]) => {
    const unitEl = element.querySelector(`[data-unit="${unit}"]`);
    if (unitEl) {
      const strVal = String(value).padStart(2, "0");
      if (unitEl.textContent !== strVal) {
        unitEl.textContent = strVal;
        const parent = unitEl.closest(".countdown-unit");
        if (parent) {
          parent.classList.add("is-tick");
          setTimeout(() => parent.classList.remove("is-tick"), 260);
        }
      }
    }
  });
}

function refreshCountdowns() {
  updateCountdown("wedding-countdown", weddingConfig.weddingDate);
  updateCountdown("reception-countdown", weddingConfig.receptionDate);
}
refreshCountdowns();
window.setInterval(refreshCountdowns, 1000);

// ========================================
// WHATSAPP INVITATION SHARING
// ========================================
document.querySelectorAll("#whatsapp-share-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const shareMessage = [
      `✝ Wedding Invitation: ${weddingConfig.groomName} & ${weddingConfig.brideName}`,
      ``,
      `"Therefore what God has joined together, let no one separate." — Matthew 19:6`,
      ``,
      `With praise to God, we joyfully invite you to celebrate our Holy Matrimony on 3 February 2027 at ${weddingConfig.weddingVenue}, ${weddingConfig.weddingAddress}.`,
      ``,
      `Reception: 28 February 2027 at ${weddingConfig.receptionVenue}, ${weddingConfig.receptionAddress}.`,
      ``,
      `View digital invitation, timings & maps:`,
      window.location.origin ? window.location.href : "https://vasu-mercy-wedding.com"
    ].join("\n");

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(whatsappUrl, "_blank", "noopener");
  });
});

// ========================================
// PRE-WEDDING FILM PLAYER
// ========================================
const video = document.getElementById("wedding-video");
const videoSection = document.getElementById("video");
if (video) {
  if (weddingConfig.video) {
    video.src = weddingConfig.video;
    video.addEventListener("error", () => {
      if (videoSection) videoSection.hidden = true;
    });
  } else if (videoSection) {
    videoSection.hidden = true;
  }
}

// ========================================
// BACKGROUND MUSIC CONTROLLER
// Clean, elegant toggle — no popup toasts
// ========================================
const music = document.getElementById("background-music");
const musicButton = document.getElementById("music-control");

if (music && musicButton) {
  const OFF_KEY = "weddingMusicOff";
  const TIME_KEY = "weddingMusicTime";

  const remember = (key, val) => { try { sessionStorage.setItem(key, val); } catch (e) {} };
  const recall = key => { try { return sessionStorage.getItem(key); } catch (e) { return null; } };

  if (!weddingConfig.music) {
    musicButton.hidden = true;
  } else {
    music.preload = "auto";
    music.volume = 0.7;
    music.src = weddingConfig.music;

    const savedTime = Number(recall(TIME_KEY));
    if (savedTime > 0) {
      music.addEventListener("loadedmetadata", () => {
        try { music.currentTime = savedTime; } catch (e) {}
      }, { once: true });
    }
    music.addEventListener("timeupdate", () => {
      if (!music.paused) remember(TIME_KEY, String(Math.floor(music.currentTime)));
    });
  }

  music.addEventListener("error", () => {
    musicButton.hidden = true;
  });

  async function toggleMusic() {
    if (music.paused) {
      music.volume = 0.7;
      try {
        await music.play();
        remember(OFF_KEY, "0");
      } catch (err) {
        console.info("Tap required to play audio.");
      }
    } else {
      music.pause();
      remember(OFF_KEY, "1");
    }
  }

  musicButton.addEventListener("click", toggleMusic);

  music.addEventListener("play", () => {
    musicButton.classList.add("is-playing");
    musicButton.setAttribute("aria-label", "Turn off background music");
  });

  music.addEventListener("pause", () => {
    musicButton.classList.remove("is-playing");
    musicButton.setAttribute("aria-label", "Play background music");
  });

  if (video) {
    video.addEventListener("play", () => { if (!music.paused) music.pause(); });
    video.addEventListener("pause", () => { if (recall(OFF_KEY) !== "1") music.play().catch(() => {}); });
  }
}

// ========================================
// FULLSCREEN LIGHTBOX WITH TOUCH SWIPE
// ========================================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

let currentPhotoIndex = 0;
const totalPhotos = images.gallery.length;

function openLightbox(index) {
  if (!lightbox || !lightboxImg) return;
  currentPhotoIndex = (index + totalPhotos) % totalPhotos;
  lightboxImg.src = images.gallery[currentPhotoIndex];
  if (lightboxCaption) lightboxCaption.textContent = images.galleryCaptions[currentPhotoIndex] || "";
  if (lightboxCounter) lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${totalPhotos}`;

  lightbox.hidden = false;
  requestAnimationFrame(() => lightbox.classList.add("is-open"));
  document.body.classList.add("menu-open");
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  setTimeout(() => { lightbox.hidden = true; }, 300);
}

function nextPhoto() { openLightbox(currentPhotoIndex + 1); }
function prevPhoto() { openLightbox(currentPhotoIndex - 1); }

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    const index = Number(item.dataset.index) || 0;
    openLightbox(index);
  });
});

if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightboxNext) lightboxNext.addEventListener("click", nextPhoto);
if (lightboxPrev) lightboxPrev.addEventListener("click", prevPhoto);

if (lightbox) {
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Touch Swipe on Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) prevPhoto();
      else nextPhoto();
    }
  }, { passive: true });

  // Keyboard navigation
  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextPhoto();
    if (e.key === "ArrowLeft") prevPhoto();
  });
}

// ========================================
// MOBILE NAVIGATION DRAWER
// ========================================
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMenu() {
  if (!navToggle || !navLinks) return;
  navToggle.setAttribute("aria-expanded", "false");
  navLinks.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  const topOffset = document.body.style.top;
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  document.body.style.overflow = "";
  if (topOffset) {
    const scrollY = parseInt(topOffset || "0", 10) * -1;
    window.scrollTo(0, scrollY);
  }
}

function openMenu() {
  if (!navToggle || !navLinks) return;
  const scrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
  navToggle.setAttribute("aria-expanded", "true");
  navLinks.classList.add("is-open");
  document.body.classList.add("menu-open");
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  navLinks.addEventListener("click", e => { if (e.target === navLinks) closeMenu(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
}

// Active Nav Link by File Name and Clean URLs
const currentPath = window.location.pathname.toLowerCase();
let currentFile = currentPath.split("/").pop() || "index.html";
if (!currentFile || currentFile === "/") currentFile = "index.html";
if (!currentFile.includes(".")) currentFile = `${currentFile}.html`;

document.querySelectorAll(".nav-links a").forEach(link => {
  const href = (link.getAttribute("href") || "").toLowerCase();
  const [filePart, hashPart] = href.split("#");
  let targetFile = filePart || "index.html";
  if (!targetFile.includes(".")) targetFile = `${targetFile}.html`;

  link.classList.remove("active");
  link.removeAttribute("aria-current");

  if (targetFile === currentFile || (currentFile === "events.html" && targetFile === "wedding-details.html")) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

// ========================================
// SCROLL PROGRESS & BACK TO TOP
// ========================================
const header = document.querySelector(".site-header");
const scrollProgress = document.getElementById("scroll-progress");
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (document.body.classList.contains("menu-open")) return;
  const currentY = window.scrollY;
  if (header) header.classList.toggle("scrolled", currentY > 20);

  if (scrollProgress) {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (currentY / maxScroll) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
  }

  if (backToTopBtn) {
    backToTopBtn.classList.toggle("is-visible", currentY > 400);
  }
}, { passive: true });

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ========================================
// PAGE LOADING EXPERIENCE DISMISSAL
// ========================================
function dismissPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  setTimeout(() => {
    preloader.classList.add("is-loaded");
  }, 500);
}

if (document.readyState === "complete") {
  dismissPreloader();
} else {
  window.addEventListener("load", dismissPreloader);
  // Fail-safe dismiss after 1.5s
  setTimeout(dismissPreloader, 1500);
}

// ========================================
// INTERSECTION OBSERVER REVEAL (Scroll Motion)
// ========================================
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll("[data-reveal], [data-reveal-stagger]").forEach(item => revealObserver.observe(item));

// ========================================
// AMBIENT GOLDEN SPARKLES CANVAS
// ========================================
function initAmbientParticles() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvases = document.querySelectorAll(".ambient-canvas");
  if (!canvases.length) return;

  canvases.forEach(canvas => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    });

    const colors = [
      "rgba(201, 130, 113, ", // Dusty Rose (#C98271)
      "rgba(103, 114, 74, ",  // Olive Green (#67724A)
      "rgba(194, 204, 168, ", // Soft Pear Green (#C2CCA8)
      "rgba(255, 237, 220, "  // Cream White (#FFEDDC)
    ];

    const particleCount = Math.min(42, Math.floor((width * height) / 22000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      opacity: Math.random() * 0.5 + 0.25,
      speedY: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  });
}

document.addEventListener("DOMContentLoaded", initAmbientParticles);
