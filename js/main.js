/* Vodovod Novak – demo | vanilla JS */
(function () {
  'use strict';

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Odpri meni' : 'Zapri meni');
      nav.classList.toggle('open', !open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Odpri meni');
        nav.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        toggle.click();
        toggle.focus();
      }
    });
  }

  // Header shadow on scroll
  var header = document.querySelector('.site-header');
  var callBar = document.querySelector('.mobile-call');
  var onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
    if (callBar) callBar.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // FAQ accordion
  document.querySelectorAll('.acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
    });
  });

  // Contact form (front-end only – connect to a backend or Formspree to send)
  var form = document.getElementById('contact-form');
  var thanks = document.getElementById('thanks');
  if (form) {
    var rules = {
      ime: function (v) { return v.trim().length >= 2 || 'Prosimo, vpišite svoje ime.'; },
      telefon: function (v) { return /^[+\d][\d\s\/-]{6,}$/.test(v.trim()) || 'Prosimo, vpišite veljavno telefonsko številko.'; },
      sporocilo: function (v) { return v.trim().length >= 5 || 'Prosimo, na kratko opišite težavo.'; }
    };
    var validate = function (name) {
      var input = form.elements[name];
      var res = rules[name](input.value);
      var field = input.closest('.field');
      var err = document.getElementById(name + '-err');
      var ok = res === true;
      field.classList.toggle('invalid', !ok);
      input.setAttribute('aria-invalid', String(!ok));
      if (ok) { input.removeAttribute('aria-describedby'); } else { input.setAttribute('aria-describedby', name + '-err'); }
      err.textContent = ok ? '' : res;
      return ok;
    };
    Object.keys(rules).forEach(function (name) {
      form.elements[name].addEventListener('blur', function () { validate(name); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      Object.keys(rules).forEach(function (name) {
        if (!validate(name) && !firstInvalid) firstInvalid = form.elements[name];
      });
      if (firstInvalid) { firstInvalid.focus(); return; }
      // TODO: tu pošljite podatke na zaledje, npr. fetch('https://formspree.io/f/VAS_ID', { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      form.hidden = true;
      thanks.hidden = false;
      thanks.focus();
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll('.card, .why-item, .gallery-item, .acc-item');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  // Year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
