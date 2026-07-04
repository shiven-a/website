/* ============================================================================
   PRODUCTS-RENDER.JS  —  turns products-data.js into actual pages.
   You do NOT need to edit this file. Edit assets/js/products-data.js instead.
   ============================================================================ */

function mediaBox(image, alt, cls) {
  if (image) return `<div class="${cls}"><img src="${image}" alt="${alt || ""}"></div>`;
  return `<div class="${cls}">PHOTO PLACEHOLDER — add an image path in products-data.js</div>`;
}

/* ---------- HUB PAGE (products.html): lists the 3 divisions ---------- */
function renderDivisionsHub(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = PRODUCT_DIVISIONS.map(div => `
    <a class="card" href="${div.page}" style="text-decoration:none">
      ${mediaBox(div.image, div.title, "card__media")}
      <div class="card__body">
        <span class="card__tag">${div.num} — Division</span>
        <h3>${div.title}</h3>
        <p>${div.subcategories.map(s => s.title).join(" · ")}</p>
      </div>
    </a>`).join("");
}

/* ---------- DIVISION / CATEGORY LANDING PAGE (e.g. textiles.html) ---------- */
function renderDivisionPage(divisionId) {
  const div = PRODUCT_DIVISIONS.find(d => d.id === divisionId);
  if (!div) return;

  const introEl = document.getElementById("division-intro");
  if (introEl) introEl.textContent = div.intro;
  const titleEl = document.getElementById("division-title");
  if (titleEl) titleEl.textContent = div.title;
  const numEl = document.getElementById("division-num");
  if (numEl) numEl.textContent = div.num;

  const grid = document.getElementById("category-grid");
  if (grid) {
    grid.innerHTML = div.subcategories.map(sub => `
      <a class="card" href="${sub.page}" style="text-decoration:none">
        ${mediaBox("", sub.title, "card__media")}
        <div class="card__body">
          <span class="card__tag">${div.title}</span>
          <h3>${sub.title}</h3>
          <p>[ADD: one-line teaser for ${sub.title} — edit in products-data.js]</p>
        </div>
      </a>`).join("");
  }
}

/* ---------- SUBCATEGORY / PRODUCT-TYPE PAGE (e.g. mens-fashion.html) ---------- */
function findParentDivision(subId) {
  return PRODUCT_DIVISIONS.find(d => d.subcategories.some(s => s.id === subId));
}

function renderProductPage(subId, titleOverride) {
  const parent = findParentDivision(subId);
  const sub = parent ? parent.subcategories.find(s => s.id === subId) : null;
  const data = PRODUCT_PAGES[subId];
  if (!data) return;
  // sub.title comes from products-data.js normally. If this page isn't linked
  // into any division yet (e.g. lubricant-additives.html), fall back to the
  // title already printed in the page's <h1 id="page-title">.
  const title = sub ? sub.title : (titleOverride || document.getElementById("page-title")?.textContent || "");

  document.title = `${title} — Meridian`;

  const crumbEl = document.getElementById("breadcrumb");
  if (crumbEl) {
    crumbEl.innerHTML = parent
      ? `<a href="products.html">Products</a> / <a href="${parent.page}">${parent.title}</a> / ${title}`
      : `<a href="products.html">Products</a> / ${title} <span style="color:var(--brass-deep)">(not yet linked to a division — see products-data.js)</span>`;
  }
  const titleEl = document.getElementById("page-title");
  if (titleEl) titleEl.textContent = title;
  const introEl = document.getElementById("page-intro");
  if (introEl) introEl.textContent = data.intro;

  const grid = document.getElementById("product-grid");
  if (grid) {
    if (!data.products.length) {
      grid.innerHTML = `<p>No products listed yet. Add some in <code>assets/js/products-data.js</code>.</p>`;
    } else {
      grid.innerHTML = data.products.map(p => `
        <div class="card">
          ${mediaBox(p.image, p.name, "card__media")}
          <div class="card__body">
            <span class="card__tag">${title}</span>
            <h3>${p.name}</h3>
            <p>${p.description}</p>
          </div>
        </div>`).join("");
    }
  }
}
