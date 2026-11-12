/**
 * ============================================================================
 * ROUTEGO - END-TO-END CONNECTED BOOKING ENGINE (Vanilla ES6+)
 * File: assets/js/booking.js
 * Flow: Search Results -> Seat Selection -> Passenger Details -> Payment -> Confirmation
 * ============================================================================
 */

import { initTiltCards } from './plugins/tilt.js';
import { hydrateIcons, resolvePageUrl, showToast, ensureBookingStore } from './main.js';

/**
 * Get current search state or sensible default
 */
function getSearchCriteria() {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  try {
    const saved = JSON.parse(localStorage.getItem('routego_search') || 'null');
    if (saved && saved.from && saved.to) return saved;
  } catch (_) {}
  return {
    from: 'Chennai',
    to: 'Bangalore',
    journeyDate: tomorrow,
    returnDate: '',
    passengers: 1
  };
}

/**
 * Get or initialize active booking session state
 */
function getActiveBooking() {
  try {
    const raw = sessionStorage.getItem('routego_active_booking');
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
}

function saveActiveBooking(state) {
  sessionStorage.setItem('routego_active_booking', JSON.stringify(state));
}

/**
 * 1. SEARCH RESULTS & ROUTES-FARES FILTERABLE BUS LIST
 */
function initSearchResultsPage() {
  const resultsContainer = document.getElementById('busResultsContainer');
  if (!resultsContainer) return;

  const search = getSearchCriteria();
  const allBuses = (window.ROUTEGO_DATA && window.ROUTEGO_DATA.buses) || [];

  // Update summary banner if present
  const summaryTitle = document.getElementById('searchRouteTitle');
  const summaryMeta = document.getElementById('searchRouteMeta');
  if (summaryTitle) {
    summaryTitle.textContent = `${search.from} to ${search.to}`;
  }
  if (summaryMeta) {
    summaryMeta.textContent = `Journey Date: ${search.journeyDate} • ${search.passengers} Traveler(s)`;
  }

  // Filter controls
  const filterBusType = document.getElementById('filterBusType');
  const filterAcType = document.getElementById('filterAcType');
  const filterLayout = document.getElementById('filterLayout');
  const filterSlot = document.getElementById('filterSlot');
  const filterOperator = document.getElementById('filterOperator');
  const filterMaxPrice = document.getElementById('filterMaxPrice');
  const priceValueLabel = document.getElementById('filterPriceLabel');
  const sortSelect = document.getElementById('sortBuses');
  const resetFiltersBtn = document.getElementById('resetBusFilters');
  const showAllRoutesToggle = document.getElementById('showAllRoutesToggle');

  const renderBuses = () => {
    const maxPrice = filterMaxPrice ? Number(filterMaxPrice.value) : 2000;
    if (priceValueLabel) priceValueLabel.textContent = `Up to ₹${maxPrice}`;

    const typeVal = filterBusType ? filterBusType.value : 'all';
    const acVal = filterAcType ? filterAcType.value : 'all';
    const layoutVal = filterLayout ? filterLayout.value : 'all';
    const slotVal = filterSlot ? filterSlot.value : 'all';
    const opVal = filterOperator ? filterOperator.value : 'all';
    const sortVal = sortSelect ? sortSelect.value : 'price-asc';
    const showAll = showAllRoutesToggle ? showAllRoutesToggle.checked : false;

    let filtered = allBuses.filter((bus) => {
      const routeMatch = showAll ||
        (bus.from.toLowerCase() === search.from.toLowerCase() &&
         bus.to.toLowerCase() === search.to.toLowerCase());
      if (!routeMatch) return false;
      if (typeVal !== 'all' && bus.category !== typeVal) return false;
      if (acVal === 'ac' && !bus.isAC) return false;
      if (acVal === 'non-ac' && bus.isAC) return false;
      if (layoutVal !== 'all' && bus.layout !== layoutVal) return false;
      if (slotVal !== 'all' && bus.departureSlot !== slotVal) return false;
      if (opVal !== 'all' && bus.operator !== opVal) return false;
      if (bus.price > maxPrice) return false;
      return true;
    });

    // If exact city pair has no buses and user hasn't filtered, fallback to showing available routes with notice
    let fallbackUsed = false;
    if (filtered.length === 0 && !showAll && typeVal === 'all' && acVal === 'all' && maxPrice >= 1500) {
      filtered = allBuses.slice();
      fallbackUsed = true;
    }

    filtered.sort((a, b) => {
      if (sortVal === 'price-asc') return a.price - b.price;
      if (sortVal === 'rating-desc') return b.rating - a.rating;
      if (sortVal === 'departure-asc') return a.departure.localeCompare(b.departure);
      return 0;
    });

    const countEl = document.getElementById('busResultsCount');
    if (countEl) {
      countEl.textContent = `${filtered.length} Coach Service(s) Available`;
    }

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div class="tilt-card" style="padding: var(--space-5);">
          <div class="tilt-card__icon" data-icon="bus"></div>
          <h3 class="tilt-card__title">No Coaches Match Your Exact Filter Criteria</h3>
          <p>Try increasing the maximum fare slider or resetting the filters to view all coaches on this corridor.</p>
          <div class="tilt-card__actions">
            <button type="button" class="btn btn--primary" id="emptyResetBtn">Reset All Filters</button>
          </div>
        </div>
      `;
      hydrateIcons();
      initTiltCards();
      document.getElementById('emptyResetBtn')?.addEventListener('click', () => {
        resetFiltersBtn?.click();
      });
      return;
    }

    const noticeHtml = fallbackUsed
      ? `<div style="background:rgba(255,176,32,0.12);border:1px solid rgba(255,176,32,0.4);padding:12px 18px;border-radius:12px;margin-block-end:16px;text-align:center;color:var(--amber);font-size:0.9rem;">
          Showing all featured intercity coaches across RouteGo corridors for <strong>${search.journeyDate}</strong>.
        </div>`
      : '';

    resultsContainer.innerHTML = noticeHtml + filtered.map((bus) => `
      <article class="tilt-card" style="margin-block-end: var(--space-3);">
        <span class="tilt-card__badge">${bus.from} → ${bus.to} • ${bus.category}</span>
        <h3 class="tilt-card__title">${bus.operator}</h3>
        <p style="font-size:0.9rem;margin-block-end:0.5rem;">${bus.busType}</p>
        <div class="tilt-card__meta">
          <span><strong>Departs:</strong> <span class="mono">${bus.departure}</span></span>
          <span>•</span>
          <span><strong>Duration:</strong> <span class="mono">${bus.duration}</span></span>
          <span>•</span>
          <span><strong>Arrives:</strong> <span class="mono">${bus.arrival}</span></span>
          <span>•</span>
          <span style="color:var(--amber);">★ ${bus.rating} (${bus.reviewsCount})</span>
        </div>
        <div class="tilt-card__meta" style="gap:0.45rem;">
          ${bus.amenities.map((am) => `<span class="suggestion-pill">${am}</span>`).join('')}
        </div>
        <div class="tilt-card__price">₹${bus.price.toLocaleString('en-IN')} <small style="font-size:0.8rem;color:var(--text-secondary);font-weight:400;">/ seat (${bus.seatsAvailable} seats left)</small></div>
        <div class="tilt-card__actions">
          <button type="button" class="btn btn--primary js-select-bus-btn" data-bus-id="${bus.id}">
            <span>Select Seats</span>
            <span data-icon="arrowRight"></span>
          </button>
        </div>
      </article>
    `).join('');

    hydrateIcons();
    initTiltCards();

    resultsContainer.querySelectorAll('.js-select-bus-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const busId = btn.getAttribute('data-bus-id');
        const chosenBus = allBuses.find((b) => b.id === busId) || allBuses[0];
        saveActiveBooking({
          bus: chosenBus,
          journeyDate: search.journeyDate,
          selectedSeats: [],
          boardingPoint: chosenBus.boardingPoints[0] ? `${chosenBus.boardingPoints[0].name} (${chosenBus.boardingPoints[0].time})` : '',
          droppingPoint: chosenBus.droppingPoints[0] ? `${chosenBus.droppingPoints[0].name} (${chosenBus.droppingPoints[0].time})` : '',
          passengers: [],
          contact: {},
          promoCode: sessionStorage.getItem('routego_active_promo') || '',
          discountAmount: 0,
          paymentStatus: 'pending'
        });
        window.location.href = resolvePageUrl('seat-selection.html');
      });
    });
  };

  // Show skeleton loader briefly on initial load (0.4 Requirement)
  resultsContainer.innerHTML = `
    <div class="skeleton" style="height: 210px; margin-block-end: 16px;"></div>
    <div class="skeleton" style="height: 210px; margin-block-end: 16px;"></div>
    <div class="skeleton" style="height: 210px;"></div>
  `;

  setTimeout(renderBuses, 320);

  [filterBusType, filterAcType, filterLayout, filterSlot, filterOperator, filterMaxPrice, sortSelect, showAllRoutesToggle].forEach((ctrl) => {
    if (ctrl) ctrl.addEventListener('input', renderBuses);
    if (ctrl) ctrl.addEventListener('change', renderBuses);
  });

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      if (filterBusType) filterBusType.value = 'all';
      if (filterAcType) filterAcType.value = 'all';
      if (filterLayout) filterLayout.value = 'all';
      if (filterSlot) filterSlot.value = 'all';
      if (filterOperator) filterOperator.value = 'all';
      if (filterMaxPrice) filterMaxPrice.value = '2000';
      if (sortSelect) sortSelect.value = 'price-asc';
      renderBuses();
    });
  }
}

/**
 * 2. SEAT SELECTION PAGE
 */
function initSeatSelectionPage() {
  const deckContainer = document.getElementById('seatDeckContainer');
  if (!deckContainer) return;

  const allBuses = (window.ROUTEGO_DATA && window.ROUTEGO_DATA.buses) || [];
  const search = getSearchCriteria();
  let booking = getActiveBooking();

  if (!booking || !booking.bus) {
    const defaultBus = allBuses[0];
    booking = {
      bus: defaultBus,
      journeyDate: search.journeyDate,
      selectedSeats: ['L4'],
      boardingPoint: `${defaultBus.boardingPoints[0].name} (${defaultBus.boardingPoints[0].time})`,
      droppingPoint: `${defaultBus.droppingPoints[0].name} (${defaultBus.droppingPoints[0].time})`,
      passengers: [],
      contact: {},
      promoCode: sessionStorage.getItem('routego_active_promo') || '',
      discountAmount: 0,
      paymentStatus: 'pending'
    };
    saveActiveBooking(booking);
  }

  const bus = booking.bus;
  const bookedSet = new Set(bus.bookedSeats || []);
  const selectedSet = new Set(booking.selectedSeats || []);

  // Populate Bus Header Info
  const busTitleEl = document.getElementById('seatBusTitle');
  const busMetaEl = document.getElementById('seatBusMeta');
  if (busTitleEl) busTitleEl.textContent = `${bus.operator} — ${bus.busType}`;
  if (busMetaEl) {
    busMetaEl.textContent = `${bus.from} (${bus.departure}) → ${bus.to} (${bus.arrival}) • Journey Date: ${booking.journeyDate} • ₹${bus.price}/seat`;
  }

  // Populate Boarding & Dropping Dropdowns
  const boardingSelect = document.getElementById('boardingPointSelect');
  const droppingSelect = document.getElementById('droppingPointSelect');

  if (boardingSelect) {
    boardingSelect.innerHTML = bus.boardingPoints.map((bp) => {
      const val = `${bp.name} (${bp.time})`;
      return `<option value="${val}" ${val === booking.boardingPoint ? 'selected' : ''}>${bp.time} — ${bp.name}</option>`;
    }).join('');
  }

  if (droppingSelect) {
    droppingSelect.innerHTML = bus.droppingPoints.map((dp) => {
      const val = `${dp.name} (${dp.time})`;
      return `<option value="${val}" ${val === booking.droppingPoint ? 'selected' : ''}>${dp.time} — ${dp.name}</option>`;
    }).join('');
  }

  // Layout Switcher (Allow traveler to preview Sleeper 2+1 vs Seater 2+2)
  const layoutModeSelect = document.getElementById('deckLayoutSwitcher');
  if (layoutModeSelect) {
    layoutModeSelect.value = bus.layout || 'sleeper';
    layoutModeSelect.addEventListener('change', () => {
      bus.layout = layoutModeSelect.value;
      selectedSet.clear();
      renderDeck();
      updateSummary();
    });
  }

  const updateSummary = () => {
    const seatsArr = Array.from(selectedSet);
    const baseFare = seatsArr.length * bus.price;
    const tax = Math.round(baseFare * 0.05);
    const total = baseFare + tax;

    const seatsEl = document.getElementById('summarySelectedSeats');
    const baseEl = document.getElementById('summaryBaseFare');
    const taxEl = document.getElementById('summaryTaxes');
    const totalEl = document.getElementById('summaryTotalFare');
    const errEl = document.getElementById('seatSelectionError');

    if (seatsEl) seatsEl.textContent = seatsArr.length ? seatsArr.join(', ') : 'None selected';
    if (baseEl) baseEl.textContent = `₹${baseFare.toLocaleString('en-IN')}`;
    if (taxEl) taxEl.textContent = `₹${tax.toLocaleString('en-IN')}`;
    if (totalEl) totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    if (errEl && seatsArr.length > 0) errEl.style.display = 'none';

    booking.selectedSeats = seatsArr;
    saveActiveBooking(booking);
  };

  const renderDeck = () => {
    if (bus.layout === 'seater') {
      let rowsHtml = '';
      for (let r = 1; r <= 6; r++) {
        const sA = `S${(r - 1) * 4 + 1}`;
        const sB = `S${(r - 1) * 4 + 2}`;
        const sC = `S${(r - 1) * 4 + 3}`;
        const sD = `S${(r - 1) * 4 + 4}`;
        const cell = (code) => {
          const isBooked = bookedSet.has(code);
          const isSel = selectedSet.has(code);
          return `<button type="button" class="seat-btn ${isBooked ? 'is-booked' : ''} ${isSel ? 'is-selected' : ''}" data-seat="${code}" ${isBooked ? 'disabled' : ''} aria-label="Seat ${code}, ₹${bus.price}">
            <span>${code}</span>
            <small>₹${bus.price}</small>
          </button>`;
        };
        rowsHtml += `${cell(sA)}${cell(sB)}<div class="seat-aisle">R${r}</div>${cell(sC)}${cell(sD)}`;
      }
      deckContainer.innerHTML = `
        <div class="coach-cabin">
          <div class="coach-cabin__header">
            <h4>Main Coach Deck — 2+2 Ergonomic Recliner Seater</h4>
            <span class="mono" style="color:var(--amber);">Front / Driver Cockpit</span>
          </div>
          <div class="seat-grid-seater">${rowsHtml}</div>
        </div>
      `;
    } else {
      const buildSleeperCabin = (prefix, label) => {
        let html = '';
        for (let r = 1; r <= 4; r++) {
          const left = `${prefix}${(r - 1) * 3 + 1}`;
          const rightA = `${prefix}${(r - 1) * 3 + 2}`;
          const rightB = `${prefix}${(r - 1) * 3 + 3}`;
          const berth = (code) => {
            const isBooked = bookedSet.has(code);
            const isSel = selectedSet.has(code);
            return `<button type="button" class="seat-btn seat-btn--sleeper ${isBooked ? 'is-booked' : ''} ${isSel ? 'is-selected' : ''}" data-seat="${code}" ${isBooked ? 'disabled' : ''} aria-label="Berth ${code}, ₹${bus.price}">
              <span>${code}</span>
              <small>₹${bus.price}</small>
            </button>`;
          };
          html += `${berth(left)}<div class="seat-aisle">AISLE</div>${berth(rightA)}${berth(rightB)}`;
        }
        return `
          <div class="coach-cabin">
            <div class="coach-cabin__header">
              <h4>${label} (2+1 Sleeper Berths)</h4>
              <span class="mono" style="color:var(--teal);"> Individual Curtains & Charging</span>
            </div>
            <div class="seat-grid-sleeper">${html}</div>
          </div>
        `;
      };
      deckContainer.innerHTML = buildSleeperCabin('L', 'Lower Deck') + buildSleeperCabin('U', 'Upper Deck');
    }

    deckContainer.querySelectorAll('.seat-btn:not(:disabled)').forEach((btn) => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-seat');
        if (!code) return;
        if (selectedSet.has(code)) {
          selectedSet.delete(code);
          btn.classList.remove('is-selected');
        } else {
          if (selectedSet.size >= 6) {
            showToast('Maximum 6 seats can be booked in a single transaction.', 'coral');
            return;
          }
          selectedSet.add(code);
          btn.classList.add('is-selected');
        }
        updateSummary();
      });
    });
  };

  renderDeck();
  updateSummary();

  const continueBtn = document.getElementById('continueToPassengersBtn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      const errEl = document.getElementById('seatSelectionError');
      if (selectedSet.size === 0) {
        if (errEl) {
          errEl.style.display = 'block';
          errEl.textContent = 'Please select at least 1 seat or sleeper berth to continue.';
        }
        showToast('Please select at least one seat before continuing.', 'coral');
        return;
      }
      booking.selectedSeats = Array.from(selectedSet);
      booking.boardingPoint = boardingSelect ? boardingSelect.value : booking.boardingPoint;
      booking.droppingPoint = droppingSelect ? droppingSelect.value : booking.droppingPoint;
      saveActiveBooking(booking);
      window.location.href = resolvePageUrl('passenger-details.html');
    });
  }
}

/**
 * 3. PASSENGER DETAILS PAGE
 */
function initPassengerDetailsPage() {
  const paxContainer = document.getElementById('passengerInputsContainer');
  const form = document.getElementById('passengerDetailsForm');
  if (!paxContainer || !form) return;

  const allBuses = (window.ROUTEGO_DATA && window.ROUTEGO_DATA.buses) || [];
  let booking = getActiveBooking();
  if (!booking || !booking.bus || !booking.selectedSeats || booking.selectedSeats.length === 0) {
    const defaultBus = allBuses[0];
    booking = {
      bus: defaultBus,
      journeyDate: getSearchCriteria().journeyDate,
      selectedSeats: ['L4'],
      boardingPoint: `${defaultBus.boardingPoints[0].name} (${defaultBus.boardingPoints[0].time})`,
      droppingPoint: `${defaultBus.droppingPoints[0].name} (${defaultBus.droppingPoints[0].time})`,
      passengers: [],
      contact: {},
      promoCode: sessionStorage.getItem('routego_active_promo') || '',
      discountAmount: 0,
      paymentStatus: 'pending'
    };
    saveActiveBooking(booking);
  }

  const bus = booking.bus;
  const seats = booking.selectedSeats;

  // Populate Route & Boarding Summary
  const routeSummaryEl = document.getElementById('paxRouteSummary');
  if (routeSummaryEl) {
    routeSummaryEl.textContent = `${bus.operator} • ${bus.from} → ${bus.to} on ${booking.journeyDate} • Seats: ${seats.join(', ')}`;
  }

  const bpInput = document.getElementById('paxBoardingInput');
  const dpInput = document.getElementById('paxDroppingInput');
  if (bpInput) bpInput.value = booking.boardingPoint;
  if (dpInput) dpInput.value = booking.droppingPoint;

  // Render dynamic passenger fields per selected seat
  paxContainer.innerHTML = seats.map((seatCode, idx) => {
    const existing = (booking.passengers && booking.passengers[idx]) || {};
    return `
      <div class="tilt-card" style="margin-block-end: var(--space-3); align-items: stretch;">
        <span class="tilt-card__badge" style="align-self:center;">Passenger ${idx + 1} • Seat / Berth ${seatCode}</span>
        <div class="grid-3" style="width:100%; margin-block-start: var(--space-2);">
          <div class="form-group">
            <label class="form-label" for="paxName_${idx}">Passenger Full Name *</label>
            <input type="text" id="paxName_${idx}" name="paxName_${idx}" class="form-control" placeholder="e.g. Vikram Aditya" value="${existing.name || ''}" required>
            <span class="form-error">Please enter passenger full name.</span>
          </div>
          <div class="form-group">
            <label class="form-label" for="paxAge_${idx}">Age (Years) *</label>
            <input type="number" id="paxAge_${idx}" name="paxAge_${idx}" class="form-control" min="1" max="110" placeholder="e.g. 28" value="${existing.age || ''}" required>
            <span class="form-error">Enter a valid age between 1 and 110.</span>
          </div>
          <div class="form-group">
            <label class="form-label" for="paxGender_${idx}">Gender *</label>
            <select id="paxGender_${idx}" name="paxGender_${idx}" class="form-control" required>
              <option value="">Select Gender</option>
              <option value="Male" ${existing.gender === 'Male' ? 'selected' : ''}>Male</option>
              <option value="Female" ${existing.gender === 'Female' ? 'selected' : ''}>Female</option>
              <option value="Other" ${existing.gender === 'Other' ? 'selected' : ''}>Other</option>
            </select>
            <span class="form-error">Please select gender.</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  initTiltCards();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const passengers = [];
    seats.forEach((seatCode, idx) => {
      const nameInput = document.getElementById(`paxName_${idx}`);
      const ageInput = document.getElementById(`paxAge_${idx}`);
      const genderInput = document.getElementById(`paxGender_${idx}`);

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const ageVal = ageInput ? Number(ageInput.value) : 0;
      const genderVal = genderInput ? genderInput.value : '';

      if (!nameVal || nameVal.length < 2) {
        valid = false;
        nameInput?.classList.add('is-invalid');
        nameInput?.closest('.form-group')?.classList.add('has-error');
      } else {
        nameInput?.classList.remove('is-invalid');
        nameInput?.closest('.form-group')?.classList.remove('has-error');
      }

      if (!ageVal || ageVal < 1 || ageVal > 110) {
        valid = false;
        ageInput?.classList.add('is-invalid');
        ageInput?.closest('.form-group')?.classList.add('has-error');
      } else {
        ageInput?.classList.remove('is-invalid');
        ageInput?.closest('.form-group')?.classList.remove('has-error');
      }

      if (!genderVal) {
        valid = false;
        genderInput?.classList.add('is-invalid');
        genderInput?.closest('.form-group')?.classList.add('has-error');
      } else {
        genderInput?.classList.remove('is-invalid');
        genderInput?.closest('.form-group')?.classList.remove('has-error');
      }

      passengers.push({ name: nameVal, age: ageVal, gender: genderVal, seat: seatCode });
    });

    const mobileInput = document.getElementById('contactMobile');
    const emailInput = document.getElementById('contactEmail');
    const emergencyInput = document.getElementById('emergencyContact');

    const mobileVal = mobileInput ? mobileInput.value.trim() : '';
    const emailVal = emailInput ? emailInput.value.trim() : '';

    if (!/^[+\d][\d\s-]{8,15}$/.test(mobileVal)) {
      valid = false;
      mobileInput?.classList.add('is-invalid');
      mobileInput?.closest('.form-group')?.classList.add('has-error');
    } else {
      mobileInput?.classList.remove('is-invalid');
      mobileInput?.closest('.form-group')?.classList.remove('has-error');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      valid = false;
      emailInput?.classList.add('is-invalid');
      emailInput?.closest('.form-group')?.classList.add('has-error');
    } else {
      emailInput?.classList.remove('is-invalid');
      emailInput?.closest('.form-group')?.classList.remove('has-error');
    }

    if (!valid) {
      showToast('Please complete all required passenger and contact details.', 'coral');
      return;
    }

    booking.passengers = passengers;
    booking.boardingPoint = bpInput ? bpInput.value.trim() : booking.boardingPoint;
    booking.droppingPoint = dpInput ? dpInput.value.trim() : booking.droppingPoint;
    booking.contact = {
      mobile: mobileVal,
      email: emailVal,
      emergency: emergencyInput ? emergencyInput.value.trim() : ''
    };
    saveActiveBooking(booking);
    window.location.href = resolvePageUrl('payment.html');
  });
}

