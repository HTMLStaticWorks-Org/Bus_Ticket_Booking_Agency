/**
 * ============================================================================
 * ROUTEGO - SAMPLE DATA, ROUTES, BUS FLEET, OFFERS & SVG ICON DICTIONARY
 * File: assets/js/plugins/data.js
 * ============================================================================
 */

window.ROUTEGO_ICONS = {
  bus: '<svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 17.5V9.5C3.5 7.8 4.8 6.5 6.5 6.5H18C20 6.5 21.8 7.8 22.5 9.7L24.2 13.8C24.4 14.3 24.5 14.9 24.5 15.5V17.5C24.5 18.6 23.6 19.5 22.5 19.5H21.5M3.5 17.5H6.5M3.5 17.5C3.5 18.6 4.4 19.5 5.5 19.5H6.5M6.5 19.5C6.5 17.8 7.8 16.5 9.5 16.5C11.2 16.5 12.5 17.8 12.5 19.5H16.5C16.5 17.8 17.8 16.5 19.5 16.5C21.2 16.5 22.5 17.8 22.5 19.5"/><path d="M7 9.5H11.5V13H6.5C6.2 13 6 12.8 6 12.5V10.5C6 9.9 6.4 9.5 7 9.5Z" fill="currentColor"/><path d="M13.5 9.5H17.5V13H13.5V9.5Z" fill="currentColor"/><path d="M19.5 9.5H20.8C21.6 9.5 22.3 10 22.6 10.7L23.4 13H19.5V9.5Z" fill="currentColor"/><circle cx="9.5" cy="19.5" r="2.2" fill="currentColor"/><circle cx="19.5" cy="19.5" r="2.2" fill="currentColor"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  swap: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>',
  headphones: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>',
  wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>',
  zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  arrowRight: '<svg class="icon-directional" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  creditCard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>',
  refreshCw: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
  printer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
};

