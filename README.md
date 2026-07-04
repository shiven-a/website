# Your Company Website — Setup Guide

A static website built with plain HTML, CSS and JavaScript. No build tools,
no frameworks — just open the files in a text editor, change the text, and
upload.

---

## 1. The files

```
index.html                     Home (intro, mission, vision, animated stats)
core-values.html                Centre-circle "core values" diagram
global-reach.html               World map
products.html                   Products hub — links to the 3 divisions
textiles.html                   Textiles division landing page
agriculture.html                Agriculture division landing page
medical.html                    Medical division landing page
mens-fashion.html                }
womens-fashion.html              }  Textiles product pages
furnishing-fabrics.html          }
compact-machinery.html           }
automated-machinery.html         }  Agriculture product pages
agri-chemicals.html              }
lubricant-additives.html        Orphaned page — see note in products-data.js
medical-consumables.html         }
cath-lab-portfolio.html          }
dialysis-equipment.html          }  Medical product pages
medical-lab-equipment.html       }
stents-portfolio.html            }
pharmaceuticals.html             }
manufacturing-facilities.html   Brief + photos + certifications carousel
news.html                        News & Blog (list + full post view)
admin.html                       News & Blog admin panel (no coding needed)
contact.html                     Buyers + Representatives + office list

assets/
  css/styles.css                 All styling (colours + fonts at the top)
  js/site.js                     ⭐ Company name, logo, socials, menu, watermark, FORM_ENDPOINT
  js/products-data.js            ⭐ EDIT THIS to add/remove/change products & categories
  js/products-render.js          (engine — don't edit)
  js/blog-posts.js               ⭐ Blog post data (edit directly, or use admin.html)
  js/blog-render.js              (engine — don't edit)
  js/admin.js                    (engine behind admin.html — don't edit)
  js/map-locations.js            ⭐ EDIT THIS to add/remove map points
  js/global-reach.js             (engine — don't edit)
  js/certifications-data.js      ⭐ EDIT THIS to add/remove certifications
  js/certifications-carousel.js  (engine — don't edit)
  js/stats-counter.js            (engine behind the home page stats — don't edit)
  images/
    logo.svg                     Your logo (used in the header AND as the watermark)
    backgrounds/                 Optional per-page background photos/gifs
    products/                    Product photos (referenced from products-data.js)
    certifications/              Certification photos (referenced from certifications-data.js)
    news/                        Blog post photos (referenced from blog-posts.js)
```

The ⭐ files are the only ones you'll usually touch.

---

## 2. First things to set (5 minutes)

Open **`assets/js/site.js`** and edit:
- `COMPANY` block — name, tagline, email, phone, logo path, monogram (fallback
  if the logo image fails to load).
- `SOCIAL` block — your real LinkedIn page URL and WhatsApp link
  (`https://wa.me/<countrycode+number, no + or spaces>`). These power the
  fixed icons on the right side of every page.
- `FORM_ENDPOINT` — see the big comment right above it in that file. A static
  website can't store form submissions on its own; sign up free at
  **formspree.io**, create a form, and paste the endpoint URL in. All three
  contact forms on the site (footer, buyer enquiry, representative enquiry)
  use this one endpoint.

---

## 3. Adding content

Look for **`[ADD: ...]`** placeholders and `<!-- ADD PHOTO ... -->` comments
in the HTML — each tells you exactly what to put there.

- **Products:** edit ONLY `assets/js/products-data.js` — copy/paste a product
  block to add one, delete a block to remove one. You never need to touch any
  product .html page.
- **Photos:** drop image files into the relevant `assets/images/...` folder,
  then set the matching `image` path in the data file (or, for a
  `card__media` placeholder still in raw HTML, replace it with an `<img>`).
- **Blog posts:** use `admin.html` (no coding), or edit
  `assets/js/blog-posts.js` by hand (copy a block, change the text).
- **Map points:** edit only `assets/js/map-locations.js`.
- **Certifications:** edit only `assets/js/certifications-data.js`.
- **Core values points:** copy/delete a `radial__node` block in
  `core-values.html` — they re-arrange around the circle automatically.
- **Offices:** copy/delete an `office` block in `contact.html`.
- **Home page stats:** edit the `data-target` number on each `.stat` block in
  `index.html` — they'll count up automatically.
- **Per-page background photo/gif:** put a file in
  `assets/images/backgrounds/` and set `data-bg="assets/images/backgrounds/FILE.jpg"`
  on that page's `<body>` tag.

---

## 4. Other details you'll likely want to add

- **Page titles & descriptions** — the `<title>` and `<meta name="description">`
  at the top of each HTML file.
- **A favicon** — add `favicon.ico` to the root and a
  `<link rel="icon" href="favicon.ico">` in each `<head>`.
- **Privacy Policy / Terms** pages — there's a commented spot in the footer.
- **Where "Industrial & Automotive Lubricant Additives" belongs** — see the
  note in `assets/js/products-data.js` (Agriculture division section).
- **Password-protecting `admin.html`** if you don't want it publicly guessable
  (ask your host about page-level auth — Netlify/Cloudflare Pages both offer
  simple options).
- **Product specs / brochures (PDFs)** — link them from each product card.
- A **Google Analytics** snippet if you want visitor stats.

---

## 5. Putting it online (connecting your domain)

This is a static site, so hosting is cheap or free. Easiest paths:
- **Netlify** or **Cloudflare Pages** or **GitHub Pages**: drag-and-drop /
  upload this whole folder, then point your domain at it in their dashboard.
- **Traditional web host (cPanel / FTP):** upload the entire folder contents
  to the `public_html` (or `www`) directory. Make sure `index.html` is at the
  top level.

Keep the folder structure intact — the `assets/` paths are relative.

---

## 6. Notes

- The map and fonts load from the internet (Leaflet + Google Fonts CDNs), so
  they need an internet connection to display — normal for a live website.
- "MERIDIAN" is a placeholder name used throughout — replace it in `site.js`
  plus the `<title>` tags of each page.
- Test every contact form once after setting your Formspree endpoint.
- After adding real blog posts through `admin.html`, remember the download is
  only step one — upload the resulting `blog-posts.js` to your live site to
  actually publish it.
