/* ============================================================================
   SITE.JS  —  shared behaviour for every page
   ----------------------------------------------------------------------------
   This builds the HEADER (logo + menu), the FOOTER (with the contact form),
   the SOCIAL SIDEBAR (LinkedIn/WhatsApp), the LOGO WATERMARK, and the optional
   PAGE BACKGROUND — and injects all of it into every page automatically.
   That means you only edit the menu / footer / socials / logo ONCE, right
   here, instead of in every file.

   WHAT YOU CAN SAFELY EDIT IN THIS FILE:
     • COMPANY  -> your company name, tagline, logo path, contact details
     • SOCIAL   -> your real LinkedIn and WhatsApp links
     • NAV      -> the top menu items / product dropdown
     • FORM_ENDPOINT -> where contact submissions are sent (see big note below)
   ============================================================================ */

/* ---------- 1. YOUR COMPANY DETAILS (edit these) ---------- */
const COMPANY = {
  name: "JMViva",                          // your company name
  tagline: "Trust, Tradition, Technology", // your slogan, shown under the logo
  // Path to your logo image (your uploaded logo.svg is already here).
  logo: "assets/images/logo.svg",
  // The logo is transparent (no background box), so it's reused as-is for the
  // faint page watermark too.
  watermarkLogo: "assets/images/logo.svg",
  email: "info@yourcompany.com",    // <-- REPLACE with your real email
  phone: "+00 000 000 0000",        // <-- REPLACE with your real phone number
  // Used ONLY as a fallback if the logo image ever fails to load (1-3 letters).
  monogram: "JMViva"
};

/* ---------- 1b. SOCIAL LINKS (fixed icons on the right of every page) ---------- */
const SOCIAL = {
  linkedin: "https://www.linkedin.com/company/YOUR-COMPANY",  // <-- REPLACE with your LinkedIn page URL
  whatsapp: "https://wa.me/00000000000"                       // <-- REPLACE 00000000000 with your WhatsApp number, country code first, no + or spaces
};

/* ============================================================================
   2. CONTACT FORM DESTINATION  (IMPORTANT — read this)
   ----------------------------------------------------------------------------
   A plain website (HTML/CSS/JS) CANNOT save emails by itself — saving data
   needs a server. The easiest no-code way to actually RECEIVE and STORE the
   name / email / query is a free form service. Recommended: Formspree.

   STEPS (5 minutes, no coding):
     1. Go to https://formspree.io and create a free account.
     2. Create a new form — it gives you an endpoint like:
            https://formspree.io/f/abcdwxyz
     3. Paste that URL between the quotes below.
   Every submission (every form on the site — footer, buyer enquiry, and
   representative enquiry all use this ONE endpoint) is then emailed to you
   AND stored in your Formspree dashboard, exportable as a spreadsheet of
   names/emails/queries.

   Alternatives that work the same way: Netlify Forms, Getform, Web3Forms.
   If you leave this as "" the form will still work as a DEMO and save entries
   in the visitor's own browser only (not useful for you) — so set this
   before going live.
   ============================================================================ */
const FORM_ENDPOINT = ""; // <-- PASTE your Formspree (or similar) URL here

/* ---------- 3. TOP NAVIGATION (edit menu items here) ---------- */
const NAV = [
  { label: "Home",          href: "index.html" },
  { label: "Core Values",   href: "core-values.html" },
  { label: "Global Reach",  href: "global-reach.html" },
  {
    // Products dropdown shows ONLY the 3 overarching categories.
    // The subcategories live on each category page (not in the menu).
    label: "Products", href: "products.html", dropdown: [
      { label: "Textiles",    href: "textiles.html" },
      { label: "Agriculture", href: "agriculture.html" },
      { label: "Medical",     href: "medical.html" },
    ]
  },
  { label: "Manufacturing Facilities", href: "manufacturing-facilities.html" },
  { label: "News & Blog", href: "news.html" },
  { label: "Contact Us",  href: "contact.html" },
];

/* ============================================================================
   ====  You normally do NOT need to edit anything below this line.  ==========
   ============================================================================ */

