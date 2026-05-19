<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Ngan Ho · Data & BI Portfolio</title>
  <link rel="stylesheet" href="/assets/css/style.css"/>
</head>
<body>

<nav>
  <a href="/" class="nav-logo">nganho124</a>
  <ul class="nav-links">
    <li><a href="/" class="active">Home</a></li>
    <li><a href="/about.html">About</a></li>
    <li><a href="/projects/">Projects</a></li>
    <li><a href="/resume.html">Resume</a></li>
    <li><a href="/blog/">Blog</a></li>
  </ul>
</nav>

<main>
  <!-- HERO -->
  <section class="hero container">
    <p class="hero-eyebrow">MSc Information Systems · Data & BI</p>
    <h1>Turning data into<br><em>decisions that matter.</em></h1>
    <p class="hero-sub">
      I'm Ngan — a data-driven problem solver building end-to-end solutions at the intersection of business intelligence, analytics, and digital product development.
    </p>
    <div class="cta-group">
      <a href="/projects/" class="btn btn-primary">View Projects →</a>
      <a href="/resume.html" class="btn btn-outline">Download Resume</a>
    </div>
  </section>

  <hr class="divider"/>

  <!-- FEATURED PROJECTS -->
  <section class="container">
    <p class="section-label">Selected Work</p>
    <h2 class="section-title">Featured Projects</h2>
    <p class="section-desc">A selection of data science, BI, and pipeline projects from my studies and work.</p>
    <div class="projects-grid">

      <a href="/projects/" class="project-card">
        <span class="project-tag">Business Intelligence</span>
        <h3>Sales Performance Dashboard</h3>
        <p>Interactive Power BI dashboard tracking regional KPIs with drill-through capability for executive reporting.</p>
        <div class="project-tools">
          <span class="tool-badge">Power BI</span>
          <span class="tool-badge">SQL</span>
          <span class="tool-badge">DAX</span>
        </div>
      </a>

      <a href="/projects/" class="project-card">
        <span class="project-tag">Data Science</span>
        <h3>Customer Churn Prediction</h3>
        <p>ML pipeline predicting churn probability with 87% accuracy using gradient boosting and SHAP explainability.</p>
        <div class="project-tools">
          <span class="tool-badge">Python</span>
          <span class="tool-badge">scikit-learn</span>
          <span class="tool-badge">SHAP</span>
        </div>
      </a>

      <a href="/projects/" class="project-card">
        <span class="project-tag">Data Engineering</span>
        <h3>ETL Pipeline Automation</h3>
        <p>End-to-end data pipeline ingesting multi-source data into a normalised data warehouse with scheduled refresh.</p>
        <div class="project-tools">
          <span class="tool-badge">Python</span>
          <span class="tool-badge">Airflow</span>
          <span class="tool-badge">PostgreSQL</span>
        </div>
      </a>

    </div>
    <div style="margin-top:2.5rem">
      <a href="/projects/" class="btn btn-outline">All Projects →</a>
    </div>
  </section>

  <hr class="divider"/>

  <!-- BLOG PREVIEW -->
  <section class="container">
    <p class="section-label">Writing</p>
    <h2 class="section-title">From the Blog</h2>
    <p class="section-desc">Notes categorised by Python data types — because everything is data.</p>
    <div class="blog-grid">
      <a href="/blog/numeric/" class="blog-category-card">
        <div class="type-label">int / float</div>
        <h3>Numeric</h3>
        <p>Technical knowledge & data insights</p>
      </a>
      <a href="/blog/boolean/" class="blog-category-card">
        <div class="type-label">bool</div>
        <h3>Boolean</h3>
        <p>Perspectives & how I think</p>
      </a>
      <a href="/blog/dictionary/" class="blog-category-card">
        <div class="type-label">dict</div>
        <h3>Dictionary</h3>
        <p>Work & study life stories</p>
      </a>
      <a href="/blog/string/" class="blog-category-card">
        <div class="type-label">str</div>
        <h3>String</h3>
        <p>Music, art & random thoughts</p>
      </a>
    </div>
  </section>
</main>

<footer>
  <p>
    <a href="https://github.com/nganho124" target="_blank">GitHub</a> &nbsp;·&nbsp;
    <a href="https://linkedin.com" target="_blank">LinkedIn</a> &nbsp;·&nbsp;
    <a href="mailto:your@email.com">Email</a>
  </p>
  <p style="margin-top:0.75rem">© 2025 Ngan Ho · todayonepercent.com</p>
</footer>

<script src="/assets/js/main.js"></script>
</body>
</html>
