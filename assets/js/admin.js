/* ============================================================================
   ADMIN.JS  —  powers the News & Blog admin panel (admin.html).
   ----------------------------------------------------------------------------
   HOW THIS WORKS (read this — it matters):
   This is a plain HTML/CSS/JS website with NO server and NO database, so a
   browser page like this one physically CANNOT save changes onto your live
   website by itself — nothing can, without a backend. What this panel DOES
   do: let you add, edit, and delete posts visually, then generates a ready-
   to-use replacement for assets/js/blog-posts.js which you download and
   upload to your site (overwriting the old one). That upload step is the
   "publish" step — the site updates for every visitor as soon as you do it.

   If you want changes to go live without ever uploading a file yourself,
   you would need to move to a real backend/CMS (e.g. Netlify CMS/Decap CMS,
   a headless CMS, or a small custom server) — a bigger project than a static
   site. This panel is the no-backend-needed middle ground.
   ============================================================================ */
(function () {
  // Work on a copy in memory so nothing changes until you download the file.
  let posts = (typeof BLOG_POSTS !== "undefined" ? BLOG_POSTS.slice() : []);
  let editingId = null;

  const listEl = document.getElementById("admin-list");
  const form = document.getElementById("admin-form");
  const formTitle = document.getElementById("admin-form-title");
  const cancelBtn = document.getElementById("admin-cancel");

  function slugify(str) {
    return str.toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "post";
  }
  function uniqueId(base, ignoreId) {
    let id = base, n = 2;
    while (posts.some(p => p.id === id && p.id !== ignoreId)) { id = `${base}-${n++}`; }
    return id;
  }

  function renderList() {
    if (!posts.length) {
      listEl.innerHTML = `<p>No posts yet. Add your first one using the form below.</p>`;
      return;
    }
    const sorted = posts.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
    listEl.innerHTML = sorted.map(p => `
      <div class="admin-row">
        <div>
          <h4>${p.title}</h4>
          <p>${p.date} · ${p.category}</p>
        </div>
        <div class="admin-row__actions">
          <button type="button" data-edit="${p.id}">Edit</button>
          <button type="button" class="danger" data-delete="${p.id}">Delete</button>
        </div>
      </div>`).join("");

    listEl.querySelectorAll("[data-edit]").forEach(btn =>
      btn.addEventListener("click", () => loadIntoForm(btn.getAttribute("data-edit"))));
    listEl.querySelectorAll("[data-delete]").forEach(btn =>
      btn.addEventListener("click", () => {
        if (!confirm("Remove this post from the list? (Doesn't affect your live site until you download and upload the file.)")) return;
        posts = posts.filter(p => p.id !== btn.getAttribute("data-delete"));
        renderList();
      }));
  }

  function loadIntoForm(id) {
    const p = posts.find(x => x.id === id);
    if (!p) return;
    editingId = id;
    formTitle.textContent = "Edit post";
    form.title.value = p.title;
    form.date.value = p.date;
    form.category.value = p.category;
    form.image.value = p.image || "";
    form.excerpt.value = p.excerpt;
    form.body.value = p.body;
    cancelBtn.style.display = "inline-flex";
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetForm() {
    editingId = null;
    form.reset();
    form.date.value = new Date().toISOString().slice(0, 10);
    formTitle.textContent = "Add a new post";
    cancelBtn.style.display = "none";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      title: form.title.value.trim(),
      date: form.date.value,
      category: form.category.value.trim() || "Company News",
      image: form.image.value.trim(),
      excerpt: form.excerpt.value.trim(),
      body: form.body.value.trim(),
    };
    if (!data.title || !data.date || !data.excerpt || !data.body) {
      alert("Please fill in at least the title, date, excerpt and body.");
      return;
    }
    if (editingId) {
      const existing = posts.find(p => p.id === editingId);
      Object.assign(existing, data);
    } else {
      data.id = uniqueId(slugify(data.title));
      posts.unshift(data);
    }
    resetForm();
    renderList();
  });

  cancelBtn.addEventListener("click", resetForm);

  /* ---------- Generate a downloadable blog-posts.js ---------- */
  // For fields wrapped in "double quotes" (id, title, date, category, image, excerpt)
  function escapeQuoted(str) {
    return String(str)
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\r?\n/g, " "); // these fields are single-line by design
  }
  // For the body field, which is wrapped in `backticks` and allowed to span lines
  function escapeTemplateLiteral(str) {
    return String(str).replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  }

  document.getElementById("admin-download").addEventListener("click", () => {
    const header = `/* ============================================================================
   BLOG POSTS  —  THIS IS THE ONLY FILE YOU EDIT TO ADD NEWS / BLOG POSTS
   ----------------------------------------------------------------------------
   Generated by admin.html on ${new Date().toISOString().slice(0, 10)}.
   You can keep editing this file by hand (see the field guide below) OR keep
   using admin.html — either way works, they use the same format.

   FIELD GUIDE:
     id       : a short unique tag, lowercase-with-dashes (used in the web link)
     title    : the headline
     date     : the date, written exactly like "2026-06-01" (Year-Month-Day)
     category : a short label, e.g. "Company News", "Textiles", "Events"
     image    : path to a photo (put photos in /assets/images/). Leave "" for none.
     excerpt  : 1–2 sentence summary shown in the list
     body     : the full article. Separate paragraphs with a blank line.
   ============================================================================ */

const BLOG_POSTS = [
`;
    const body = posts.map(p => `  {
    id: "${p.id}",
    title: "${escapeQuoted(p.title)}",
    date: "${p.date}",
    category: "${escapeQuoted(p.category)}",
    image: "${escapeQuoted(p.image || "")}",
    excerpt: "${escapeQuoted(p.excerpt)}",
    body:
\`${escapeTemplateLiteral(p.body)}\`
  },`).join("\n\n");
    const footer = `
];

/* Do not edit below */
if (typeof module !== "undefined") module.exports = BLOG_POSTS;
`;
    const fileText = header + body + footer;
    const blob = new Blob([fileText], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blog-posts.js";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  resetForm();
  renderList();
})();