/**
 * 4. PAYMENT PAGE (Strict 0.6 Honesty Rule: Demo / Test Mode, never fake success on failed payment)
 */
function initPaymentPage() {
  const paymentForm = document.getElementById('paymentCheckoutForm');
  if (!paymentForm) return;

  const allBuses = (window.ROUTEGO_DATA && window.ROUTEGO_DATA.buses) || [];
  let booking = getActiveBooking();
  if (!booking || !booking.bus) {
    const defaultBus = allBuses[0];
    booking = {
      bus: defaultBus,
      journeyDate: getSearchCriteria().journeyDate,
      selectedSeats: ['L4'],
      boardingPoint: `${defaultBus.boardingPoints[0].name} (${defaultBus.boardingPoints[0].time})`,
      droppingPoint: `${defaultBus.droppingPoints[0].name} (${defaultBus.droppingPoints[0].time})`,
      passengers: [{ name: 'Vikram Aditya', age: 32, gender: 'Male', seat: 'L4' }],
      contact: { mobile: '+91 98401 22334', email: 'vikram.aditya@routego.in', emergency: '' },
      promoCode: sessionStorage.getItem('routego_active_promo') || '',
      discountAmount: 0,
      paymentStatus: 'pending'
    };
    saveActiveBooking(booking);
  }

  const bus = booking.bus;
  const seatCount = (booking.selectedSeats && booking.selectedSeats.length) || 1;
  const baseFare = seatCount * bus.price;
  const taxes = Math.round(baseFare * 0.05);
  const convenienceFee = 35;

  const promoInput = document.getElementById('checkoutPromoInput');
  const applyPromoBtn = document.getElementById('applyCheckoutPromoBtn');
  const promoStatusEl = document.getElementById('checkoutPromoStatus');

  if (promoInput && booking.promoCode) {
    promoInput.value = booking.promoCode;
  }

  const computeTotals = () => {
    const code = promoInput ? promoInput.value.trim().toUpperCase() : '';
    const promos = (window.ROUTEGO_DATA && window.ROUTEGO_DATA.promoCodes) || {};
    let discount = 0;

    if (code && promos[code]) {
      const rule = promos[code];
      if (baseFare >= (rule.minAmount || 0)) {
        if (rule.flatDiscount) {
          discount = rule.flatDiscount;
        } else if (rule.discountPercent) {
          discount = Math.min(Math.round((baseFare * rule.discountPercent) / 100), rule.maxDiscount || 9999);
        }
        if (promoStatusEl) {
          promoStatusEl.style.color = 'var(--teal)';
          promoStatusEl.textContent = `Applied ${code}: -₹${discount} (${rule.label})`;
        }
      } else if (promoStatusEl) {
        promoStatusEl.style.color = 'var(--amber)';
        promoStatusEl.textContent = `Code ${code} requires a minimum base fare of ₹${rule.minAmount}.`;
      }
    } else if (code && promoStatusEl) {
      promoStatusEl.style.color = 'var(--coral)';
      promoStatusEl.textContent = `Promo code "${code}" is not valid. Try FIRST25 or WEEKEND15.`;
    }

    const finalPayable = Math.max(100, baseFare + taxes + convenienceFee - discount);
    booking.discountAmount = discount;
    booking.finalPayable = finalPayable;
    saveActiveBooking(booking);

    const setTxt = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };

    setTxt('paySummaryOperator', `${bus.operator} (${bus.busType})`);
    setTxt('paySummaryRoute', `${bus.from} → ${bus.to} • ${booking.journeyDate}`);
    setTxt('paySummaryBoarding', `${booking.boardingPoint} → ${booking.droppingPoint}`);
    setTxt('paySummarySeats', booking.selectedSeats.join(', '));
    setTxt('paySummaryPassengers', booking.passengers.map((p) => `${p.name} (${p.age}${p.gender ? ', ' + p.gender[0] : ''})`).join(', '));
    setTxt('payBaseFare', `₹${baseFare.toLocaleString('en-IN')}`);
    setTxt('payTaxes', `₹${(taxes + convenienceFee).toLocaleString('en-IN')}`);
    setTxt('payDiscount', `-₹${discount.toLocaleString('en-IN')}`);
    setTxt('payTotalAmount', `₹${finalPayable.toLocaleString('en-IN')}`);
  };

  computeTotals();

  if (applyPromoBtn) {
    applyPromoBtn.addEventListener('click', computeTotals);
  }

  // Payment Method Tabs
  let activeMethod = 'UPI';
  document.querySelectorAll('[data-pay-method]').forEach((tab) => {
    tab.addEventListener('click', () => {
      activeMethod = tab.getAttribute('data-pay-method') || 'UPI';
      document.querySelectorAll('[data-pay-method]').forEach((t) => {
        t.classList.toggle('btn--primary', t === tab);
        t.classList.toggle('btn--outline', t !== tab);
      });
      document.querySelectorAll('[data-pay-panel]').forEach((panel) => {
        panel.style.display = panel.getAttribute('data-pay-panel') === activeMethod ? 'block' : 'none';
      });
    });
  });

  const failureBanner = document.getElementById('paymentFailureAlert');

  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (failureBanner) failureBanner.style.display = 'none';

    const outcomeMode = document.querySelector('input[name="demoGatewayOutcome"]:checked')?.value || 'success';

    // Validate active method input
    if (activeMethod === 'UPI') {
      const upiId = document.getElementById('upiIdInput')?.value.trim() || '';
      if (!upiId.includes('@')) {
        showToast('Please enter a valid UPI ID (e.g. traveler@okicici).', 'coral');
        return;
      }
    } else if (activeMethod === 'Card') {
      const cardNum = document.getElementById('cardNumberInput')?.value.replace(/\s+/g, '') || '';
      if (cardNum.length < 12) {
        showToast('Please enter a valid 16-digit card number.', 'coral');
        return;
      }
    }

    // Strict Honesty Rule (0.6): If payment fails or is abandoned, NEVER show a confirmed ticket!
    if (outcomeMode === 'fail') {
      booking.paymentStatus = 'failed';
      saveActiveBooking(booking);
      if (failureBanner) {
        failureBanner.style.display = 'block';
        failureBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      showToast('Demo Payment Declined / Pending: No ticket was issued.', 'coral');
      return;
    }

    // Payment authorized in Demo Mode: Generate PNR & persist to localStorage booking store
    const pnr = `RG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const confirmedRecord = {
      pnr,
      bookingDate: new Date().toISOString().split('T')[0],
      journeyDate: booking.journeyDate,
      operator: bus.operator,
      busType: bus.busType,
      from: bus.from,
      to: bus.to,
      departure: bus.departure,
      arrival: bus.arrival,
      boardingPoint: booking.boardingPoint,
      droppingPoint: booking.droppingPoint,
      seats: booking.selectedSeats,
      passengers: booking.passengers,
      contactEmail: booking.contact.email || 'traveler@routego.in',
      contactMobile: booking.contact.mobile || '+91 98401 22334',
      amount: booking.finalPayable || baseFare + taxes + convenienceFee,
      paymentMethod: `${activeMethod} (Demo Gateway Verified)`,
      status: 'Confirmed',
      paymentStatus: 'Paid'
    };

    ensureBookingStore();
    const existingList = JSON.parse(localStorage.getItem('routego_bookings') || '[]');
    existingList.unshift(confirmedRecord);
    localStorage.setItem('routego_bookings', JSON.stringify(existingList));
    sessionStorage.setItem('routego_confirmed_ticket', JSON.stringify(confirmedRecord));

    window.location.href = resolvePageUrl('confirmation.html');
  });
}

/**
 * 5. BOOKING CONFIRMATION / E-TICKET PAGE
 */
function initConfirmationPage() {
  const ticketBox = document.getElementById('confirmedTicketContainer');
  const unverifiedBox = document.getElementById('unverifiedTicketNotice');
  if (!ticketBox) return;

  let ticket = null;
  try {
    const raw = sessionStorage.getItem('routego_confirmed_ticket');
    if (raw) ticket = JSON.parse(raw);
  } catch (_) {}

  // Strict 0.6 Honesty Check: Only show confirmed ticket if a verified ticket exists in sessionStorage
  if (!ticket || !ticket.pnr) {
    ticketBox.style.display = 'none';
    if (unverifiedBox) {
      unverifiedBox.style.display = 'flex';
      const loadSampleBtn = document.getElementById('loadLatestConfirmedFromStoreBtn');
      if (loadSampleBtn) {
        loadSampleBtn.addEventListener('click', () => {
          ensureBookingStore();
          const list = JSON.parse(localStorage.getItem('routego_bookings') || '[]');
          const firstConfirmed = list.find((b) => b.status === 'Confirmed' || b.status === 'Upcoming');
          if (firstConfirmed) {
            sessionStorage.setItem('routego_confirmed_ticket', JSON.stringify(firstConfirmed));
            window.location.reload();
          }
        });
      }
    }
    return;
  }

  ticketBox.style.display = 'block';
  if (unverifiedBox) unverifiedBox.style.display = 'none';

  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setTxt('ticketPnr', ticket.pnr);
  setTxt('ticketStatus', ticket.status);
  setTxt('ticketOperator', ticket.operator);
  setTxt('ticketBusType', ticket.busType);
  setTxt('ticketFromCity', ticket.from);
  setTxt('ticketToCity', ticket.to);
  setTxt('ticketDeparture', `${ticket.journeyDate} at ${ticket.departure}`);
  setTxt('ticketArrival', ticket.arrival);
  setTxt('ticketBoarding', ticket.boardingPoint);
  setTxt('ticketDropping', ticket.droppingPoint);
  setTxt('ticketSeats', (ticket.seats || []).join(', '));
  setTxt('ticketAmount', `₹${Number(ticket.amount).toLocaleString('en-IN')} (${ticket.paymentMethod})`);

  const paxTableBody = document.getElementById('ticketPassengersBody');
  if (paxTableBody && ticket.passengers) {
    paxTableBody.innerHTML = ticket.passengers.map((p, i) => `
      <tr>
        <td>${i + 1}</td>
        <td><strong>${p.name}</strong></td>
        <td>${p.age} yrs / ${p.gender}</td>
        <td class="mono" style="color:var(--amber);font-weight:700;">${p.seat}</td>
        <td><span class="status-badge status-badge--confirmed">Confirmed</span></td>
      </tr>
    `).join('');
  }

  document.getElementById('printTicketBtn')?.addEventListener('click', () => {
    window.print();
  });

  document.getElementById('downloadTicketBtn')?.addEventListener('click', () => {
    showToast(`Downloading PDF E-Ticket for PNR ${ticket.pnr}...`);
    setTimeout(() => window.print(), 500);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSearchResultsPage();
  initSeatSelectionPage();
  initPassengerDetailsPage();
  initPaymentPage();
  initConfirmationPage();
});

