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
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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


  // ── RESUME SLIDER PAGINATION ───────────────────────────────
  const resumeImages = [
    'assests/Solomon_J_CV_1.png',
    'assests/Solomon_J_CV_2.png',
    'assests/Solomon_J_CV_3.png'
  ];
  let currentResumePage = 1;
  const totalResumePages = resumeImages.length;

  const resumeImgEl = document.getElementById('resume-image');
  const btnPrev = document.getElementById('resume-prev');
  const btnNext = document.getElementById('resume-next');
  const pageIndicator = document.getElementById('resume-page-indicator');

  // Preload remaining resume pages for zero-delay switching
  const preloadedImages = [];
  for (let i = 1; i < totalResumePages; i++) {
    const img = new Image();
    img.src = resumeImages[i];
    preloadedImages.push(img);
  }

  const overlayEl = document.getElementById('resume-links-overlay');

  function updateResumeView() {
    if (!resumeImgEl) return;
    
    // Add brief fade-out effect for a premium feel
    resumeImgEl.style.opacity = '0';
    if (overlayEl) overlayEl.style.opacity = '0';
    
    setTimeout(() => {
      resumeImgEl.src = resumeImages[currentResumePage - 1];
      resumeImgEl.alt = `Solomon J Resume - Page ${currentResumePage}`;
      pageIndicator.textContent = `Page ${currentResumePage} of ${totalResumePages}`;
      
      // Update buttons state
      btnPrev.disabled = currentResumePage === 1;
      btnNext.disabled = currentResumePage === totalResumePages;
      
      // Toggle overlay display and opacity
      if (overlayEl) {
        if (currentResumePage === 1) {
          overlayEl.style.display = 'block';
          setTimeout(() => { overlayEl.style.opacity = '1'; }, 50);
        } else {
          overlayEl.style.display = 'none';
        }
      }
      
      // Fade back in
      resumeImgEl.style.opacity = '1';
    }, 200);
  }

  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
      if (currentResumePage > 1) {
        currentResumePage--;
        updateResumeView();
      }
    });

    btnNext.addEventListener('click', () => {
      if (currentResumePage < totalResumePages) {
        currentResumePage++;
        updateResumeView();
      }
    });
  }


});


