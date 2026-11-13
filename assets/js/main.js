/**
 * ============================================================================
 * ROUTEGO - CORE APPLICATION CONTROLLER (Vanilla ES6+)
 * File: assets/js/main.js
 * ============================================================================
 */

import { initTiltCards } from './plugins/tilt.js';

/**
 * Hydrate all [data-icon] placeholders with inline SVGs from window.ROUTEGO_ICONS
 */
export function hydrateIcons() {
  const icons = window.ROUTEGO_ICONS || {};
  document.querySelectorAll('[data-icon]').forEach((el) => {
    const name = el.getAttribute('data-icon');
    if (icons[name] && !el.dataset.iconHydrated) {
      el.innerHTML = icons[name];
      el.dataset.iconHydrated = 'true';
    }
  });
}

/**
 * Animate top page-load bus-driving progress bar
 */
function initBusProgressBar() {
  // Disabled: Progress bar removed per user request
}

/**
 * Ensure Mobile Drawer contains the 3 quick action controls (Theme, RTL, Login)
 */
function ensureMobileDrawerActions() {
  const drawer = document.querySelector('.mobile-drawer');
  if (!drawer) return;

  if (!drawer.querySelector('.mobile-drawer__actions')) {
    const isInPages = document.querySelector('link[href*="../assets/"]') !== null;
    const loginHref = isInPages ? 'login.html' : 'pages/login.html';

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'mobile-drawer__actions';
    actionsDiv.innerHTML = `
      <div class="mobile-drawer__toggles">
        <button type="button" class="icon-btn js-theme-toggle" aria-label="Switch to Light Mode" title="Switch to Light Mode">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        </button>
        <button type="button" class="icon-btn js-rtl-toggle" aria-label="Toggle RTL Direction" title="Toggle RTL Direction">RTL</button>
      </div>
      <a href="${loginHref}" class="btn btn--primary btn--sm mobile-drawer__login">Login</a>
    `;

    const header = drawer.querySelector('.mobile-drawer__header');
    if (header && header.nextSibling) {
      drawer.insertBefore(actionsDiv, header.nextSibling);
    } else {
      drawer.prepend(actionsDiv);
    }
  }
}

/**
 * Dark / Light Theme Controller with System Preference Detection
 * TODO: Customize default theme token in localStorage key 'routego_theme'
 */
function initThemeController() {
  const savedTheme = localStorage.getItem('routego_theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('routego_theme', theme);
    document.querySelectorAll('.js-theme-toggle').forEach((btn) => {
      const label = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
      btn.innerHTML = (window.ROUTEGO_ICONS && (theme === 'dark' ? window.ROUTEGO_ICONS.sun : window.ROUTEGO_ICONS.moon)) || 'Theme';
    });
  };

  applyTheme(initialTheme);

  document.querySelectorAll('.js-theme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });
}

/**
 * RTL / LTR Direction Controller
 */
function initDirectionController() {
  const savedDir = localStorage.getItem('routego_dir') || 'ltr';

  const applyDir = (dir) => {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('routego_dir', dir);
    document.querySelectorAll('.js-rtl-toggle').forEach((btn) => {
      btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout');
    });
  };

  applyDir(savedDir);

  document.querySelectorAll('.js-rtl-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      applyDir(current === 'ltr' ? 'rtl' : 'ltr');
    });
  });
}

/**
 * Mobile Navigation Drawer & Sticky Header / Mini Booking Bar
 */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const stickyBar = document.querySelector('.sticky-booking-bar');
  const drawer = document.querySelector('.mobile-drawer');
  const openBtns = document.querySelectorAll('.js-menu-open');
  const closeBtns = document.querySelectorAll('.js-menu-close');

  openBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!drawer) return;
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    openBtns.forEach((b) => b.setAttribute('aria-expanded', 'false'));
    document.body.style.overflow = '';
  };

  closeBtns.forEach((btn) => btn.addEventListener('click', closeDrawer));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 24);
    }
    if (stickyBar) {
      stickyBar.classList.toggle('is-visible', y > 580);
    }
  }, { passive: true });
}

/**
 * Scroll Reveal, Animated Counters & Hero Parallax
 */
