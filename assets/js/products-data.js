/* ============================================================================
   PRODUCTS-DATA.JS  —  THIS IS THE ONLY FILE YOU EDIT TO CHANGE THE CATALOGUE
   ----------------------------------------------------------------------------
   Every product page on the site (the 3 division pages, and the 12 individual
   product-type pages) reads from this ONE file. You never need to touch any
   .html file to add, remove or edit a product, a subcategory, or a whole
   division.

   THIS FILE HAS TWO PARTS:

   PART 1 — PRODUCT_DIVISIONS
     The 3 top-level divisions (Textiles / Agriculture / Medical) and the
     subcategories inside each. Each subcategory points at its own page via
     "page" (the .html filename). Only add/remove/rename divisions or
     subcategories here if you are changing the overall STRUCTURE of the
     catalogue (rare). To add a whole new subcategory you must also create
     its .html page — copy an existing one, e.g. mens-fashion.html, and
     change the PAGE_ID line inside it (see comment in that file).

   PART 2 — PRODUCT_PAGES
     The actual products shown inside each subcategory page. THIS is what
     you'll edit most often.

   HOW TO ADD A PRODUCT (no coding needed):
     1. Find the right subcategory key below, e.g. "mens-fashion".
     2. Copy one whole product block — from "{" to "}," — and paste it as a
        new block in the same list.
     3. Change the name, image path and description.
     4. Save. The page updates automatically — no HTML editing required.

   HOW TO REMOVE A PRODUCT:
     Delete its whole { ... }, block from the list.

   HOW TO ADD A PHOTO TO A PRODUCT:
     Put the image file in /assets/images/products/ and set "image" to its
     path, e.g. "assets/images/products/mens-shirt-01.jpg". Leave "" for a
     placeholder box that reminds you a photo is still needed.
   ============================================================================ */

/* ---------- PART 1: DIVISIONS & SUBCATEGORIES (site structure) ---------- */
const PRODUCT_DIVISIONS = [
  {
    id: "textiles",
    num: "01",
    title: "Textiles",
    page: "textiles.html",
    intro: "[ADD: overview of your textiles offering — fabrics, ranges, capacity.]",
    image: "", // <!-- ADD PHOTO: textiles division banner/hero image -->
    subcategories: [
      { id: "mens-fashion",      title: "Men's Fashion",      page: "mens-fashion.html" },
      { id: "womens-fashion",    title: "Women's Fashion",    page: "womens-fashion.html" },
      { id: "furnishing-fabrics",title: "Furnishing Fabrics", page: "furnishing-fabrics.html" },
    ]
  },
  {
    id: "agriculture",
    num: "02",
    title: "Agriculture",
    page: "agriculture.html",
    intro: "[ADD: overview of your agriculture offering — machinery and chemicals.]",
    image: "", // <!-- ADD PHOTO: agriculture division banner/hero image -->
    subcategories: [
      { id: "compact-machinery",   title: "Compact Agricultural Machinery",   page: "compact-machinery.html" },
      { id: "automated-machinery", title: "Automated Agricultural Machinery", page: "automated-machinery.html" },
      { id: "agri-chemicals",      title: "Agricultural Chemicals",           page: "agri-chemicals.html" },
      /* NOTE: "Industrial & Automotive Lubricant Additives" was previously part of
         the old "Chemicals" division, which has been removed. It's kept below as
         its own page (lubricant-additives.html) but is NOT linked in the menu or
         on this division page yet — decide where it belongs (a 4th item here,
         its own small division, or drop it) and either uncomment the line below
         or delete lubricant-additives.html and its PRODUCT_PAGES entry.
      { id: "lubricant-additives", title: "Industrial & Automotive Lubricant Additives", page: "lubricant-additives.html" },
      */
    ]
  },
  {
    id: "medical",
    num: "03",
    title: "Medical",
    page: "medical.html",
    intro: "[ADD: overview of your medical products offering.]",
    image: "", // <!-- ADD PHOTO: medical division banner/hero image -->
    subcategories: [
      { id: "medical-consumables",   title: "Medical Consumables",             page: "medical-consumables.html" },
      { id: "cath-lab-portfolio",    title: "Cath Lab Portfolio",              page: "cath-lab-portfolio.html" },
      { id: "dialysis-equipment",    title: "Dialysis Equipment & Consumables",page: "dialysis-equipment.html" },
      { id: "medical-lab-equipment", title: "Medical Lab Equipment",           page: "medical-lab-equipment.html" },
      { id: "stents-portfolio",      title: "Stents Portfolio",                page: "stents-portfolio.html" },
      { id: "pharmaceuticals",       title: "Pharmaceuticals",                 page: "pharmaceuticals.html" },
    ]
  },
];

