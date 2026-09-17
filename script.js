// ========================================
// WEDDING CONFIGURATION — EDIT HERE
// ========================================
const weddingConfig = {
  groomName: "VASU",
  brideName: "MERCY HAVILAH",
  groomFather: "N.JEPHANIAH",
  groomMother: "N.UMA DEVI",
  brideFather: "S.DEENA SHEKHAR",
  brideMother: "S.ESTHER",
  contactNumbers: ["+91 8978148996", "+91 9652296062 (VASU)", "+91 6281047922 (HOSHI)"],
  weddingDate: "YYYY-MM-DDTHH:MM:SS",
  receptionDate: "YYYY-MM-DDTHH:MM:SS",
  weddingVenue: "CHURCH NAME",
  weddingAddress: "CHURCH ADDRESS",
  weddingMapsUrl: "",
  receptionVenue: "RECEPTION VENUE",
  receptionAddress: "RECEPTION ADDRESS",
  receptionMapsUrl: "",
  bibleVerse: "Therefore what God has joined together, let no one separate.",
  bibleReference: "Matthew 19:6",
  music: "assets/music/wedding.mp3",
  video: "assets/videos/wedding.mp4"
};

// ========================================
// IMAGE CONFIGURATION — KEEP ALL PHOTOS 16:9
// ========================================
const images = {
  hero: "assets/images/hero.JPG",
  groom: "assets/images/groom.JPG",
  bride: "assets/images/bride.JPG",
  groomParents: "assets/images/groom-parents.JPG",
  brideParents: "assets/images/bride-parents.JPG",
  gallery: [
    "assets/images/gallery-1.JPG", "assets/images/gallery-2.JPG", "assets/images/gallery-3.JPG",
    "assets/images/gallery-4.JPG", "assets/images/gallery-5.JPG", "assets/images/gallery-6.JPG"
  ],
  heroPosition: "center center",
  groomPosition: "center center",
  bridePosition: "center center",
  groomParentsPosition: "center center",
  brideParentsPosition: "center center"
};

// ========================================
// SHARED CONTENT & IMAGE SETUP
// ========================================
const setText = (selector, value) => document.querySelectorAll(selector).forEach(element => { element.textContent = value; });
Object.entries(weddingConfig).forEach(([key, value]) => setText(`[data-config="${key}"]`, value));
document.title = `${weddingConfig.groomName} & ${weddingConfig.brideName} | Wedding Invitation`;

const imageBindings = [
  ["hero-image", images.hero, images.heroPosition], ["groom-image", images.groom, images.groomPosition],
  ["bride-image", images.bride, images.bridePosition], ["groom-parents-image", images.groomParents, images.groomParentsPosition],
  ["bride-parents-image", images.brideParents, images.brideParentsPosition]
];
imageBindings.forEach(([id, path, position]) => {
  const image = document.getElementById(id); if (!image) return;
  const frame = image.closest(".media-frame"); image.src = path; image.style.objectPosition = position;
  image.addEventListener("load", () => frame?.classList.add("has-image"));
  image.addEventListener("error", () => frame?.classList.remove("has-image"));
});

document.querySelectorAll("[data-gallery-image]").forEach((image, index) => {
  const frame = image.closest(".media-frame"); image.src = images.gallery[index] || "";
  image.addEventListener("load", () => frame?.classList.add("has-image"));
  image.addEventListener("error", () => frame?.classList.remove("has-image"));
});

document.querySelectorAll("[data-footer-contact]").forEach(link => {
  const number = weddingConfig.contactNumbers[Number(link.dataset.footerContact)] || "";
  link.textContent = number;
  if (number && !number.startsWith("CONTACT NUMBER")) link.href = `tel:${number.replace(/[^+\d]/g, "")}`;
  else link.removeAttribute("href");
});