function initScrollEffects() {
  document.documentElement.classList.add('js-enabled');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-revealed'));
  }

  // Animated Number Count-Up
  const counters = document.querySelectorAll('.js-counter');
  if ('IntersectionObserver' in window && !prefersReduced) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.target) || 0;
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 1300;
        const start = performance.now();

        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          el.textContent = `${prefix}${current.toLocaleString('en-IN')}${suffix}`;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = `${prefix}${target.toLocaleString('en-IN')}${suffix}`;
          }
        };
        requestAnimationFrame(step);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.25 });
    counters.forEach((c) => countObserver.observe(c));
  }

  // Subtle Parallax on Hero Images (Desktop & Tablet)
  const parallaxImgs = document.querySelectorAll('.js-parallax');
  if (parallaxImgs.length > 0 && !prefersReduced) {
    window.addEventListener('scroll', () => {
      if (window.innerWidth <= 768) return; // Keep hero background stable and aligned on mobile touch viewports
      const scrolled = window.scrollY;
      if (scrolled > 900) return;
      parallaxImgs.forEach((img) => {
        img.style.transform = `scale(1.06) translateY(${(scrolled * 0.16).toFixed(1)}px)`;
      });
    }, { passive: true });
  }
}

/**
 * Accordion Controller for FAQs
 */
function initAccordions() {
  document.querySelectorAll('.accordion__trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      if (!item) return;
      const isOpen = item.classList.contains('is-open');
      const parent = item.closest('.accordion');
      if (parent) {
        parent.querySelectorAll('.accordion__item').forEach((sibling) => {
          sibling.classList.remove('is-open');
          const btn = sibling.querySelector('.accordion__trigger');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      }
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Helper to resolve relative path to pages/ directory from root or pages/
 */
export function resolvePageUrl(pageFilename) {
  const isInsidePages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
  if (pageFilename === 'index.html') {
    return isInsidePages ? '../index.html' : 'index.html';
  }
  return isInsidePages ? pageFilename : `pages/${pageFilename}`;
}

/**
 * Toast Notification Banner
 */
export function showToast(message, type = 'teal') {
  let toast = document.getElementById('routegoToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'routegoToast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.style.cssText = 'position:fixed;inset-block-end:24px;inset-inline-end:24px;z-index:9999;padding:14px 22px;border-radius:12px;font-weight:700;font-size:0.92rem;box-shadow:0 16px 40px rgba(0,0,0,0.5);transition:transform 0.3s ease,opacity 0.3s ease;';
    document.body.appendChild(toast);
  }
  toast.style.background = type === 'coral' ? '#FF5C4D' : '#19D3B5';
  toast.style.color = '#0A0F24';
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(16px)';
  }, 3600);
}

/**
 * Bus Search Forms, Swap Locations, Route Quick Links & Promo Buttons
 */
function initSearchAndRouteActions() {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const savedSearch = JSON.parse(localStorage.getItem('routego_search') || 'null');

  document.querySelectorAll('input[type="date"][name="journeyDate"]').forEach((input) => {
    input.min = new Date().toISOString().split('T')[0];
    if (!input.value) {
      input.value = (savedSearch && savedSearch.journeyDate) ? savedSearch.journeyDate : tomorrow;
    }
  });

  // Pre-fill saved search if available
  document.querySelectorAll('.js-bus-search-form').forEach((form) => {
    const fromInput = form.querySelector('[name="fromCity"]');
    const toInput = form.querySelector('[name="toCity"]');
    const paxInput = form.querySelector('[name="passengers"]');

    if (savedSearch) {
      if (fromInput && savedSearch.from) fromInput.value = savedSearch.from;
      if (toInput && savedSearch.to) toInput.value = savedSearch.to;
      if (paxInput && savedSearch.passengers) paxInput.value = savedSearch.passengers;
    }

    // Swap Locations Button
    const swapBtn = form.querySelector('.js-swap-cities');
    if (swapBtn && fromInput && toInput) {
      swapBtn.addEventListener('click', () => {
        const temp = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = temp;
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const fromVal = fromInput ? fromInput.value.trim() : 'Chennai';
      const toVal = toInput ? toInput.value.trim() : 'Bangalore';
      const dateInput = form.querySelector('[name="journeyDate"]');
      const returnInput = form.querySelector('[name="returnDate"]');
      const dateVal = dateInput ? dateInput.value : tomorrow;
      const paxVal = paxInput ? Number(paxInput.value) || 1 : 1;

      // Clear previous error states
      form.querySelectorAll('.form-group').forEach((g) => g.classList.remove('has-error'));
      form.querySelectorAll('.form-control').forEach((c) => c.classList.remove('is-invalid'));

      if (!fromVal) {
        valid = false;
        if (fromInput) {
          fromInput.classList.add('is-invalid');
          fromInput.closest('.form-group')?.classList.add('has-error');
        }
      }

      if (!toVal || toVal.toLowerCase() === fromVal.toLowerCase()) {
        valid = false;
        if (toInput) {
          toInput.classList.add('is-invalid');
          const grp = toInput.closest('.form-group');
          if (grp) {
            grp.classList.add('has-error');
            const err = grp.querySelector('.form-error');
            if (err) err.textContent = 'Destination must be different from departure city.';
          }
        }
      }

      if (!dateVal) {
        valid = false;
        if (dateInput) {
          dateInput.classList.add('is-invalid');
          dateInput.closest('.form-group')?.classList.add('has-error');
        }
      }

      if (!valid) return;

      const searchPayload = {
        from: fromVal,
        to: toVal,
        journeyDate: dateVal,
        returnDate: returnInput ? returnInput.value : '',
        passengers: paxVal
      };
      localStorage.setItem('routego_search', JSON.stringify(searchPayload));
      window.location.href = resolvePageUrl('search-results.html');
    });
  });

  // Suggestion Pills inside Search Panel
  document.querySelectorAll('.js-route-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      const from = pill.dataset.from;
      const to = pill.dataset.to;
      const form = pill.closest('form') || document.querySelector('.js-bus-search-form');
      if (form && from && to) {
        const fromEl = form.querySelector('[name="fromCity"]');
        const toEl = form.querySelector('[name="toCity"]');
        if (fromEl) fromEl.value = from;
        if (toEl) toEl.value = to;
      }
    });
  });

  // Route Cards CTA buttons ([data-route-from][data-route-to])
  document.querySelectorAll('[data-route-from][data-route-to]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const from = btn.getAttribute('data-route-from');
      const to = btn.getAttribute('data-route-to');
      localStorage.setItem('routego_search', JSON.stringify({
        from,
        to,
        journeyDate: tomorrow,
        returnDate: '',
        passengers: 1
      }));
      window.location.href = resolvePageUrl('search-results.html');
    });
  });

  // Promo Offer Claim / Apply Buttons ([data-promo-code])
  document.querySelectorAll('[data-promo-code]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const code = btn.getAttribute('data-promo-code');
      if (!code) return;
      sessionStorage.setItem('routego_active_promo', code);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).catch(() => {});
      }
      showToast(`Promo code ${code} activated! It will be auto-applied at checkout.`);
      if (btn.getAttribute('href') === '#redeem' || btn.tagName === 'BUTTON') {
        e.preventDefault();
      }
    });
  });
}

