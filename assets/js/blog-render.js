/* ============================================================================
   BLOG-RENDER.JS  —  turns the data in blog-posts.js into the news page.
   You do NOT need to edit this file. Edit blog-posts.js to manage content.
   ============================================================================ */
(function () {
  const listEl = document.getElementById("post-list");
  const fullEl = document.getElementById("post-full");
  if (!listEl && !fullEl) return;

  const posts = (typeof BLOG_POSTS !== "undefined" ? BLOG_POSTS : [])
    .slice().sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first

  function fmtDate(d) {
    const date = new Date(d + "T00:00:00");
    return isNaN(date) ? d : date.toLocaleDateString(undefined,
      { year: "numeric", month: "long", day: "numeric" });
  }
  function media(src, cls) {
    if (src) return `<div class="${cls}"><img src="${src}" alt=""></div>`;
    return `<div class="${cls}">PHOTO PLACEHOLDER — set "image" in blog-posts.js</div>`;
  }
  function escapeBody(text) {
    return text.split(/\n\s*\n/).map(p =>
      `<p>${p.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\n/g,"<br>")}</p>`).join("");
  }

  // ---- Single post view (when URL is news.html#post=the-id) ----
  const hash = new URLSearchParams(location.hash.replace(/^#/, ""));
  const wanted = hash.get("post");

  if (fullEl && wanted) {
    const post = posts.find(p => p.id === wanted);
    if (post) {
      listEl && (listEl.parentElement.style.display = "none");
      fullEl.innerHTML = `
        <a href="news.html" class="eyebrow">← Back to all news</a>
        <p class="post__date">${fmtDate(post.date)} · ${post.category}</p>
        <h1>${post.title}</h1>
        ${media(post.image, "post-full__media")}
        ${escapeBody(post.body)}`;
      fullEl.style.display = "block";
      return;
    }
  }

  // ---- List view ----
  if (listEl) {
    if (!posts.length) { listEl.innerHTML = `<p>No posts yet. Add one in <code>assets/js/blog-posts.js</code>.</p>`; return; }
    listEl.innerHTML = posts.map(p => `
      <a class="card" href="news.html#post=${encodeURIComponent(p.id)}" style="text-decoration:none">
        ${media(p.image, "card__media")}
        <div class="card__body">
          <span class="card__tag">${p.category}</span>
          <h3>${p.title}</h3>
          <p class="post__date">${fmtDate(p.date)}</p>
          <p>${p.excerpt}</p>
        </div>
      </a>`).join("");
  }

  // Re-render if the user navigates between posts without reloading
  window.addEventListener("hashchange", () => location.reload());
})();