window.ROUTEGO_DATA = {
  cities: [
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Coimbatore",
    "Vijayawada",
    "Madurai",
    "Kochi"
  ],

  promoCodes: {
    FIRST25: { code: "FIRST25", discountPercent: 25, maxDiscount: 400, minAmount: 500, label: "25% OFF First Bus Journey (up to ₹400)" },
    WEEKEND15: { code: "WEEKEND15", discountPercent: 15, maxDiscount: 300, minAmount: 600, label: "15% OFF Weekend Highway Special" },
    FESTIVAL20: { code: "FESTIVAL20", discountPercent: 20, maxDiscount: 500, minAmount: 800, label: "20% OFF Festival Season Deal" },
    GROUP300: { code: "GROUP300", flatDiscount: 300, minAmount: 1500, label: "Flat ₹300 OFF on Group Bookings" },
    ROUNDTRIP18: { code: "ROUNDTRIP18", discountPercent: 18, maxDiscount: 450, minAmount: 900, label: "18% OFF Round-Trip Saver" },
    SLEEPER10: { code: "SLEEPER10", discountPercent: 10, maxDiscount: 250, minAmount: 700, label: "10% OFF AC Sleeper Coaches" }
  },

  buses: [
    {
      id: "BUS-CB-101",
      operator: "KPN Royal Travels",
      from: "Chennai",
      to: "Bangalore",
      busType: "Volvo Multi-Axle AC Sleeper (2+1)",
      category: "AC Sleeper",
      isAC: true,
      layout: "sleeper",
      departure: "22:15",
      arrival: "04:30",
      duration: "6h 15m",
      departureSlot: "night",
      price: 980,
      rating: 4.8,
      reviewsCount: 412,
      seatsAvailable: 14,
      amenities: ["Wi-Fi", "Charging Port", "Fresh Blanket", "Live GPS", "Water Bottle"],
      boardingPoints: [
        { time: "21:30", name: "Koyambedu Omni Bus Terminus (CMBT)" },
        { time: "21:55", name: "Guindy Kathipara Lounge" },
        { time: "22:15", name: "Sriperumbudur Toll Plaza" }
      ],
      droppingPoints: [
        { time: "03:50", name: "Electronic City Phase 1" },
        { time: "04:10", name: "Silk Board Junction" },
        { time: "04:30", name: "Majestic Kempegowda Bus Station" }
      ],
      bookedSeats: ["L2", "L3", "L7", "U1", "U4", "U8"]
    },
    {
      id: "BUS-CB-102",
      operator: "Parveen Mercedes-Benz Coach",
      from: "Chennai",
      to: "Bangalore",
      busType: "AC Luxury Seater / Semi-Sleeper (2+2)",
      category: "AC Seater",
      isAC: true,
      layout: "seater",
      departure: "06:30",
      arrival: "12:15",
      duration: "5h 45m",
      departureSlot: "morning",
      price: 690,
      rating: 4.7,
      reviewsCount: 328,
      seatsAvailable: 21,
      amenities: ["Charging Port", "Reading Light", "Live GPS", "Water Bottle"],
      boardingPoints: [
        { time: "06:00", name: "Koyambedu Omni Bus Terminus (CMBT)" },
        { time: "06:30", name: "Poonamallee Bypass" }
      ],
      droppingPoints: [
        { time: "11:45", name: "Madiwala Checkpost" },
        { time: "12:15", name: "Majestic Bus Stand" }
      ],
      bookedSeats: ["S1", "S2", "S6", "S11", "S12", "S18"]
    },
    {
      id: "BUS-CB-103",
      operator: "SRS Prime Express",
      from: "Chennai",
      to: "Bangalore",
      busType: "Non-AC Sleeper Air-Suspension (2+1)",
      category: "Non-AC Sleeper",
      isAC: false,
      layout: "sleeper",
      departure: "21:00",
      arrival: "03:30",
      duration: "6h 30m",
      departureSlot: "night",
      price: 620,
      rating: 4.4,
      reviewsCount: 195,
      seatsAvailable: 18,
      amenities: ["Charging Port", "Reading Light", "Live GPS"],
      boardingPoints: [
        { time: "21:00", name: "Koyambedu CMBT" },
        { time: "21:35", name: "Maduravoyal Junction" }
      ],
      droppingPoints: [
        { time: "03:00", name: "Electronic City" },
        { time: "03:30", name: "Kalasipalyam Terminal" }
      ],
      bookedSeats: ["L1", "L5", "U2", "U6"]
    },
    {
      id: "BUS-BH-201",
      operator: "Orange Starliner Tours",
      from: "Bangalore",
      to: "Hyderabad",
      busType: "Scania Multi-Axle AC Sleeper (2+1)",
      category: "Volvo / Premium",
      isAC: true,
      layout: "sleeper",
      departure: "21:30",
      arrival: "06:15",
      duration: "8h 45m",
      departureSlot: "night",
      price: 1290,
      rating: 4.9,
      reviewsCount: 540,
      seatsAvailable: 11,
      amenities: ["Wi-Fi", "Charging Port", "Fresh Blanket", "Pillow", "Live GPS"],
      boardingPoints: [
        { time: "20:45", name: "Madiwala Orange Lounge" },
        { time: "21:15", name: "Anand Rao Circle" },
        { time: "21:30", name: "Hebbal Flyover" }
      ],
      droppingPoints: [
        { time: "05:30", name: "Shamshabad Airport Road" },
        { time: "05:55", name: "Lakdikapul" },
        { time: "06:15", name: "Miyapur Cross Road" }
      ],
      bookedSeats: ["L1", "L2", "L4", "L8", "U1", "U3", "U5", "U9"]
    },
    {
      id: "BUS-BH-202",
      operator: "VRL Night Cruiser",
      from: "Bangalore",
      to: "Hyderabad",
      busType: "AC Sleeper Executive (2+1)",
      category: "AC Sleeper",
      isAC: true,
      layout: "sleeper",
      departure: "22:45",
      arrival: "07:45",
      duration: "9h 00m",
      departureSlot: "night",
      price: 1080,
      rating: 4.6,
      reviewsCount: 289,
      seatsAvailable: 16,
      amenities: ["Charging Port", "Fresh Blanket", "Live GPS", "Water Bottle"],
      boardingPoints: [
        { time: "22:15", name: "Majestic VRL Terminal" },
        { time: "22:45", name: "Yelahanka Bypass" }
      ],
      droppingPoints: [
        { time: "07:15", name: "MGBS Imlibun" },
        { time: "07:45", name: "Kukatpally Housing Board" }
      ],
      bookedSeats: ["L3", "L6", "U2", "U7"]
    },
    {
      id: "BUS-CC-301",
      operator: "KPN Royal Travels",
      from: "Chennai",
      to: "Coimbatore",
      busType: "Volvo B11R Multi-Axle AC Sleeper (2+1)",
      category: "Volvo / Premium",
      isAC: true,
      layout: "sleeper",
      departure: "21:45",
      arrival: "05:30",
      duration: "7h 45m",
      departureSlot: "night",
      price: 1120,
      rating: 4.8,
      reviewsCount: 376,
      seatsAvailable: 12,
      amenities: ["Wi-Fi", "Charging Port", "Fresh Blanket", "Live GPS", "Snacks"],
      boardingPoints: [
        { time: "21:15", name: "Koyambedu CMBT" },
        { time: "21:45", name: "Kilambakkam KCBT Terminal" }
      ],
      droppingPoints: [
        { time: "05:00", name: "Hopecollege Avinashi Road" },
        { time: "05:30", name: "Gandhipuram Omni Bus Stand" }
      ],
      bookedSeats: ["L2", "L5", "L9", "U1", "U4", "U6"]
    },
    {
      id: "BUS-HV-401",
      operator: "Orange Starliner Tours",
      from: "Hyderabad",
      to: "Vijayawada",
      busType: "AC Executive Seater (2+2)",
      category: "AC Seater",
      isAC: true,
      layout: "seater",
      departure: "15:30",
      arrival: "20:30",
      duration: "5h 00m",
      departureSlot: "afternoon",
      price: 580,
      rating: 4.7,
      reviewsCount: 264,
      seatsAvailable: 24,
      amenities: ["Wi-Fi", "Charging Port", "Water Bottle", "Live GPS"],
      boardingPoints: [
        { time: "15:00", name: "Kukatpally" },
        { time: "15:30", name: "LB Nagar Ring Road" }
      ],
      droppingPoints: [
        { time: "20:00", name: "Gollapudi Bypass" },
        { time: "20:30", name: "Pandit Nehru Bus Station (PNBS)" }
      ],
      bookedSeats: ["S3", "S4", "S9", "S10", "S15"]
    },
    {
      id: "BUS-MC-501",
      operator: "Parveen Mercedes-Benz Coach",
      from: "Madurai",
      to: "Chennai",
      busType: "AC Sleeper Deluxe (2+1)",
      category: "AC Sleeper",
      isAC: true,
      layout: "sleeper",
      departure: "22:00",
      arrival: "05:30",
      duration: "7h 30m",
      departureSlot: "night",
      price: 920,
      rating: 4.8,
      reviewsCount: 310,
      seatsAvailable: 15,
      amenities: ["Charging Port", "Fresh Blanket", "Reading Light", "Live GPS"],
      boardingPoints: [
        { time: "21:40", name: "Mattuthavani MGR Bus Terminus" },
        { time: "22:00", name: "Melur Highway Bypass" }
      ],
      droppingPoints: [
        { time: "05:00", name: "Kilambakkam KCBT" },
        { time: "05:30", name: "Guindy Kathipara" }
      ],
      bookedSeats: ["L1", "L4", "L7", "U3", "U5"]
    },
    {
      id: "BUS-BK-601",
      operator: "Kallada G4 Scania Express",
      from: "Bangalore",
      to: "Kochi",
      busType: "Scania Multi-Axle AC Sleeper (2+1)",
      category: "Volvo / Premium",
      isAC: true,
      layout: "sleeper",
      departure: "20:30",
      arrival: "06:30",
      duration: "10h 00m",
      departureSlot: "night",
      price: 1380,
      rating: 4.9,
      reviewsCount: 422,
      seatsAvailable: 9,
      amenities: ["Wi-Fi", "Charging Port", "Fresh Blanket", "Live GPS", "Water Bottle"],
      boardingPoints: [
        { time: "20:00", name: "Madiwala Kallada Lounge" },
        { time: "20:30", name: "Electronic City Toll" }
      ],
      droppingPoints: [
        { time: "06:00", name: "Aluva Metro Station" },
        { time: "06:30", name: "Vyttila Mobility Hub" }
      ],
      bookedSeats: ["L1", "L2", "L3", "L6", "U1", "U2", "U5", "U8"]
    },
    {
      id: "BUS-GEN-701",
      operator: "SRS Prime Express",
      from: "Chennai",
      to: "Bangalore",
      busType: "Non-AC Express Seater (2+2)",
      category: "Non-AC Seater",
      isAC: false,
      layout: "seater",
      departure: "13:15",
      arrival: "19:30",
      duration: "6h 15m",
      departureSlot: "afternoon",
      price: 520,
      rating: 4.5,
      reviewsCount: 178,
      seatsAvailable: 26,
      amenities: ["Charging Port", "Live GPS"],
      boardingPoints: [
        { time: "13:15", name: "Koyambedu CMBT" }
      ],
      droppingPoints: [
        { time: "19:30", name: "Majestic Bus Stand" }
      ],
      bookedSeats: ["S2", "S7", "S8", "S14"]
    }
  ],

  defaultBookings: [
    {
      pnr: "RG-2026-8841",
      bookingDate: "2026-11-08",
      journeyDate: "2026-11-18",
      operator: "KPN Royal Travels",
      busType: "Volvo Multi-Axle AC Sleeper (2+1)",
      from: "Chennai",
      to: "Bangalore",
      departure: "22:15",
      arrival: "04:30",
      boardingPoint: "Koyambedu Omni Bus Terminus (CMBT) (21:30)",
      droppingPoint: "Majestic Kempegowda Bus Station (04:30)",
      seats: ["L4", "L5"],
      passengers: [
        { name: "Vikram Aditya", age: 32, gender: "Male", seat: "L4" },
        { name: "Ananya Aditya", age: 29, gender: "Female", seat: "L5" }
      ],
      contactEmail: "vikram.aditya@routego.in",
      contactMobile: "+91 98401 22334",
      amount: 1960,
      paymentMethod: "UPI (vikram@okicici)",
      status: "Upcoming",
      paymentStatus: "Paid"
    },
    {
      pnr: "RG-2026-7912",
      bookingDate: "2026-11-05",
      journeyDate: "2026-11-24",
      operator: "Orange Starliner Tours",
      busType: "Scania Multi-Axle AC Sleeper (2+1)",
      from: "Bangalore",
      to: "Hyderabad",
      departure: "21:30",
      arrival: "06:15",
      boardingPoint: "Madiwala Orange Lounge (20:45)",
      droppingPoint: "Miyapur Cross Road (06:15)",
      seats: ["U6"],
      passengers: [
        { name: "Vikram Aditya", age: 32, gender: "Male", seat: "U6" }
      ],
      contactEmail: "vikram.aditya@routego.in",
      contactMobile: "+91 98401 22334",
      amount: 1290,
      paymentMethod: "HDFC Visa Card •••• 4419",
      status: "Confirmed",
      paymentStatus: "Paid"
    },
    {
      pnr: "RG-2026-6405",
      bookingDate: "2026-10-14",
      journeyDate: "2026-10-20",
      operator: "Parveen Mercedes-Benz Coach",
      busType: "AC Sleeper Deluxe (2+1)",
      from: "Madurai",
      to: "Chennai",
      departure: "22:00",
      arrival: "05:30",
      boardingPoint: "Mattuthavani MGR Bus Terminus (21:40)",
      droppingPoint: "Guindy Kathipara (05:30)",
      seats: ["L8"],
      passengers: [
        { name: "Vikram Aditya", age: 32, gender: "Male", seat: "L8" }
      ],
      contactEmail: "vikram.aditya@routego.in",
      contactMobile: "+91 98401 22334",
      amount: 920,
      paymentMethod: "UPI (vikram@okicici)",
      status: "Completed",
      paymentStatus: "Paid"
    },
    {
      pnr: "RG-2026-5190",
      bookingDate: "2026-10-28",
      journeyDate: "2026-11-03",
      operator: "Kallada G4 Scania Express",
      busType: "Scania Multi-Axle AC Sleeper (2+1)",
      from: "Bangalore",
      to: "Kochi",
      departure: "20:30",
      arrival: "06:30",
      boardingPoint: "Madiwala Kallada Lounge (20:00)",
      droppingPoint: "Vyttila Mobility Hub (06:30)",
      seats: ["L9"],
      passengers: [
        { name: "Vikram Aditya", age: 32, gender: "Male", seat: "L9" }
      ],
      contactEmail: "vikram.aditya@routego.in",
      contactMobile: "+91 98401 22334",
      amount: 1380,
      refundAmount: 1173,
      refundDate: "2026-11-01",
      refundStatus: "Refund Initiated",
      expectedRefundWindow: "3–5 Business Days",
      paymentMethod: "HDFC Visa Card •••• 4419",
      status: "Cancelled",
      paymentStatus: "Refund Initiated"
    },
    {
      pnr: "RG-2026-4102",
      bookingDate: "2026-09-12",
      journeyDate: "2026-09-19",
      operator: "SRS Prime Express",
      busType: "Non-AC Sleeper Air-Suspension (2+1)",
      from: "Chennai",
      to: "Bangalore",
      departure: "21:00",
      arrival: "03:30",
      boardingPoint: "Koyambedu CMBT (21:00)",
      droppingPoint: "Electronic City (03:00)",
      seats: ["U4"],
      passengers: [
        { name: "Vikram Aditya", age: 32, gender: "Male", seat: "U4" }
      ],
      contactEmail: "vikram.aditya@routego.in",
      contactMobile: "+91 98401 22334",
      amount: 620,
      refundAmount: 558,
      refundDate: "2026-09-16",
      refundStatus: "Refunded",
      expectedRefundWindow: "Credited on 18 Sep 2026",
      paymentMethod: "UPI (vikram@okicici)",
      status: "Refunded",
      paymentStatus: "Refunded"
    }
  ],

  defaultSavedPassengers: [
    { id: "PAX-1", name: "Vikram Aditya", age: 32, gender: "Male", contact: "+91 98401 22334" },
    { id: "PAX-2", name: "Ananya Aditya", age: 29, gender: "Female", contact: "+91 98401 55678" },
    { id: "PAX-3", name: "Suresh Subramanian", age: 61, gender: "Male", contact: "+91 94440 11229" }
  ]
};

