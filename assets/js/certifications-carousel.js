/* ============================================================================
   CERTIFICATIONS-CAROUSEL.JS  —  the auto-scrolling certifications strip on
   the Manufacturing Facilities page.
   ----------------------------------------------------------------------------
   You do NOT need to edit this file. Edit assets/js/certifications-data.js
   to add/remove certificates.

   BEHAVIOUR:
     - Auto-advances to the next certificate every 4 seconds.
     - Left/right on-screen arrows go back/forward.
     - Left/right ARROW KEYS on the keyboard also go back/forward.
     - Hovering the carousel (or focusing it) pauses auto-advance so people
       can actually read it; it resumes when they move away.
   ============================================================================ */
(function () {
  const mount = document.getElementById("cert-carousel");
  if (!mount) return;
  const certs = (typeof CERTIFICATIONS !== "undefined" ? CERTIFICATIONS : []);
  if (!certs.length) {
    mount.innerHTML = `<p>No certifications added yet. Add some in <code>assets/js/certifications-data.js</code>.</p>`;
    return;
  }

  const AUTO_ADVANCE_MS = 4000; // <-- change how many milliseconds between auto-advances

  mount.innerHTML = `
    <div class="cert-carousel" tabindex="0" aria-label="Certifications carousel">
      <button class="cert-carousel__arrow cert-carousel__arrow--prev" aria-label="Previous certification">&#8592;</button>
      <div class="cert-carousel__track">
        ${certs.map(c => `
          <div class="cert-carousel__slide">
            ${c.image
              ? `<img src="${c.image}" alt="${c.name}">`
              : `<div class="placeholder">PHOTO PLACEHOLDER — add image path in certifications-data.js</div>`}
            <p class="cert-carousel__name">${c.name}</p>
          </div>`).join("")}
      </div>
      <button class="cert-carousel__arrow cert-carousel__arrow--next" aria-label="Next certification">&#8594;</button>
    </div>
    <div class="cert-carousel__dots">
      ${certs.map((_, i) => `<button aria-label="Go to certification ${i + 1}"></button>`).join("")}
    </div>`;

  const track = mount.querySelector(".cert-carousel__track");
  const dots = [...mount.querySelectorAll(".cert-carousel__dots button")];
  const carousel = mount.querySelector(".cert-carousel");
  let index = 0;
  let timer = null;

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  }
  function go(delta) {
    index = (index + delta + certs.length) % certs.length;
    render();
  }
  function start() { stop(); timer = setInterval(() => go(1), AUTO_ADVANCE_MS); }
  function stop() { if (timer) clearInterval(timer); }

  mount.querySelector(".cert-carousel__arrow--prev").addEventListener("click", () => { go(-1); start(); });
  mount.querySelector(".cert-carousel__arrow--next").addEventListener("click", () => { go(1); start(); });
  dots.forEach((d, i) => d.addEventListener("click", () => { index = i; render(); start(); }));

  // Keyboard arrow-key navigation
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft")  { go(-1); start(); }
    if (e.key === "ArrowRight") { go(1);  start(); }
  });

  // Pause on hover/focus, resume on leave
  mount.addEventListener("mouseenter", stop);
  mount.addEventListener("mouseleave", start);
  carousel.addEventListener("focus", stop);
  carousel.addEventListener("blur", start);

  render();
  start();
})();
