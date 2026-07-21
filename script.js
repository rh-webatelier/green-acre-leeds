// Green Acre Tree David Langhan & Sons Roofing Landscaping — nav toggle, sticky header, scroll reveal
(function () {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  const header = document.getElementById('site-header');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('nav--open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // sticky header background after scrolling past the top of the hero
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-stuck', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
    // Above-the-fold hero content should never sit hidden waiting on the observer
    document.querySelectorAll('.hero .reveal').forEach((el) => el.classList.add('is-visible'));
    // Safety net: if anything is still hidden shortly after load, reveal it
    window.addEventListener('load', () => {
      setTimeout(() => revealEls.forEach((el) => el.classList.add('is-visible')), 1200);
    });
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();

// Gallery "See more / Show less" expander — progressive enhancement, ignores galleries without overflow
(function () {
  document.querySelectorAll('[data-gallery-toggle]').forEach(function (btn) {
    var block = btn.closest('.gallery-block');
    if (!block) return;
    var wrap = block.querySelector('[data-gallery-more]');
    if (!wrap) return;
    block.classList.add('is-collapsed');
    btn.hidden = false;
    var items = wrap.querySelectorAll('.gallery__item');
    items.forEach(function (el) { el.classList.add('reveal'); });
    var MORE = btn.getAttribute('data-label-more') || 'See more photos';
    var LESS = btn.getAttribute('data-label-less') || 'Show fewer photos';
    btn.addEventListener('click', function () {
      var collapsed = block.classList.toggle('is-collapsed');
      btn.setAttribute('aria-expanded', String(!collapsed));
      btn.textContent = collapsed ? MORE : LESS;
      if (!collapsed) {
        items.forEach(function (el, i) { el.style.transitionDelay = (i * 55) + 'ms'; el.classList.add('is-visible'); });
      } else {
        items.forEach(function (el) { el.classList.remove('is-visible'); el.style.transitionDelay = ''; });
        btn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        btn.focus();
      }
    });
  });
})();