/* ---------- PART 2: PRODUCTS SHOWN INSIDE EACH SUBCATEGORY PAGE ----------
   Key = the subcategory "id" above. Each has an intro line plus a list of
   products. Add as many product blocks as you need — the grid grows to fit. */
const PRODUCT_PAGES = {

  "mens-fashion": {
    intro: "[ADD: overview of your men's fashion range — fabrics used, styles, MOQs.]",
    products: [
      // Copy/paste this block to add more products. There is no limit —
      // add as many as you have (this division tends to have many SKUs).
      { name: "[Product name]", image: "", description: "[ADD: short description — fabric, fit, use case.]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
    ]
  },

  "womens-fashion": {
    intro: "[ADD: overview of your women's fashion range.]",
    products: [
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
    ]
  },

  "furnishing-fabrics": {
    intro: "[ADD: overview — upholstery, drapery, contract use, etc.]",
    products: [
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
    ]
  },

  "compact-machinery": {
    intro: "[ADD: overview — small-scale equipment, use cases.]",
    products: [
      { name: "[Model / product name]", image: "", description: "[ADD: specs, capacity, use case.]" },
      { name: "[Model / product name]", image: "", description: "[ADD description]" },
      { name: "[Model / product name]", image: "", description: "[ADD description]" },
      { name: "[Model / product name]", image: "", description: "[ADD description]" },
    ]
  },

  "automated-machinery": {
    intro: "[ADD: overview — automated/precision equipment, models.]",
    products: [
      { name: "[Model / product name]", image: "", description: "[ADD description]" },
      { name: "[Model / product name]", image: "", description: "[ADD description]" },
      { name: "[Model / product name]", image: "", description: "[ADD description]" },
      { name: "[Model / product name]", image: "", description: "[ADD description]" },
    ]
  },

  "agri-chemicals": {
    intro: "[ADD: overview — fertilisers, crop protection, etc.]",
    products: [
      { name: "[Product name]", image: "", description: "[ADD: active ingredients, pack sizes, use.]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
    ]
  },

  "lubricant-additives": {
    intro: "[ADD: overview — additive types, applications, specs. See note in the DIVISIONS section above about where this page should link from.]",
    products: [
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
    ]
  },

  "medical-consumables": {
    intro: "[ADD: overview of your medical consumables range.]",
    products: [
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
    ]
  },

  "cath-lab-portfolio": {
    intro: "[ADD: overview of your cath lab portfolio.]",
    products: [
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
    ]
  },

  "dialysis-equipment": {
    intro: "[ADD: overview of your dialysis equipment & consumables range.]",
    products: [
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
    ]
  },

  "medical-lab-equipment": {
    intro: "[ADD: overview of your medical lab equipment range.]",
    products: [
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
    ]
  },

  "stents-portfolio": {
    intro: "[ADD: overview of your stents portfolio.]",
    products: [
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
    ]
  },

  "pharmaceuticals": {
    intro: "[ADD: overview of your pharmaceuticals range. Add any regulatory / licensing notes here.]",
    products: [
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
      { name: "[Product name]", image: "", description: "[ADD description]" },
    ]
  },

};

if (typeof module !== "undefined") module.exports = { PRODUCT_DIVISIONS, PRODUCT_PAGES };
