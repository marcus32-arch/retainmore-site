/* RetainMore — the only JavaScript on the site.
   Scroll reveals, the diary's play trigger, and the calculator.
   Everything degrades: no JS means everything is simply visible,
   and the calculator section hides itself if it can't run. */

document.documentElement.classList.add('js');

/* reveal on scroll. An instant anchor jump (landing on /#calculator, or a
   browser that skips smooth scroll) can pass elements without ever
   intersecting them, so a scroll listener sweeps up anything the observer
   missed: nothing on the page may stay invisible. */
var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var revealed = Array.prototype.slice.call(document.querySelectorAll('.reveal, .reveal-l, .stagger'));
function showAll() {
  revealed.forEach(function (el) { el.classList.add('in'); });
  revealed = [];
}
if ('IntersectionObserver' in window && !reduced) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting || e.boundingClientRect.top < 0) {
        e.target.classList.add('in'); io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  revealed.forEach(function (el) { io.observe(el); });
  var sweep = function () {
    revealed = revealed.filter(function (el) {
      if (el.classList.contains('in')) return false;
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('in'); io.unobserve(el); return false;
      }
      return true;
    });
    if (!revealed.length) window.removeEventListener('scroll', sweep);
  };
  window.addEventListener('scroll', sweep, { passive: true });
  if (location.hash) sweep();
} else {
  showAll();
}

/* diary plays once, when it first becomes visible */
var diary = document.querySelector('.diary');
if (diary) {
  if ('IntersectionObserver' in window) {
    var dio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { diary.classList.add('play'); dio.disconnect(); }
      });
    }, { threshold: 0.4 });
    dio.observe(diary);
  } else {
    diary.classList.add('play');
  }
}

/* calculator: their numbers, their arithmetic, nothing leaves the page */
(function () {
  var missed = document.getElementById('calc-missed');
  var missedN = document.getElementById('calc-missed-n');
  var fee = document.getElementById('calc-fee');
  var feeN = document.getElementById('calc-fee-n');
  var outM = document.getElementById('calc-month');
  var outY = document.getElementById('calc-year');
  if (!missed || !fee || !outM) return;

  function fmt(n) {
    return '$' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  function sync(a, b) { b.value = a.value; }
  var shownM = 0;
  function calc() {
    var m = Number(missedN.value) || 0;
    var f = Number(feeN.value) || 0;
    var month = m * f;
    var fmtD = function (n) { return fmt(n); };
    lerpNumber(outM, shownM, month, 300, fmtD);
    shownM = month;
    outY.innerHTML = 'That is <b>' + fmt(month * 12) + '</b> across a year, before any of it is chased.';
  }
  [[missed, missedN], [fee, feeN]].forEach(function (pair) {
    pair[0].addEventListener('input', function () { sync(pair[0], pair[1]); calc(); });
    pair[1].addEventListener('input', function () { sync(pair[1], pair[0]); calc(); });
  });
  calc();
})();


/* the ask breathes dark: body dips to deep teal around the anchor band */
(function () {
  var band = document.querySelector('.cta-band.anchor');
  if (!band || !('IntersectionObserver' in window) || reduced) return;
  var o = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      document.body.classList.toggle('dipped', e.isIntersecting);
    });
  }, { rootMargin: '-45% 0% -45% 0%' });
  o.observe(band);
})();

/* leak artifacts play once, like the diary */
(function () {
  var leaks = document.querySelector('.leaks');
  if (!leaks) return;
  if (!('IntersectionObserver' in window)) { leaks.classList.add('play'); return; }
  var o = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { leaks.classList.add('play'); o.disconnect(); }
    });
  }, { threshold: 0.35 });
  o.observe(leaks);
})();

/* numbers move like instruments: rAF lerp, tabular digits, no jitter */
function lerpNumber(el, from, to, ms, fmt) {
  if (reduced || !window.requestAnimationFrame) { el.textContent = fmt(to); return; }
  var t0 = null;
  function tick(t) {
    if (!t0) t0 = t;
    var p = Math.min((t - t0) / ms, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(from + (to - from) * eased);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* the cited $114,827 counts up once when its stat enters */
(function () {
  var spans = document.querySelectorAll('.stat-number span');
  var target = null;
  spans.forEach(function (s) { if (s.textContent.indexOf('114,827') !== -1) target = s; });
  if (!target || !('IntersectionObserver' in window)) return;
  var fmt = function (n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
  var o = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      o.disconnect();
      lerpNumber(target, 0, 114827, 1100, fmt);
    });
  }, { threshold: 0.6 });
  o.observe(target.parentElement);
})();


/* pinned how-it-works: the artifact card changes state as steps cross the midline */
(function () {
  var visual = document.querySelector('.scrolly-visual');
  var steps = document.querySelectorAll('.scrolly-step');
  if (!visual || !steps.length || !('IntersectionObserver' in window)) return;
  visual.setAttribute('data-state', '1');
  var so = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var n = e.target.getAttribute('data-step');
      visual.setAttribute('data-state', n);
      steps.forEach(function (s) { s.classList.toggle('is-active', s === e.target); });
    });
  }, { rootMargin: '-45% 0% -45% 0%' });
  steps.forEach(function (s) { so.observe(s); });
})();
