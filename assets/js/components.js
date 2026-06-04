async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

async function loadNav() {
  await loadComponent('nav-placeholder', '/assets/components/nav.html');

  const current = window.location.pathname;

  document.querySelectorAll('#nav-placeholder a').forEach(link => {
    const href = new URL(link.href).pathname;

    // Exact match, or "/" only matches homepage exactly
    const isActive = href === '/'
      ? current === '/'
      : current.startsWith(href);

    if (isActive) link.classList.add('active');
  });
}

loadNav();
loadComponent('footer-placeholder', '/assets/components/footer.html');