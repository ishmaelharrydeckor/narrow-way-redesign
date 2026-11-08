// Hero slideshow: crossfade every 5s, dots show progress
(function () {
  const slides = [...document.querySelectorAll('.hero-slide')];
  const dots = [...document.querySelectorAll('.hero-dots button')];
  let i = 0, timer;
  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
    dots.forEach((d, k) => {
      d.classList.remove('is-active');
      if (k === i) { void d.offsetWidth; d.classList.add('is-active'); }
    });
  }
  function start() { clearInterval(timer); timer = setInterval(() => show(i + 1), 5000); }
  dots.forEach((d, k) => d.addEventListener('click', () => { show(k); start(); }));
  start();
})();

// Scroll reveal
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  els.forEach((e, k) => { e.style.transitionDelay = (k % 3) * 80 + 'ms'; io.observe(e); });
})();

// Banner parallax
(function () {
  const img = document.querySelector('.parallax');
  if (!img || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const banner = img.parentElement;
  function tick() {
    const r = banner.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
    img.style.transform = 'translateY(' + (p * -40).toFixed(1) + 'px)';
  }
  addEventListener('scroll', tick, { passive: true });
  tick();
})();

// Mobile menu
(function () {
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', () => nav.classList.remove('is-open'));
})();
