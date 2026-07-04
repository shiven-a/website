/* ============================================================================
   STATS-COUNTER.JS  —  animates the "demographics" numbers on the home page.
   ----------------------------------------------------------------------------
   You do NOT need to edit this file. To change what's shown, edit the
   .stat blocks directly in index.html:
     <div class="stat" data-target="24" data-suffix="+">
       <h2 class="stat__num" data-count>0</h2><p>Countries served</p>
     </div>
   - data-target  = the final number to count up to
   - data-suffix  = anything to show after the number, e.g. "+" or "%" (optional)
   Each block counts up from 0 the first time it scrolls into view, over a
   fixed duration set below.
   ============================================================================ */
(function () {
  const DURATION_MS = 1800; // <-- change this to speed up/slow down the count-up

  const stats = document.querySelectorAll(".stat[data-target]");
  if (!stats.length) return;

  function animate(el) {
    const target = parseFloat(el.getAttribute("data-target")) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const numEl = el.querySelector("[data-count]");
    if (!numEl) return;

    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      // ease-out so it settles smoothly rather than stopping abruptly
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      numEl.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    stats.forEach(el => observer.observe(el));
  } else {
    // Fallback for very old browsers: just animate immediately.
    stats.forEach(animate);
  }
})();
