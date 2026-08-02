/* هند بنت حسين المولد للمحاماة والاستشارات القانونية — Demo by ARO Solutions
   Vanilla only. transform/opacity animation only. Content must never be
   left stranded invisible if any of this fails. */
(function () {
  'use strict';

  window.__aroReady = true;
  var root = document.documentElement;
  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealAll() {
    var n = document.querySelectorAll('.reveal');
    for (var i = 0; i < n.length; i++) n[i].classList.add('in');
  }

  /* ---- scroll reveal ------------------------------------------------- */
  if (reduce || !('IntersectionObserver' in window)) {
    root.classList.remove('js');
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('in');
          io.unobserve(entries[i].target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    var items = document.querySelectorAll('.reveal');
    for (var i = 0; i < items.length; i++) io.observe(items[i]);

    /* last-resort safety: nothing stays hidden, whatever the observer does */
    setTimeout(revealAll, 3500);
    window.addEventListener('load', function () { setTimeout(revealAll, 1200); });
  }

  /* ---- sticky header condense ---------------------------------------- */
  var hdr = document.getElementById('hdr');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      if (hdr) hdr.classList.toggle('is-condensed', window.scrollY > 40);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu: class/attribute toggle, never the hidden attr ----- */
  var burger = document.getElementById('burger');
  var panel = document.getElementById('panel');

  function setMenu(open) {
    if (!burger || !panel) return;
    panel.setAttribute('data-open', open ? 'true' : 'false');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
  }

  if (burger && panel) {
    burger.addEventListener('click', function () {
      setMenu(panel.getAttribute('data-open') !== 'true');
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) setMenu(false);
    });
    setMenu(false);
  }
})();