/* ---------- HEADER ---------- */
function buildHeader() {
  const current = location.pathname.split("/").pop() || "index.html";

  const links = NAV.map(item => {
    const active = item.href.split("#")[0] === current ? "is-active" : "";
    if (item.dropdown) {
      const menu = item.dropdown.map(d =>
        `<a href="${d.href}">${d.label}</a>`).join("");
      return `<li class="has-dropdown">
        <a href="${item.href}" class="${active}" aria-haspopup="true">${item.label} ▾</a>
        <div class="dropdown">${menu}</div>
      </li>`;
    }
    return `<li><a href="${item.href}" class="${active}">${item.label}</a></li>`;
  }).join("");

  // Your logo image already contains the "JMViva" wordmark, so we show the logo
  // and the slogan beside it. The text name is kept for screen readers and as a
  // fallback if the image ever fails to load (see brandFallback below).
  const logoImg = COMPANY.logo
    ? `<img class="brand__logo" src="${COMPANY.logo}" alt="${COMPANY.name} logo"
         onerror="this.style.display='none';this.closest('.brand').classList.add('brand--nologo')">`
    : "";

  return `
  <header class="site-header">
    <div class="container nav" id="nav">
      <a class="brand" href="index.html">
        ${logoImg}
        <span class="brand__text">
          <span class="brand__name">${COMPANY.name}</span>
          <span class="brand__tag">${COMPANY.tagline}</span>
        </span>
      </a>
      <button class="nav__toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav__links">${links}</ul>
    </div>
  </header>`;
}

/* ---------- FOOTER (includes the contact form on every page) ---------- */
function buildFooter() {
  return `
  <footer class="site-footer">
    <!-- CONTACT FORM — appears at the bottom of every page -->
    <section class="footer-contact section">
      <div class="container grid2">
        <div>
          <p class="eyebrow">Get in touch</p>
          <h2>Let's talk business.</h2>
          <p>Send us a message and our team will respond within two business days.
             For detailed enquiries, visit our <a href="contact.html">Contact page</a>.</p>
          <p style="font-family:var(--font-mono);font-size:.85rem;margin-top:1.5rem">
            ${COMPANY.email}<br>${COMPANY.phone}
          </p>
        </div>
        <div>
          <form class="form js-contact-form" novalidate>
            <input type="hidden" name="_subject" value="New footer enquiry from website">
            <div class="row">
              <div class="field">
                <label for="f-name">Name</label>
                <input id="f-name" name="name" type="text" required placeholder="Your full name">
              </div>
              <div class="field">
                <label for="f-email">Email</label>
                <input id="f-email" name="email" type="email" required placeholder="you@company.com">
              </div>
            </div>
            <div class="field">
              <label for="f-msg">Your query</label>
              <textarea id="f-msg" name="query" required placeholder="How can we help?"></textarea>
            </div>
            <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
            <div class="form__status" role="status"></div>
            <button class="btn btn--brass" type="submit">Send message</button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer link columns -->
    <div class="container">
      <div class="footer-cols">
        <div>
          <span class="brand__name" style="color:#fff">${COMPANY.name}</span>
          <p style="margin-top:.6rem;max-width:34ch">${COMPANY.tagline} — supplying textiles,
             agriculture and medical products to partners worldwide.</p>
          <!-- ADD: short company description here if you want -->
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="core-values.html">Core Values</a></li>
            <li><a href="global-reach.html">Global Reach</a></li>
            <li><a href="products.html">Products</a></li>
            <li><a href="manufacturing-facilities.html">Manufacturing Facilities</a></li>
            <li><a href="news.html">News &amp; Blog</a></li>
          </ul>
        </div>
        <div>
          <h4>Products</h4>
          <ul>
            <li><a href="textiles.html">Textiles</a></li>
            <li><a href="agriculture.html">Agriculture</a></li>
            <li><a href="medical.html">Medical</a></li>
            <li><a href="contact.html">Become a Representative</a></li>
          </ul>
        </div>
      </div>
      <hr class="divider" style="background:rgba(255,255,255,.1);margin-top:2rem">
      <div class="footer-bottom">
        <span>© <span id="yr"></span> ${COMPANY.name}. All rights reserved.</span>
        <span class="links">
          <a href="contact.html">Contact</a>
          <a href="admin.html" style="opacity:.55">Staff Admin</a>
          <!-- ^ Internal link to the News & Blog admin panel. Your host will not
               password-protect this page for you — see the note in admin.html
               before you publish, if you'd rather keep it unlisted. -->
          <!-- ADD: <a href="#">Privacy Policy</a> etc. when ready -->
        </span>
      </div>
    </div>
  </footer>`;
}

