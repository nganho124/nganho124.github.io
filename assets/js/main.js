// Highlight active nav link based on current page
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (href !== '/' && path.startsWith(href))) {
      link.classList.add('active');
    }
  });

  // Fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.style.opacity = '1';
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card, .blog-category-card, .resume-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.5s ease';
    observer.observe(el);
  });
});

function scrollProjects(direction) {
  const grid = document.getElementById('projectsGrid');
  grid.scrollBy({ left: direction * 320, behavior: 'smooth' });
}

const section = document.getElementById("projects-section");

Object.entries(projects).forEach(([category, items], i) => {
  const marginTop = i === 0 ? "" : "style='margin-top:4rem'";
  
  const cards = items.map(p => `
    <a href="${p.href}" class="project-card">
      <div class="project-card-image">
        ${p.image ? `<img src="${p.image}" alt="${p.title}" loading="lazy">` : "Project Preview"}
      </div>
      <div class="project-card-body">
        <span class="project-tag">${p.tag}</span>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="project-tools">
          ${p.tools.map(t => `<span class="tool-badge">${t}</span>`).join("")}
        </div>
      </div>
    </a>
  `).join("");

  section.innerHTML += `
    <p class="section-label" ${marginTop} style="margin-bottom:1.5rem">${category}</p>
    <div class="projects-grid">${cards}</div>
  `;
});