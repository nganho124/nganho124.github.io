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

// --- Generic (non-blog) page language helpers ---
function getPageLang(pathname) {
  if (pathname.startsWith('/de/')) return 'de';
  return 'en';
}

function getEnPagePath(pathname) {
  return pathname.replace(/^\/de\//, '/');
}

function getPageLangPath(enPath, lang) {
  if (lang === 'en') return enPath;
  return `/de${enPath}`;
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
  if (currentLang) {
    const meta = document.querySelector('meta[name="translations"]');
    const supportedLanguages = [currentLang];
    if (meta && meta.content && meta.content !== 'none') {
      meta.content.split(',').forEach(lang => supportedLanguages.push(lang.trim()));
    }

    const enPath = getEnPath(current);
    const blogToggle = document.getElementById('lang-blog');
    document.getElementById('lang-default').style.display = 'none';
    blogToggle.style.display = '';

    const allLanguages = ['en', 'vi'];

    blogToggle.innerHTML = allLanguages.map((lang, i) => {
      const separator = i > 0 ? '<span class="lang-separator">/</span>' : '';

      if (lang === currentLang) {
        return `
          ${separator}
          <a href="${getLangPath(enPath, lang)}" class="active">
            ${LANG_LABELS[lang]}
          </a>
        `;
      }

      if (supportedLanguages.includes(lang)) {
        return `
          ${separator}
          <a href="${getLangPath(enPath, lang)}">
            ${LANG_LABELS[lang]}
          </a>
        `;
      }

      return `
        ${separator}
        <span class="lang-disabled">${LANG_LABELS[lang]}</span>
      `;
    }).join('');

    return; // blog page handled, skip the generic branch below
  }

  // Generic pages (Home, About, Projects, Resume) — EN/DE toggle
  const pageLang = getPageLang(current);
  const enPagePath = getEnPagePath(current);
  const defaultToggle = document.getElementById('lang-default');

  defaultToggle.innerHTML = ['en', 'de'].map((lang, i) => {
    const separator = i > 0 ? '<span>/</span>' : '';
    const target = getPageLangPath(enPagePath, lang);
    const isCurrent = lang === pageLang;
    return `
      ${separator}
      <a href="${target}"${isCurrent ? ' class="active"' : ''}>${LANG_LABELS[lang]}</a>
    `;
  }).join('');
}

async function loadPostList(containerId, category) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const langMatch = window.location.pathname.match(/^\/blog\/(vi|de)\//);
  const lang = langMatch ? langMatch[1] : null;

  const jsonPath = lang ? `/blog/${lang}/posts.json` : '/blog/posts.json';
  const res = await fetch(jsonPath);
  const all = await res.json();

  const posts = all
    .filter(p => p.category === category)
    .sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));

  if (posts.length === 0) {
    container.innerHTML = `<p style="color:var(--muted); font-family:var(--mono); font-size:0.85rem;">Posts coming soon.</p>`;
    return;
  }

  const basePath = lang ? `/blog/${lang}` : '/blog';

  container.innerHTML = posts.map(post => `
    <a href="${basePath}/${post.category}/${post.file}" class="post-card">
      <div class="post-card-meta">${post.date} · ${post.readTime}</div>
      <h2 class="post-card-title">${post.title}</h2>
      <p class="post-card-excerpt">${post.excerpt}</p>
    </a>
  `).join('');
}

loadNav();
loadComponent('footer-placeholder', '/assets/components/footer.html');