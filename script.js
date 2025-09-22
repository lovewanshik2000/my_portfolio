// Kamlesh Lovewanshi • Portfolio Interactions

(function () {
  const body = document.body;
  const header = document.querySelector('.header');
  const themeToggle = document.getElementById('themeToggle');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const yearEl = document.getElementById('year');

  // Set current year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Theme: respect saved preference or system
  const savedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
    body.classList.add('light');
  }

  function toggleTheme() {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }

  themeToggle?.addEventListener('click', toggleTheme);

  // Header shadow when scrolled
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  function openMenu() {
    mobileMenu?.removeAttribute('hidden');
    hamburger?.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', onKeydown);
  }
  function closeMenu() {
    mobileMenu?.setAttribute('hidden', '');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKeydown);
  }
  function toggleMenu() {
    if (!mobileMenu) return;
    const isHidden = mobileMenu.hasAttribute('hidden');
    if (isHidden) openMenu();
    else closeMenu();
  }
  function onKeydown(e) {
    if (e.key === 'Escape') closeMenu();
  }

  hamburger?.addEventListener('click', toggleMenu);

  // Close mobile menu when clicking a link
  mobileMenu?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => closeMenu());
  });

  // Smooth scroll for internal links (enhanced behavior)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', href);
      }
    });
  });

  // Reveal-on-scroll animation using IntersectionObserver
  const revealTargets = [
    '.hero-text', '.hero-art', '.section', '.card', '.timeline-item'
  ];
  const elements = document.querySelectorAll(revealTargets.join(','));
  elements.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

  elements.forEach((el) => io.observe(el));
})();