/**
 * Live Countdown Timers for Limited-Time Deals
 */
function initCountdowns() {
  const timers = document.querySelectorAll('.js-countdown');
  if (timers.length === 0) return;

  const updateTimers = () => {
    const now = Date.now();
    timers.forEach((el) => {
      const hoursOffset = Number(el.dataset.hours) || 18;
      if (!el.dataset.deadline) {
        el.dataset.deadline = String(now + hoursOffset * 3600 * 1000);
      }
      const diff = Math.max(0, Number(el.dataset.deadline) - Date.now());
      const hrs = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const mins = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const secs = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      el.textContent = `${hrs}h : ${mins}m : ${secs}s`;
    });
  };

  updateTimers();
  setInterval(updateTimers, 1000);
}

/**
 * Generic Validated Forms (Newsletter, Contact, Help Support, Coming Soon, Auth)
 * TODO: Connect Formspree / Mailchimp / Auth API endpoints in production
 */
function initValidatedForms() {
  document.querySelectorAll('.js-validated-form').forEach((form) => {
    form.querySelectorAll('[required]').forEach((field) => {
      const clearErr = () => {
        field.classList.remove('is-invalid');
        const g = field.closest('.form-group, .auth-field');
        if (g) g.classList.remove('has-error');
      };
      field.addEventListener('input', clearErr);
      field.addEventListener('change', clearErr);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      form.querySelectorAll('[required]').forEach((field) => {
        const grp = field.closest('.form-group, .auth-field');
        const val = field.type === 'checkbox' ? field.checked : field.value.trim();
        let fieldValid = Boolean(val);

        if (field.type === 'email' && val) {
          fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        }
        if (field.dataset.minLength && val) {
          fieldValid = field.value.trim().length >= Number(field.dataset.minLength);
        }
        if (field.name === 'confirmPassword') {
          const pwd = form.querySelector('[name="password"], [name="newPassword"]');
          if (pwd && pwd.value !== field.value) fieldValid = false;
        }

        field.classList.toggle('is-invalid', !fieldValid);
        if (grp) grp.classList.toggle('has-error', !fieldValid);
        if (!fieldValid) isValid = false;
      });

      if (!isValid) return;

      const successMsg = form.dataset.successMessage || 'Submitted successfully! Thank you.';
      showToast(successMsg);

      const feedbackBox = form.querySelector('.js-form-feedback');
      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.textContent = successMsg;
      }

      if (form.dataset.redirect) {
        setTimeout(() => {
          window.location.href = resolvePageUrl(form.dataset.redirect);
        }, 900);
      } else {
        form.reset();
      }
    });
  });

  // Password Show/Hide Toggles on Login/Register page
  document.querySelectorAll('.js-toggle-password').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPwd = input.type === 'password';
      input.type = isPwd ? 'text' : 'password';
      btn.textContent = isPwd ? 'Hide' : 'Show';
    });
  });

  // Modern Eye Icon Password Visibility Toggles
  document.querySelectorAll('.js-toggle-pwd').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPwd = input.type === 'password';
      input.type = isPwd ? 'text' : 'password';
      const openIcon = btn.querySelector('.eye-open');
      const closedIcon = btn.querySelector('.eye-closed');
      if (openIcon && closedIcon) {
        openIcon.style.display = isPwd ? 'none' : 'block';
        closedIcon.style.display = isPwd ? 'block' : 'none';
      }
    });
  });

  // Auth View Switcher (Login <-> Register <-> Recovery)
  function switchAuthView(target) {
    if (!target) return;
    document.querySelectorAll('[data-auth-panel]').forEach((panel) => {
      const matches = panel.getAttribute('data-auth-panel') === target;
      panel.style.display = matches ? 'block' : 'none';
      if (matches) {
        panel.classList.remove('auth-fade-in');
        void panel.offsetWidth;
        panel.classList.add('auth-fade-in');
      }
    });
    document.querySelectorAll('.auth-tab-btn').forEach((b) => {
      b.classList.toggle('btn--primary', b.getAttribute('data-auth-tab') === target);
      b.classList.toggle('btn--outline', b.getAttribute('data-auth-tab') !== target);
    });
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', '#' + target);
    }
  }

  document.querySelectorAll('[data-auth-tab], [data-auth-switch]').forEach((tabBtn) => {
    tabBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = tabBtn.getAttribute('data-auth-tab') || tabBtn.getAttribute('data-auth-switch');
      switchAuthView(target);
    });
  });

  // Open appropriate auth view based on URL hash (e.g. login.html#register)
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.querySelector(`[data-auth-panel="${initialHash}"]`)) {
    switchAuthView(initialHash);
  }
}

