async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

const LANG_LABELS = { en: 'EN', vi: 'VI', de: 'DE' };

function getBlogLang(pathname) {
  if (pathname.startsWith('/blog/vi/')) return 'vi';
  if (pathname.startsWith('/blog/de/')) return 'de';
  if (pathname.startsWith('/blog/') && 
      !pathname.startsWith('/blog/vi/') && 
      !pathname.startsWith('/blog/de/')) return 'en';
  return null;
}

function getEnPath(pathname) {
  return pathname
    .replace('/blog/vi/', '/blog/')
    .replace('/blog/de/', '/blog/');
}

function getLangPath(enPath, lang) {
  if (lang === 'en') return enPath;
  return enPath.replace('/blog/', `/blog/${lang}/`);
}

async function loadNav() {
  await loadComponent('nav-placeholder', '/assets/components/nav.html');

  const current = window.location.pathname;

  // Active nav links
  document.querySelectorAll('#nav-placeholder a').forEach(link => {
    const href = new URL(link.href).pathname;
    const isActive = href === '/' ? current === '/' : current.startsWith(href);
    if (isActive) link.classList.add('active');
  });

  // Blog language toggle
  const currentLang = getBlogLang(current);
  if (!currentLang) return; // not a blog page

  // Read declared translations from the page's meta tag
  const meta = document.querySelector('meta[name="translations"]');
  const available = ['en', ...(meta ? meta.content.split(',') : [])];

  // Only show toggle if there's more than one language available
  if (available.length <= 1) return;

  const enPath = getEnPath(current);
  const blogToggle = document.getElementById('lang-blog');
  document.getElementById('lang-default').style.display = 'none';
  blogToggle.style.display = '';

  blogToggle.innerHTML = available.map((lang, i) => `
    ${i > 0 ? '<span>/</span>' : ''}
    <a href="${getLangPath(enPath, lang)}"
       class="${lang === currentLang ? 'active' : ''}">
      ${LANG_LABELS[lang]}
    </a>
  `).join('');
}

async function loadPostList(containerId, category) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const res = await fetch('/blog/posts.json');
  const all = await res.json();
  const posts = all
    .filter(p => p.category === category)
    .sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));

  if (posts.length === 0) {
    container.innerHTML = `<p style="color:var(--muted); font-family:var(--mono); font-size:0.85rem;">Posts coming soon.</p>`;
    return;
  }

  container.innerHTML = posts.map(post => `
    <a href="/blog/${post.category}/${post.file}" class="post-card">
      <div class="post-card-meta">${post.date} · ${post.readTime}</div>
      <h2 class="post-card-title">${post.title}</h2>
      <p class="post-card-excerpt">${post.excerpt}</p>
    </a>
  `).join('');
}

loadNav();
loadComponent('footer-placeholder', '/assets/components/footer.html');