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
  
  // Create an array of explicitly supported languages for this post
  const supportedLanguages = [currentLang];
  if (meta && meta.content && meta.content !== 'none') {
    meta.content.split(',').forEach(lang => supportedLanguages.push(lang.trim()));
  }

  const enPath = getEnPath(current);
  const blogToggle = document.getElementById('lang-blog');
  document.getElementById('lang-default').style.display = 'none';
  blogToggle.style.display = '';

  // Define both languages to always display the structure "EN / VI"
  const allLanguages = ['en', 'vi'];

  blogToggle.innerHTML = allLanguages.map((lang, i) => {
    const separator = i > 0 ? '<span class="lang-separator">/</span>' : '';
    
    // Condition 1: It's the language the user is currently reading
    if (lang === currentLang) {
      return `
        ${separator}
        <a href="${getLangPath(enPath, lang)}" class="active">
          ${LANG_LABELS[lang]}
        </a>
      `;
    }
    
    // Condition 2: It's the other language, and it IS available/translated
    if (supportedLanguages.includes(lang)) {
      return `
        ${separator}
        <a href="${getLangPath(enPath, lang)}">
          ${LANG_LABELS[lang]}
        </a>
      `;
    }
    
    // Condition 3: It's the other language, but it has NO translation yet
    return `
      ${separator}
      <span class="lang-disabled">${LANG_LABELS[lang]}</span>
    `;
  }).join('');
}

async function loadPostList(containerId, category) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Detect language from URL: /blog/vi/... → 'vi', /blog/de/... → 'de', else default
  const langMatch = window.location.pathname.match(/^\/blog\/(vi|de)\//);
  const lang = langMatch ? langMatch[1] : null;

  // Fetch the language-specific posts.json, fallback to default
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

  // Prefix post links with the language path if needed
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