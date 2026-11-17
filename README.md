# ✝ Christian Wedding Invitation — Vasu & Mercy Havilah
## Premium React + Vite + TypeScript Multi-Page Wedding Website

A digital Christian wedding invitation celebrating the Holy Matrimony of **Vasu & Mercy Havilah**.

---

## 💍 Wedding Details & Sacred Specifications

| Detail | Information |
| :--- | :--- |
| **Groom** | **VASU** (Son of Mr. **N. Jephaniah** & Mrs. **N. Uma Devi**) |
| **Bride** | **MERCY HAVILAH** (Daughter of Mr. **S. Deena Shekhar** & Mrs. **S. Esther**) |
| **Core Scripture** | *“Therefore what God has joined together, let no one separate.”* — **Matthew 19:6** |
| **Engagement Ceremony** | **4 February 2026** *(Celebrated Milestone)* |
| **Holy Matrimony Service** | **Wednesday, 3 February 2027 at 9:00 AM**<br>📍 **AB Function Hall (AC)**, Behind SSGS Degree College, SN Pet, Guntakal ([Google Maps](https://maps.app.goo.gl/V26a9HupTv4vn8A28)) |
| **Family Contacts** | • **General Information:** `+91 8978148996`<br>• **Vasu (Groom):** `+91 9652296062`<br>• **Hoshi (Family):** `+91 6281047922` |
| **Strict Policies** | Strictly **NO RSVP** forms/buttons · Strictly **NO Thanksgiving service** · Reception details excluded per family preference |

---

## 🎨 Dual Luxury Design System

The application features a toggleable dual-palette system designed for visual elegance, letterpress aesthetics, and WCAG AAA compliance.

### 1. Palette Specification (Light Theme)
* **Main / Primary Colour / Button Background** (`#C08A8F`): Romantic badges, primary CTAs, heart flourishes, and button backgrounds.
* **Accent / Secondary Colour** (`#C0A08A`): Botanical cross accents (`✝`), section eyebrows, secondary calendar buttons.
* **Soft** (`#DDCFD1`): Completed milestone tags, delicate card borders, soft badge pills.
* **Neutral / Page Background** (`#F6F4F4`): Neutral stationery page background wash and countdown backdrops.
* **Deep / Heading Colour / Button Text** (`#322526`): High-contrast letterpress serif typography, headings, button labels, hero gradients, and site footer.

### 2. Midnight & Deep Luxury Dark Theme
* **Canvas Background** (`#1D1516`): Deep plum base background.
* **Card Surface** (`#322526`): Deep contrasting cards and interactive module surfaces.
* **Main Accent** (`#C08A8F`): Regal highlights, primary buttons, active navigation indicator line.
* **Soft Secondary** (`#DDCFD1`): Secondary text and delicate borders.
* **Primary Text** (`#F6F4F4`): Soft warm primary text with WCAG readability.

---

## 🎵 Interactive Background Music & Autoplay

* **Zero-Delay Preloading:** Preloaded in static HTML (`template.html` / `index.html`) for instant streaming.
* **Instant Autoplay with Fallback:** Direct autoplay is triggered on page load. If browser security blocks unmuted autoplay, capture listeners on `window` (`touchstart`, `scroll`, `click`) immediately start the music upon the very first touch or interaction.
* **Highlighted Floating Controller:**
  * When playing: Displays **`Music ON`** with live animated equalizer soundbars and a gentle breathing pulse glow (`.animate-music-pulse`).
  * When paused: Displays **`Music OFF`** with a speaker icon.
  * Visitors can toggle the music on or off with a single tap at any time.
* **HTTP 206 Streaming:** The local production server supports Byte-Range requests for audio and video streaming.

---

## 💬 WhatsApp Integrations & Link Preview Card

1. **Custom 16:9 WhatsApp Preview Card (`og-preview.jpg`):**
   * Generated from `gallery-1.jpg` via Chrome CDP (`1280 × 720`, under 100 KB).
   * Features an arched couple portrait, gold cross `✝`, Cormorant Garamond typography (`VASU & MERCY HAVILAH`), Matthew 19:6, ceremony date, and venue (`AB Function Hall (AC)`).
   * Backed by fully qualified absolute Open Graph HTTPS metadata for instant WhatsApp crawler rich preview.
2. **Link Priority in Share Message:**
   * The Vercel invitation URL (`https://vasuwedshavilah.vercel.app/`) is placed at the very top of the share text as the first link so WhatsApp always generates the wedding card preview snippet.
   * Direct Google Maps directions link is provided below the venue for 1-click navigation.
3. **Minimal WhatsApp Share Button:**
   * Homepage: Positioned above the Pre-Wedding Film.
   * Subpages: Positioned above the Footer.
   * Streamlined, lightweight pill button with official SVG icon and subtitle.
4. **Developer Connect Button:**
   * Styled in the footer as `Developed by Vinay` alongside a circular emerald WhatsApp icon.
   * Pre-fills a personalized connect message: *"Hi Vinay, loved the wedding invitation website for Vasu & Havilah! Would like to connect with you."*

---

## 📂 Multi-Page Architecture (4 Core Pages)

1. **Home (`/`)**:
   * Cinematic hero with Ken Burns photography and GSAP letter-by-letter reveal.
   * Sacred invitation card featuring both families' lineages.
   * Live countdown timer to 3 February 2027 with Google Calendar sync and Google Maps button.
   * Minimal WhatsApp share station above the Pre-Wedding Film.
   * Embedded Pre-Wedding Film player (`wedding.mp4`).
   * Photo gallery highlights with direct link to the full gallery.

2. **Our Story (`/our-story`)**:
   * The Couple portrait cards with parentage lines for Vasu and Mercy Havilah.
   * Family portrait cards for the Groom's and Bride's parents.
   * Faith Journey Timeline featuring **Engagement on 4 February 2026** as a celebrated completed milestone (Song of Solomon 3:4).
   * Minimal WhatsApp share station above the footer.

3. **Wedding Details (`/wedding-details`)**:
   * **Holy Matrimony Service:** 3 February 2027, 9:00 AM at AB Function Hall (AC), Guntakal. Live countdown, Google Maps directions, Add to Calendar, and Order of Service.
   * Pre-wedding film video player (`wedding.mp4`).
   * Minister of the ceremony card (Rev. A. P. Solomon Vijay Raj).
   * Family contact cards with click-to-call links.
   * Minimal WhatsApp share station above the footer.

4. **Gallery (`/gallery`)**:
   * 6 high-resolution wedding portraits.
   * Swiper.js touch carousel with autoplay.
   * Responsive editorial grid with touch-friendly fullscreen lightbox (zoom, counter, swipe).
   * Minimal WhatsApp share station above the footer.

---

## 🛠️ Technology Stack & Libraries

- **React 18 + Vite 5 + TypeScript**: Modern frontend architecture with strict type safety.
- **Tailwind CSS**: Dual-palette styling with custom color tokens and dark theme support.
- **React Router v6**: HashRouter-based multi-page routing for GitHub Pages and Vercel compatibility.
- **Motion for React (Framer Motion)**: Page transitions and scroll animations.
- **GSAP (GreenSock)**: Cinematic text reveals on hero titles.
- **Lucide React**: Clean vector iconography.
- **Swiper.js**: Touch-friendly pre-wedding photo carousel with autoplay.
- **Yet Another React Lightbox**: Fullscreen gallery with touch swipe, zoom, and counter.

---

## 🧪 Quality Assurance & Test Suites

The codebase includes automated unit, integration, and real-browser CDP test suites:

| Test Command | Coverage / Description |
| :--- | :--- |
| `npx tsc --noEmit` | Strict TypeScript 5 static type safety check (`0 errors`). |
| `node --test tests/config.test.mjs` | Centralized configuration integrity (names, dates, parents, scripture, media). |
| `node --test tests/mobile-responsive.test.mjs` | Mobile viewport coverage (320px–430px), zero horizontal overflow, touch target size $\ge$ 44px. |
| `node --test tests/requirements.test.mjs` | Strict business rules: zero RSVP, zero Thanksgiving, zero Reception, navigation routes, scroll locks. |
| `node --test tests/server.test.mjs` | Production HTTP server: SPA routing (200 OK), MIME types, HTTP 206 audio streaming, 403 traversal security. |
| `node --test tests/theme.test.mjs` | Design tokens, color palettes, and CSS custom property verification. |
| `node tests/e2e-browser.mjs` | Real Headless Chrome DevTools Protocol (CDP) test suite across 6 viewports with **83/83 passing assertions**. |

Run all unit tests:
```bash
npm test
```

Run real-browser cross-device responsive tests:
```bash
npm run test:e2e
```

---

## 🚀 Development & Local Server

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server (Vite HMR)
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Run Production Server
```bash
node server.js
```
The application will be served at `http://localhost:8080/`.

---

## 🌐 Deployments & Hosting

* **Primary Production Site (Vercel):** [https://vasuwedshavilah.vercel.app/](https://vasuwedshavilah.vercel.app/)
* **GitHub Repository:** [https://github.com/rvinay07/vasu-havilah-wedding-invitation](https://github.com/rvinay07/vasu-havilah-wedding-invitation) (`main` branch)
* **GitHub Pages:** [https://rvinay07.github.io/vasu-havilah-wedding-invitation/](https://rvinay07.github.io/vasu-havilah-wedding-invitation/)

---

## 👤 Developer
**Developed by Vinay** · WhatsApp: [+91 9866450060](https://wa.me/919866450060?text=Hi%20Vinay%2C%20loved%20the%20wedding%20invitation%20website%20for%20Vasu%20%26%20Havilah!%20Would%20like%20to%20connect%20with%20you.)
