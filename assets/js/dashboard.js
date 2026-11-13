/**
 * ============================================================================
 * ROUTEGO - TRAVELER DASHBOARD CONTROLLER (Vanilla ES6+)
 * File: assets/js/dashboard.js
 * Reads & mutates real bookings & passengers in localStorage
 * ============================================================================
 */

import { initTiltCards } from './plugins/tilt.js';
import { hydrateIcons, resolvePageUrl, showToast, ensureBookingStore } from './main.js';

function getBookings() {
  ensureBookingStore();
  try {
    return JSON.parse(localStorage.getItem('routego_bookings') || '[]');
  } catch (_) {
    return [];
  }
}

function saveBookings(list) {
  localStorage.setItem('routego_bookings', JSON.stringify(list));
}

function getPassengers() {
  ensureBookingStore();
  try {
    return JSON.parse(localStorage.getItem('routego_passengers') || '[]');
  } catch (_) {
    return [];
  }
}

function savePassengers(list) {
  localStorage.setItem('routego_passengers', JSON.stringify(list));
}

function getStatusBadgeClass(status) {
  const s = (status || '').toLowerCase();
  if (s.includes('cancel')) return 'status-badge--cancelled';
  if (s.includes('upcoming') || s.includes('initiated')) return 'status-badge--upcoming';
  return 'status-badge--confirmed';
}

