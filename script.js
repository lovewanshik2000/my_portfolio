// Kamlesh Lovewanshi • Portfolio Interactions

(function () {
  const body = document.body;
  const header = document.querySelector('.header');
  const themeToggle = document.getElementById('themeToggle');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const yearEl = document.getElementById('year');
  // Create a backdrop overlay for the mobile menu
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

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

  // Ensure mobile menu is closed on load
  function ensureMenuClosed() {
    if (!mobileMenu) return;
    if (!mobileMenu.hasAttribute('hidden')) mobileMenu.setAttribute('hidden', '');
    hamburger?.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('show');
    body.classList.remove('menu-open');
  }
  ensureMenuClosed();
  // Also close when page is restored from bfcache (mobile Safari/Chrome)
  window.addEventListener('pageshow', ensureMenuClosed);

  // Header shadow when scrolled
  const onScroll = () => {
    if (!header) return;
    const y = window.scrollY;
    if (y > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
    // Compact header
    if (y > 80) header.classList.add('compact');
    else header.classList.remove('compact');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  function openMenu() {
    mobileMenu?.removeAttribute('hidden');
    hamburger?.setAttribute('aria-expanded', 'true');
    overlay.classList.add('show');
    body.classList.add('menu-open');
    document.addEventListener('keydown', onKeydown);
  }
  function closeMenu() {
    mobileMenu?.setAttribute('hidden', '');
    hamburger?.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('show');
    body.classList.remove('menu-open');
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

  // Close when clicking the overlay or clicking outside the menu
  overlay.addEventListener('click', closeMenu);
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!mobileMenu || mobileMenu.hasAttribute('hidden')) return;
    if (mobileMenu.contains(target) || hamburger?.contains(target)) return;
    closeMenu();
  });

  // Close menu if viewport resized to desktop nav
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) closeMenu();
  });

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

  // Explicit handler for footer back-to-top arrow in case target element lookup fails
  const toTop = document.querySelector('.to-top');
  toTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.pushState(null, '', '#top');
  });

  // Contact success handler (for FormSubmit redirect)
  (function handleContactSuccess() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('submitted') === '1') {
      const success = document.getElementById('contactSuccess');
      if (success) {
        success.hidden = false;
        success.classList.add('show');
      }
      const contact = document.getElementById('contact');
      if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Clean the URL
      params.delete('submitted');
      const newUrl = `${window.location.pathname}${params.toString() ? `?${params}` : ''}${window.location.hash || '#contact'}`;
      history.replaceState(null, '', newUrl);
    }
  })();

  // Reveal-on-scroll animations with staggering
  const revealTargets = [
    '.hero-text', '.hero-art', '.section', '.card', '.timeline-item', '.chips li'
  ];
  const elements = document.querySelectorAll(revealTargets.join(','));
  elements.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const target = entry.target;
        // Stagger children within common containers
        if (target.matches('.cards, .chips, .timeline')) {
          [...target.children].forEach((child, idx) => {
            child.style.transitionDelay = `${Math.min(idx * 60, 360)}ms`;
            child.classList.add('show');
          });
        } else {
          target.classList.add('show');
        }
        io.unobserve(target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

  // Observe sections and lists for staggered entry
  document.querySelectorAll('.section, .cards, .timeline, .chips').forEach((el) => io.observe(el));
  // Also observe hero
  document.querySelectorAll('.hero-text, .hero-art').forEach((el) => io.observe(el));

  // Scrollspy: highlight active nav link
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      if (!id) return;
      const link = navLinks.find((a) => a.getAttribute('href') === `#${id}`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0.05 });
  sections.forEach((sec) => spy.observe(sec));
})();