/* ---------- WATERMARK  (large, faint COMPANY LOGO behind every page) ---------- */
function buildWatermark() {
  const div = document.createElement("div");
  div.className = "watermark";
  div.setAttribute("aria-hidden", "true");
  const wmSrc = COMPANY.watermarkLogo || COMPANY.logo;
  if (wmSrc) {
    // Falls back to the plain monogram automatically if the logo file is missing.
    div.innerHTML = `<img class="watermark__logo" src="${wmSrc}" alt=""
      onerror="this.outerHTML='<div class=&quot;watermark__mark&quot;>${COMPANY.monogram}</div>'">`;
  } else {
    div.innerHTML = `<div class="watermark__mark">${COMPANY.monogram}</div>`;
  }
  return div.outerHTML;
}

/* ============================================================================
   PAGE BACKDROP  (an optional background PHOTO at the top of each page)
   ----------------------------------------------------------------------------
   Each page's <body> has data-bg="assets/images/backgrounds/FILE.jpg" pointing
   at the photo it should use. The photo shows large and faint behind the top of
   the page, then fades/scrolls away so your logo watermark takes over lower down.

   ADDING A PHOTO: drop a file into  company-website/assets/images/backgrounds/ .
   It just needs to match the name in data-bg. To make life easy, this code also
   automatically tries common variations, so ALL of these will work for the home
   page even though the tag says "home.jpg":
        home.jpg   home.jpeg   home.png   home.webp
        Home.jpg   HOME.JPG    (any capitalisation)
   If none of them load, the page simply shows no backdrop (nothing breaks).

   TROUBLESHOOTING: if your photo isn't showing, add  ?debug  to the page URL
   (e.g. index.html?debug) and reload — a small note in the bottom-left corner
   will tell you whether the file was found and which path worked.
   ============================================================================ */
function buildBackdrop() {
  const photo = document.body.getAttribute("data-bg");
  if (!photo) return "";

  const div = document.createElement("div");
  div.className = "page-backdrop is-photo";
  div.setAttribute("aria-hidden", "true");
  // Insert the backdrop right AFTER the watermark (if present) so the photo
  // paints on top of the logo and covers it. Falls back to the top of the body.
  const wm = document.querySelector(".watermark");
  if (wm) wm.insertAdjacentElement("afterend", div);
  else document.body.insertAdjacentElement("afterbegin", div);

  // Build a list of candidate URLs to try: the exact path first, then common
  // extension and capitalisation variants of the same base name.
  const dot = photo.lastIndexOf(".");
  const base = dot > -1 ? photo.slice(0, dot) : photo;      // ".../home"
  const exts = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG", "WEBP"];
  const candidates = [photo];
  exts.forEach(e => {
    candidates.push(`${base}.${e}`);
    // also try a capitalised first letter of the filename (Home.jpg)
    const slash = base.lastIndexOf("/");
    const dir = base.slice(0, slash + 1), file = base.slice(slash + 1);
    if (file) {
      const cap = file.charAt(0).toUpperCase() + file.slice(1);
      candidates.push(`${dir}${cap}.${e}`);
    }
  });
  // de-duplicate while keeping order
  const tryList = [...new Set(candidates)];

  const debug = /[?&]debug\b/.test(location.search);
  function note(msg, ok) {
    if (!debug) return;
    let n = document.getElementById("bg-debug");
    if (!n) {
      n = document.createElement("div");
      n.id = "bg-debug";
      n.style.cssText = "position:fixed;left:8px;bottom:8px;z-index:9999;background:#002654;color:#fff;font:12px monospace;padding:8px 10px;border-radius:6px;max-width:80vw;opacity:.92";
      document.body.appendChild(n);
    }
    n.textContent = "Backdrop: " + msg;
    n.style.background = ok ? "#1f7a44" : "#8a2c26";
  }

  let i = 0;
  function tryNext() {
    if (i >= tryList.length) {
      note(`no file found. Put your photo at "${photo}" (checked ${tryList.length} name variants).`, false);
      return;
    }
    const url = tryList[i++];
    const img = new Image();
    img.onload = () => {
      div.style.backgroundImage = `url("${url}")`;
      div.classList.add("is-loaded");
      note(`loaded "${url}".`, true);
    };
    img.onerror = tryNext;
    img.src = url;
  }
  tryNext();

  return ""; // the element is already inserted above
}

