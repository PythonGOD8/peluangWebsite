// Header shrink on scroll
(function headerShrink(){
  const header = document.querySelector('.site-header');
  function toggle() {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
})();

// Reveal on scroll
(function revealOnScroll(){
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // reveal once
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
  items.forEach(el => obs.observe(el));
})();

// Mobile menu toggle with slide animation + a11y + close behaviors
(function mobileMenu(){
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const links = nav ? nav.querySelectorAll('a') : [];

  if (!toggle || !nav) return;

  function setOpen(isOpen) {
    nav.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.textContent = isOpen ? '✕' : '☰';
  }

  // Toggle on click
  toggle.addEventListener('click', () => {
    const willOpen = !nav.classList.contains('open');
    setOpen(willOpen);
  });

  // Close when clicking a nav link
  links.forEach(a => a.addEventListener('click', () => setOpen(false)));

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('open')) return;
    const withinNav = nav.contains(e.target);
    const onToggle = toggle.contains(e.target);
    if (!withinNav && !onToggle) setOpen(false);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();