function initDashboard() {
  const overviewRoot = document.getElementById('dashboardApp');
  if (!overviewRoot) return;

  const renderAllDashboardViews = () => {
    const bookings = getBookings();

    // 1. Update KPI Overview Counters
    const totalCount = bookings.length;
    const upcomingCount = bookings.filter((b) => b.status === 'Upcoming' || b.status === 'Confirmed').length;
    const completedCount = bookings.filter((b) => b.status === 'Completed').length;
    const cancelledCount = bookings.filter((b) => b.status === 'Cancelled' || b.status === 'Refund Initiated' || b.status === 'Refunded').length;

    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(val);
    };

    setTxt('kpiTotalBookings', totalCount);
    setTxt('kpiUpcomingTrips', upcomingCount);
    setTxt('kpiCompletedJourneys', completedCount);
    setTxt('kpiCancelledTickets', cancelledCount);

    // 2. Render Upcoming Journey Section
    const upcomingContainer = document.getElementById('upcomingJourneysContainer');
    const activeTrips = bookings.filter((b) => b.status === 'Upcoming' || b.status === 'Confirmed');
    if (upcomingContainer) {
      if (activeTrips.length === 0) {
        upcomingContainer.innerHTML = `
          <div class="tilt-card">
            <h3 class="tilt-card__title">No Active Upcoming Journeys</h3>
            <p>Use Quick Bus Search above to book your next intercity coach journey.</p>
          </div>
        `;
      } else {
        upcomingContainer.innerHTML = activeTrips.map((b) => `
          <article class="tilt-card tilt-card--booking" style="align-items:flex-start;text-align:start;">
            <span class="tilt-card__badge" style="align-self:flex-start;margin-inline:0;">Booking ID: <span class="mono" style="white-space:nowrap;">${b.pnr}</span> • ${b.status}</span>
            <h3 class="tilt-card__title" style="text-align:start;width:100%;">${b.from} → ${b.to}</h3>
            <p style="text-align:start;width:100%;"><strong>Bus Details:</strong> ${b.operator} (${b.busType})</p>
            <div class="tilt-card__meta" style="justify-content:flex-start;text-align:start;width:100%;">
              <span><strong>Date & Time:</strong> <span class="mono" style="white-space:nowrap;">${b.journeyDate} at ${b.departure}</span></span>
              <span>•</span>
              <span><strong>Seats:</strong> <span class="mono" style="white-space:nowrap;">${(b.seats || []).join(', ')}</span></span>
            </div>
            <p style="font-size:0.86rem;text-align:start;width:100%;"><strong>Boarding Point:</strong> ${b.boardingPoint}</p>
            <div class="tilt-card__price" style="align-self:flex-start;text-align:start;width:100%;">₹${Number(b.amount).toLocaleString('en-IN')}</div>
            <div class="tilt-card__actions" style="gap:0.75rem;flex-wrap:wrap;justify-content:center;width:100%;">
              <button type="button" class="btn btn--primary btn--sm js-view-ticket" data-pnr="${b.pnr}">
                <span data-icon="ticket"></span>
                <span>View Ticket</span>
              </button>
              <button type="button" class="btn btn--coral btn--sm js-JumpCancel" data-pnr="${b.pnr}">
                <span>Cancel Ticket</span>
              </button>
            </div>
          </article>
        `).join('');
      }
    }

    // 3. Render Recent Booking Activity Table
    const recentTableBody = document.getElementById('recentActivityBody');
    if (recentTableBody) {
      recentTableBody.innerHTML = bookings.map((b) => `
        <tr>
          <td class="mono">${b.bookingDate}</td>
          <td class="mono" style="color:var(--amber);font-weight:700;">${b.pnr}</td>
          <td><strong>${b.from} → ${b.to}</strong><br><small style="color:var(--text-muted);">${b.operator}</small></td>
          <td class="mono">₹${Number(b.amount).toLocaleString('en-IN')}</td>
          <td><span class="status-badge ${getStatusBadgeClass(b.status)}">${b.status}</span></td>
          <td>
            <button type="button" class="btn btn--outline btn--sm js-view-ticket" data-pnr="${b.pnr}">View Details</button>
          </td>
        </tr>
      `).join('');
    }

    // 4. Render My Bookings (Detailed Cards)
    const myBookingsContainer = document.getElementById('myBookingsDetailedContainer');
    if (myBookingsContainer) {
      myBookingsContainer.innerHTML = bookings.map((b) => `
        <article class="tilt-card tilt-card--booking" style="align-items:flex-start;text-align:start;">
          <span class="status-badge ${getStatusBadgeClass(b.status)}" style="margin-block-end:0.65rem;align-self:flex-start;margin-inline:0;">${b.status} • Payment: ${b.paymentStatus || 'Paid'}</span>
          <h3 class="tilt-card__title" style="text-align:start;width:100%;font-size:1.15rem;margin-block-end:0.65rem;line-height:1.4;">Ref: <span class="mono" style="white-space:nowrap;">${b.pnr}</span> &mdash; ${b.from} to ${b.to}</h3>
          <p style="text-align:start;width:100%;margin-block-end:0.45rem;"><strong>Bus Details:</strong> ${b.operator} | ${b.busType}</p>
          <p style="text-align:start;width:100%;margin-block-end:0.45rem;"><strong>Journey:</strong> <span class="mono" style="white-space:nowrap;">${b.journeyDate}</span> (${b.departure} – ${b.arrival}) | <strong>Boarding:</strong> ${b.boardingPoint}</p>
          <p style="text-align:start;width:100%;margin-block-end:0.45rem;"><strong>Passengers &amp; Seats:</strong> ${(b.passengers || []).map((p) => `${p.name} (${p.age}y, Seat <span class="mono" style="white-space:nowrap;">${p.seat}</span>)`).join('; ')}</p>
          <div class="tilt-card__price" style="text-align:start;align-self:flex-start;width:100%;margin-block:0.65rem 0.25rem;">₹${Number(b.amount).toLocaleString('en-IN')}</div>
          <div class="tilt-card__actions" style="justify-content:center;width:100%;">
            <button type="button" class="btn btn--secondary btn--sm js-view-ticket" data-pnr="${b.pnr}">
              <span data-icon="download"></span>
              <span>Download Ticket</span>
            </button>
          </div>
        </article>
      `).join('');
    }

    // 5. Populate Manage Cancellations Select Dropdown & Calculation
    const cancelSelect = document.getElementById('cancelBookingSelect');
    const cancellable = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Upcoming');
    if (cancelSelect) {
      if (cancellable.length === 0) {
        cancelSelect.innerHTML = `<option value="">No active bookings eligible for cancellation</option>`;
      } else {
        cancelSelect.innerHTML = cancellable.map((b) => `
          <option value="${b.pnr}">${b.pnr} — ${b.from} to ${b.to} (${b.journeyDate}) — ₹${b.amount}</option>
        `).join('');
      }
      updateCancellationPreview();
    }

    // 6. Render Refund Tracking Table
    const refundBody = document.getElementById('refundTrackingBody');
    const refundedItems = bookings.filter((b) => b.status === 'Cancelled' || b.status === 'Refund Initiated' || b.status === 'Refunded');
    if (refundBody) {
      refundBody.innerHTML = refundedItems.map((b) => `
        <tr>
          <td class="mono" style="color:var(--amber);font-weight:700;">${b.pnr}</td>
          <td class="mono" style="color:var(--teal);font-weight:700;">₹${Number(b.refundAmount || Math.round(b.amount * 0.85)).toLocaleString('en-IN')}</td>
          <td>${b.paymentMethod || 'Original Payment Source'}</td>
          <td class="mono">${b.refundDate || b.bookingDate}</td>
          <td><span class="status-badge ${getStatusBadgeClass(b.refundStatus || b.status)}">${b.refundStatus || b.status}</span></td>
          <td>${b.expectedRefundWindow || '3–5 Business Days'}</td>
        </tr>
      `).join('');
    }

    // Bind View Ticket & Cancel Ticket Buttons
    document.querySelectorAll('.js-view-ticket').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pnr = btn.getAttribute('data-pnr');
        const found = bookings.find((b) => b.pnr === pnr);
        if (found) {
          sessionStorage.setItem('routego_confirmed_ticket', JSON.stringify(found));
          window.location.href = resolvePageUrl('confirmation.html');
        }
      });
    });

    document.querySelectorAll('.js-JumpCancel').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pnr = btn.getAttribute('data-pnr');
        if (cancelSelect && pnr) {
          cancelSelect.value = pnr;
          updateCancellationPreview();
        }
        document.getElementById('manage-cancellations')?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    hydrateIcons();
    initTiltCards();
  };

  // Cancellation Fee Calculator
  const updateCancellationPreview = () => {
    const cancelSelect = document.getElementById('cancelBookingSelect');
    const feeEl = document.getElementById('cancelChargesValue');
    const refundEl = document.getElementById('cancelRefundableValue');
    const statusEl = document.getElementById('cancelLiveStatus');
    if (!cancelSelect) return;

    const pnr = cancelSelect.value;
    const bookings = getBookings();
    const target = bookings.find((b) => b.pnr === pnr);

    if (!target) {
      if (feeEl) feeEl.textContent = '₹0';
      if (refundEl) refundEl.textContent = '₹0';
      if (statusEl) statusEl.textContent = 'No active booking selected';
      return;
    }

    const charge = Math.round(target.amount * 0.15);
    const refundable = Math.max(0, target.amount - charge);
    if (feeEl) feeEl.textContent = `₹${charge.toLocaleString('en-IN')} (15% Policy Fee)`;
    if (refundEl) refundEl.textContent = `₹${refundable.toLocaleString('en-IN')}`;
    if (statusEl) statusEl.textContent = `Eligible for Instant Refund Initiation (${target.pnr})`;
  };

  document.getElementById('cancelBookingSelect')?.addEventListener('change', updateCancellationPreview);

  const cancelForm = document.getElementById('manageCancellationForm');
  if (cancelForm) {
    cancelForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cancelSelect = document.getElementById('cancelBookingSelect');
      const reasonSelect = document.getElementById('cancelReasonSelect');
      const pnr = cancelSelect ? cancelSelect.value : '';
      if (!pnr) {
        showToast('No active booking selected to cancel.', 'coral');
        return;
      }
      if (reasonSelect && !reasonSelect.value) {
        showToast('Please select a cancellation reason.', 'coral');
        return;
      }

      const bookings = getBookings();
      const idx = bookings.findIndex((b) => b.pnr === pnr);
      if (idx !== -1) {
        const amt = bookings[idx].amount;
        bookings[idx].status = 'Cancelled';
        bookings[idx].paymentStatus = 'Refund Initiated';
        bookings[idx].refundStatus = 'Refund Initiated';
        bookings[idx].refundAmount = Math.round(amt * 0.85);
        bookings[idx].refundDate = new Date().toISOString().split('T')[0];
        bookings[idx].expectedRefundWindow = '3–5 Business Days';
        saveBookings(bookings);
        renderAllDashboardViews();
        showToast(`Booking ${pnr} cancelled. Refund of ₹${bookings[idx].refundAmount} initiated!`);
      }
    });
  }

  // Saved Passengers CRUD
  const renderSavedPassengers = () => {
    const container = document.getElementById('savedPassengersList');
    if (!container) return;
    const list = getPassengers();

    container.innerHTML = list.map((p) => `
      <div class="tilt-card">
        <span class="tilt-card__badge">${p.gender} • ${p.age} Years</span>
        <h3 class="tilt-card__title">${p.name}</h3>
        <p class="mono" style="font-size:0.9rem;">${p.contact}</p>
        <div class="tilt-card__actions" style="gap:0.5rem;">
          <button type="button" class="btn btn--outline btn--sm js-edit-pax" data-id="${p.id}">Edit</button>
          <button type="button" class="btn btn--coral btn--sm js-delete-pax" data-id="${p.id}">Delete</button>
        </div>
      </div>
    `).join('');

    initTiltCards();

    container.querySelectorAll('.js-delete-pax').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const updated = getPassengers().filter((item) => item.id !== id);
        savePassengers(updated);
        renderSavedPassengers();
        showToast('Saved passenger removed.');
      });
    });

    container.querySelectorAll('.js-edit-pax').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = getPassengers().find((x) => x.id === id);
        if (!item) return;
        document.getElementById('savedPaxId').value = item.id;
        document.getElementById('savedPaxName').value = item.name;
        document.getElementById('savedPaxAge').value = item.age;
        document.getElementById('savedPaxGender').value = item.gender;
        document.getElementById('savedPaxContact').value = item.contact;
        document.getElementById('savedPaxSubmitBtn').textContent = 'Update Passenger';
        document.getElementById('savedPassengerForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  };

  const paxForm = document.getElementById('savedPassengerForm');
  if (paxForm) {
    paxForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const idInput = document.getElementById('savedPaxId');
      const nameInput = document.getElementById('savedPaxName');
      const ageInput = document.getElementById('savedPaxAge');
      const genderInput = document.getElementById('savedPaxGender');
      const contactInput = document.getElementById('savedPaxContact');

      const name = nameInput?.value.trim() || '';
      const age = Number(ageInput?.value) || 0;
      const gender = genderInput?.value || 'Male';
      const contact = contactInput?.value.trim() || '';

      if (!name || age < 1 || !contact) {
        showToast('Please fill in valid passenger name, age, and contact number.', 'coral');
        return;
      }

      const list = getPassengers();
      if (idInput && idInput.value) {
        const idx = list.findIndex((p) => p.id === idInput.value);
        if (idx !== -1) {
          list[idx] = { id: idInput.value, name, age, gender, contact };
        }
        idInput.value = '';
        document.getElementById('savedPaxSubmitBtn').textContent = 'Add Saved Passenger';
      } else {
        list.push({
          id: `PAX-${Date.now()}`,
          name,
          age,
          gender,
          contact
        });
      }

      savePassengers(list);
      paxForm.reset();
      renderSavedPassengers();
      showToast('Passenger profile saved!');
    });
  }

  // ==========================================================================
  // DASHBOARD TABBED VIEW SWITCHER
  // Displays only the selected section and hides all other sections
  // ==========================================================================
  function switchDashboardTab(target) {
    if (!target) return;
    const cleanId = target.replace(/^#/, '');

    // Handle aliases
    let effectiveId = cleanId;
    if (cleanId === 'refund-tracking') effectiveId = 'manage-cancellations';
    if (cleanId === 'notifications-section') effectiveId = 'profile-settings';

    const panels = document.querySelectorAll('.dashboard-panel');
    let matched = false;

    panels.forEach((panel) => {
      if (panel.id === effectiveId) {
        panel.classList.add('is-active');
        panel.style.display = 'block';
        matched = true;
      } else {
        panel.classList.remove('is-active');
        panel.style.display = 'none';
      }
    });

    if (!matched && panels.length > 0) {
      panels[0].classList.add('is-active');
      panels[0].style.display = 'block';
      effectiveId = panels[0].id;
    }

    // Update active state in sidebar and mobile drawer
    document.querySelectorAll('.dashboard-sidebar__link, .mobile-drawer__link.dashboard-tab-link, [data-dash-tab]').forEach((link) => {
      const href = link.getAttribute('href') || link.getAttribute('data-dash-tab') || '';
      const linkId = href.replace(/^#/, '');
      const isActive = linkId === effectiveId;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    // Update URL hash cleanly without jarring page jumps
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', '#' + effectiveId);
    }

    // Scroll to top of main workspace on mobile/tablet viewports
    if (window.innerWidth < 1024) {
      const mainApp = document.getElementById('dashboardApp');
      if (mainApp) {
        mainApp.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // Re-initialize tilt cards and icons in new panel
    initTiltCards();
    hydrateIcons();
  }

  // Sidebar & Mobile Drawer navigation click
  document.querySelectorAll('.dashboard-sidebar__link, .mobile-drawer__link.dashboard-tab-link, [data-dash-tab]').forEach((link) => {
    const href = link.getAttribute('href') || link.getAttribute('data-dash-tab');
    if (href && href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        switchDashboardTab(href);
        // Automatically close the mobile navigation drawer if open
        const drawer = document.querySelector('.mobile-drawer');
        if (drawer && drawer.classList.contains('is-open')) {
          drawer.classList.remove('is-open');
          drawer.setAttribute('aria-hidden', 'true');
          document.querySelectorAll('.js-menu-open').forEach((b) => b.setAttribute('aria-expanded', 'false'));
          document.body.style.overflow = '';
        }
      });
    }
  });

  // In-page navigation triggers (data-dash-switch="panel-id")
  document.querySelectorAll('[data-dash-switch]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.getAttribute('data-dash-switch');
      switchDashboardTab(target);
    });
  });

  // Internal hash links inside panels
  document.querySelectorAll('.dashboard-main a[href^="#"]').forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (href && href !== '#' && document.querySelector(`.dashboard-panel${href}`)) {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        switchDashboardTab(href);
      });
    }
  });

  renderAllDashboardViews();
  renderSavedPassengers();

  // Initial tab selection from URL hash or default to overview-section
  const initialHash = window.location.hash;
  if (initialHash && document.getElementById(initialHash.replace(/^#/, ''))) {
    switchDashboardTab(initialHash);
  } else {
    switchDashboardTab('overview-section');
  }
}

document.addEventListener('DOMContentLoaded', initDashboard);