// ========================================
// DATES, MAPS & TWO INDEPENDENT COUNTDOWNS
// ========================================
const validDate = value => !Number.isNaN(new Date(value).getTime());
const prettyDate = value => validDate(value) ? new Intl.DateTimeFormat(undefined, { day: "numeric", month: "long", year: "numeric" }).format(new Date(value)) : "Date to be announced";
const prettyTime = value => validDate(value) ? new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date(value)) : "Time to be announced";
document.querySelectorAll("[data-wedding-date]").forEach(element => { element.textContent = prettyDate(weddingConfig.weddingDate); });
document.querySelectorAll("[data-wedding-time]").forEach(element => { element.textContent = prettyTime(weddingConfig.weddingDate); });
document.querySelectorAll("[data-reception-date]").forEach(element => { element.textContent = prettyDate(weddingConfig.receptionDate); });
document.querySelectorAll("[data-reception-time]").forEach(element => { element.textContent = prettyTime(weddingConfig.receptionDate); });

[["wedding", weddingConfig.weddingMapsUrl], ["reception", weddingConfig.receptionMapsUrl]].forEach(([kind, mapUrl]) => {
  const link = document.getElementById(`${kind}-directions`); if (!link) return;
  if (mapUrl) link.href = mapUrl;
  else { link.removeAttribute("href"); link.setAttribute("aria-disabled", "true"); link.style.pointerEvents = "none"; link.style.opacity = ".5"; }
});

function updateCountdown(elementId, dateString) {
  const element = document.getElementById(elementId); if (!element) return;
  const status = element.querySelector(".countdown-status"); const grid = element.querySelector(".countdown-grid");
  if (!validDate(dateString)) { grid.hidden = true; status.hidden = false; status.textContent = "Date to be announced"; return; }
  const distance = new Date(dateString).getTime() - Date.now();
  if (distance <= 0) { grid.hidden = true; status.hidden = false; status.textContent = "The celebration has begun"; return; }
  const units = { days: Math.floor(distance / 86400000), hours: Math.floor((distance / 3600000) % 24), minutes: Math.floor((distance / 60000) % 60), seconds: Math.floor((distance / 1000) % 60) };
  Object.entries(units).forEach(([unit, value]) => { element.querySelector(`[data-unit="${unit}"]`).textContent = String(value).padStart(2, "0"); });
}
function refreshCountdowns() { updateCountdown("wedding-countdown", weddingConfig.weddingDate); updateCountdown("reception-countdown", weddingConfig.receptionDate); }
refreshCountdowns(); window.setInterval(refreshCountdowns, 1000);

// ========================================
// OPTIONAL VIDEO & USER-CONTROLLED MUSIC
// ========================================
const video = document.getElementById("wedding-video"); const videoSection = document.getElementById("video-section");
if (video) { if (weddingConfig.video) { video.src = weddingConfig.video; video.addEventListener("error", () => { videoSection.hidden = true; }); } else videoSection.hidden = true; }
const music = document.getElementById("background-music"); const musicButton = document.getElementById("music-control");
if (music && musicButton) {
  if (weddingConfig.music) music.src = weddingConfig.music; else musicButton.hidden = true;
  music.addEventListener("error", () => { musicButton.hidden = true; });
  musicButton.addEventListener("click", async () => { try { if (music.paused) await music.play(); else music.pause(); } catch (error) { console.info("Check the music file path."); } });
  music.addEventListener("play", () => { musicButton.classList.add("is-playing"); musicButton.setAttribute("aria-label", "Pause background music"); });
  music.addEventListener("pause", () => { musicButton.classList.remove("is-playing"); musicButton.setAttribute("aria-label", "Play background music"); });
}

// ========================================
// NAVIGATION & REVEALS
// ========================================
const navToggle = document.querySelector(".nav-toggle"); const navLinks = document.getElementById("site-nav");
function closeMenu() { if (!navToggle || !navLinks) return; navToggle.setAttribute("aria-expanded", "false"); navLinks.classList.remove("is-open"); document.body.classList.remove("menu-open"); }
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => { const open = navToggle.getAttribute("aria-expanded") === "true"; navToggle.setAttribute("aria-expanded", String(!open)); navLinks.classList.toggle("is-open", !open); document.body.classList.toggle("menu-open", !open); });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu)); document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
}
const header = document.querySelector(".site-header"); window.addEventListener("scroll", () => header?.classList.toggle("scrolled", window.scrollY > 30), { passive:true });
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); revealObserver.unobserve(entry.target); } }), { threshold:.12 });
document.querySelectorAll("[data-reveal]").forEach(item => revealObserver.observe(item));
