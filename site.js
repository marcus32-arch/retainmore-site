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
  function calc() {
    var m = Number(missedN.value) || 0;
    var f = Number(feeN.value) || 0;
    var month = m * f;
    outM.textContent = fmt(month);
    outY.innerHTML = 'That is <b>' + fmt(month * 12) + '</b> across a year, before any of it is chased.';
  }
  [[missed, missedN], [fee, feeN]].forEach(function (pair) {
    pair[0].addEventListener('input', function () { sync(pair[0], pair[1]); calc(); });
    pair[1].addEventListener('input', function () { sync(pair[1], pair[0]); calc(); });
  });
  calc();
})();
