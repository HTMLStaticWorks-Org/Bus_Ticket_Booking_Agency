# RouteGo — Premium Bus Ticket Booking Agency Website

A production-quality, multi-page **HTML5 / CSS3 / Vanilla ES6+ JavaScript** web application built for **RouteGo**, a modern intercity bus ticket booking agency.

---

## Key Highlights

- **Travel-Night-Highway Visual Identity**: Custom CSS token palette (`--midnight: #0A0F24`, `--asphalt: #121A33`, `--amber: #FFB020`, `--coral: #FF5C4D`, `--teal: #19D3B5`, `--cream: #FFF7E8`) with sunset (`amber → coral`) and dusk (`teal → midnight`) gradients.
- **21 Complete HTML Pages**:
  - `index.html` — Home 1: Main Landing Page (Hero Model A: full-width photographic hero with glassmorphism booking panel)
  - `pages/home-2.html` — Home 2: Premium Travel Discovery Page (Hero Model B: cinematic full-screen Ken-Burns hero with asymmetric editorial layout & docked search panel)
  - `pages/routes-fares.html` — Routes & Fares Discovery, Filters & Side-by-Side Operator Comparison
  - `pages/offers.html` — Special Offers, Category Deals & Live Countdown Timers
  - `pages/login.html` — Login, Registration, OTP Verification & Password Recovery
  - `pages/dashboard.html` — Private Traveler Dashboard (KPIs, Quick Search, Upcoming Journeys, Recent Activity, My Bookings, Manage Cancellations with live refund calculator, Refund Tracking, Saved Passengers CRUD, Notifications, Profile Settings, Help & Support)
  - **Connected 5-Step Booking Engine**:
    1. `pages/search-results.html`
    2. `pages/seat-selection.html` (Interactive 2+1 Sleeper Lower/Upper Deck & 2+2 Recliner Seater Map)
    3. `pages/passenger-details.html`
    4. `pages/payment.html` (Demo / Test Mode Gateway with honest validation & failure simulation)
    5. `pages/confirmation.html` (Verified PNR & SVG QR Boarding Pass, Print & Download E-Ticket)
  - **Additional Pages**: `pages/about.html`, `pages/contact.html`, `pages/faq.html`, `pages/cancellation-policy.html`, `pages/privacy-policy.html`, `pages/terms-conditions.html`, `pages/help-support.html`, `pages/404.html`, `pages/coming-soon.html`, and `documentation/index.html`.
- **3D Tilt Cards & Mixed Editorial Layouts**: Every `.tilt-card` features 3D perspective tilt, glare highlight, bus-pass-by shimmer, and strictly center-aligned icons and text across all viewports. Mixed with telemetry stat bands, marquee tickers, split image/text rows, stepped timelines, comparison tables, and accordions.
- **100% Local Photorealistic Photography**: All 55 unique image sets (`.jpg`, `.webp`, `-400w.webp`) are stored locally in `assets/images/{hero,routes,destinations,fleet,operators,people,offers,misc}/` with zero external image URLs and zero duplicate placements.
- **Accessibility & Internationalization**: Dark/Light mode with system preference detection (`assets/css/dark-mode.css`), full RTL support (`assets/css/rtl.css`), WCAG 2.1 AA contrast, skip links, focus rings, skeleton loaders, and `prefers-reduced-motion` support.

---

## Project Architecture

```text
routego/
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── dark-mode.css
│   │   └── rtl.css
│   ├── js/
│   │   ├── main.js
│   │   ├── booking.js
│   │   ├── dashboard.js
│   │   └── plugins/
│   │       ├── data.js
│   │       └── tilt.js
│   ├── images/
│   │   ├── hero/
│   │   ├── routes/
│   │   ├── destinations/
│   │   ├── fleet/
│   │   ├── operators/
│   │   ├── people/
│   │   ├── offers/
│   │   └── misc/
│   └── fonts/
├── pages/
├── index.html
├── documentation/
├── sitemap.xml
├── robots.txt
└── README.md
```

---

## Running Locally

```bash
python -m http.server 8080
```
Then open `http://localhost:8080/index.html` in your browser.