/**
 * Initialize bookings store in localStorage if not present
 */
export function ensureBookingStore() {
  if (!localStorage.getItem('routego_bookings') && window.ROUTEGO_DATA) {
    localStorage.setItem('routego_bookings', JSON.stringify(window.ROUTEGO_DATA.defaultBookings));
  }
  if (!localStorage.getItem('routego_passengers') && window.ROUTEGO_DATA) {
    localStorage.setItem('routego_passengers', JSON.stringify(window.ROUTEGO_DATA.defaultSavedPassengers));
  }
}

/**
 * Scroll to Top (Back to Top) Button Controller
 * Automatically attaches or injects the button on all pages
 */
export function initScrollToTop() {
  let btn = document.querySelector('.js-scroll-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'scroll-top-btn js-scroll-top';
    btn.setAttribute('aria-label', 'Scroll to top of page');
    btn.setAttribute('title', 'Scroll to top');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 19V5"/>
        <path d="m5 12 7-7 7 7"/>
      </svg>
    `;
    document.body.appendChild(btn);
  }

  let ticking = false;
  const toggleVisibility = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 280) {
          btn.classList.add('is-visible');
        } else {
          btn.classList.remove('is-visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  ensureBookingStore();
  ensureMobileDrawerActions();
  hydrateIcons();
  initBusProgressBar();
  initThemeController();
  initDirectionController();
  initNavigation();
  initScrollEffects();
  initTiltCards();
  initAccordions();
  initSearchAndRouteActions();
  initCountdowns();
  initValidatedForms();
  initScrollToTop();
});

