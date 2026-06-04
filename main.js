/* ═══════════════════════════════════════════
   SOLOMON J — PORTFOLIO JAVASCRIPT
   main.js
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── SCROLL REVEAL ──────────────────────────────────────────
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));


  // ── ACTIVE NAV LINK ON SCROLL ──────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.style.color = 'var(--gold)';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => navObserver.observe(section));


  // ── SMOOTH NAV CLICK ───────────────────────────────────────
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ── CLIENT CARD HOVER EFFECT ───────────────────────────────
  document.querySelectorAll('.client-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--gold)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
    });
  });


  // ── METRIC COUNTER ANIMATION ───────────────────────────────
  const metricNums = document.querySelectorAll('.metric-num, .num-figure');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  metricNums.forEach((num) => counterObserver.observe(num));

  function animateCounter(el) {
    const text = el.textContent.trim();
    const match = text.match(/^(\d+)/);
    if (!match) return;

    const target = parseInt(match[1]);
    const suffix = text.replace(match[1], '');
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      el.textContent = current + suffix;
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
  }


  // ── SCROLL TO TOP ON LOGO CLICK ────────────────────────────
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ── MOBILE NAV TOGGLE ──────────────────────────────────────
  const nav = document.querySelector('nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksEl = document.querySelector('.nav-links');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksEl.classList.toggle('mobile-open');
    });
  }


  // ── PRINT RESUME BUTTON ────────────────────────────────────
  const printResumeBtn = document.getElementById('print-resume-btn');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

});