/* ---------- SOCIAL SIDEBAR (LinkedIn + WhatsApp, fixed on every page) ---------- */
function buildSocialSidebar() {
  return `
  <div class="social-side" aria-label="Social links">
    <a href="${SOCIAL.linkedin}" class="social-linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.83v2.05h.05c.53-1 1.85-2.05 3.8-2.05 4.07 0 4.82 2.68 4.82 6.16V23h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V23h-4V8z"/></svg>
    </a>
    <a href="${SOCIAL.whatsapp}" class="social-whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.06c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.16-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.29-.12.57.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.63-.14.26.1 1.64.77 1.92.91.29.14.48.21.55.33.07.12.07.7-.17 1.38z"/></svg>
    </a>
  </div>`;
}

/* ---------- NAV interactivity (mobile menu + mobile dropdown) ---------- */
function wireNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  // On mobile, tapping a dropdown parent opens it instead of navigating
  document.querySelectorAll(".has-dropdown > a").forEach(a => {
    a.addEventListener("click", e => {
      if (window.innerWidth <= 940) {
        e.preventDefault();
        a.parentElement.classList.toggle("is-open");
      }
    });
  });
}

/* ---------- CONTACT FORM submission ---------- */
function wireContactForms() {
  document.querySelectorAll(".js-contact-form").forEach(form => {
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const status = form.querySelector(".form__status");
      const data = Object.fromEntries(new FormData(form).entries());
      if (data._gotcha) return;                       // spam honeypot
      if (!data.name || !data.email || !data.query) {
        show(status, "err", "Please fill in your name, email and query.");
        return;
      }

      if (FORM_ENDPOINT) {
        try {
          const res = await fetch(FORM_ENDPOINT, {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: new FormData(form)
          });
          if (res.ok) { form.reset(); show(status, "ok", "Thanks — your message has been sent."); }
          else        { show(status, "err", "Something went wrong. Please email us directly."); }
        } catch { show(status, "err", "Network error. Please email us directly."); }
      } else {
        // DEMO fallback (no endpoint set): store locally so you can see it works.
        const store = JSON.parse(localStorage.getItem("contactSubmissions") || "[]");
        store.push({ ...data, at: new Date().toISOString() });
        localStorage.setItem("contactSubmissions", JSON.stringify(store));
        form.reset();
        show(status, "ok", "Saved (demo mode). Set FORM_ENDPOINT in site.js to receive these by email.");
      }
    });
  });
  function show(el, cls, msg){ el.className = "form__status " + cls; el.textContent = msg; }
}

/* ---------- BOOT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // Watermark first, then the backdrop ON TOP of it. Both sit behind the page
  // content (content is z-index 1). Because the backdrop is inserted AFTER the
  // watermark and the photo is fully opaque, the photo completely covers the
  // logo where it shows; where the photo fades out lower down, the logo shows
  // through again.
  document.body.insertAdjacentHTML("afterbegin", buildWatermark());
  buildBackdrop(); // inserts itself right after the watermark (see the function)
  document.body.insertAdjacentHTML("afterbegin", buildHeader());
  document.body.insertAdjacentHTML("beforeend", buildSocialSidebar());
  document.body.insertAdjacentHTML("beforeend", buildFooter());
  document.getElementById("yr").textContent = new Date().getFullYear();
  wireNav();
  wireContactForms();
});
