/**
 * ============================================================================
 * ROUTEGO - 3D TILT CARD PLUGIN (Vanilla ES6+)
 * File: assets/js/plugins/tilt.js
 * Adds perspective 3D tilt, glare highlight, and depth layers to .tilt-card
 * ============================================================================
 */

export function initTiltCards() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (prefersReducedMotion || isTouchDevice) {
    return;
  }

  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach((card) => {
    if (card.dataset.tiltBound === 'true') return;
    card.dataset.tiltBound = 'true';

    let glare = card.querySelector('.tilt-card__glare');
    if (!glare) {
      glare = document.createElement('span');
      glare.className = 'tilt-card__glare';
      glare.setAttribute('aria-hidden', 'true');
      card.appendChild(glare);
    }

    const maxTilt = Number(card.dataset.tiltMax) || 7;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `perspective(950px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;

      const percentX = Math.round((x / rect.width) * 100);
      const percentY = Math.round((y / rect.height) * 100);
      glare.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 176, 32, 0.22), transparent 60%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(950px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

window.initRouteGoTilt = initTiltCards;

