<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="page-header">
      <h1>Karan Aulakh</h1>
      <div class="hero-links">
        <a
          href="https://www.linkedin.com/in/karan-aulakh/"
          target="_blank"
          rel="noopener"
          class="link-btn linkedin"
        >
          <span class="icon">in</span> LinkedIn
        </a>
        <a
          href="https://github.com/KaranAulakh"
          target="_blank"
          rel="noopener"
          class="link-btn github"
        >
          <span class="icon">⌘</span> GitHub
        </a>
        <a href="mailto:karansaulakh@gmail.com" class="link-btn email">
          <span class="icon">✉</span> Email
        </a>
        <a href="/resume.pdf" target="_blank" class="link-btn resume">
          <span class="icon">↓</span> Resume
        </a>
      </div>
    </section>

    <!-- About Me -->
    <section class="content-section">
      <h2>About Me</h2>
      <p>
        I'm a software engineer at Workday building distributed systems that
        power millions of daily executions. Previously at Arista Networks and
        Wells Fargo. I love building things from scratch — whether that's a
        chess engine, a programming language interpreter, or scalable backend
        services. I'm always looking for new challenges and opportunities to
        grow.
      </p>
    </section>

    <!-- About This Project -->
    <section class="content-section accent-orange">
      <h2>About This Project</h2>
      <p>
        <strong>Lab Chess</strong> is a full-stack chess platform I built from
        scratch — no chess libraries, no tutorials. Every piece movement, every
        rule (castling, en passant, pawn promotion, threefold repetition) is
        implemented by hand. The backend is Python/Flask, the frontend is
        Vue.js, and it's deployed with Docker on Railway and Vercel.
      </p>
      <div class="cta-container">
        <router-link to="/play" class="btn btn-primary">
          Try Lab Chess →
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutMe",
};
</script>

<style scoped>
.about-page {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 60px 30px;
}

/* Hero Links */
.hero-links {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 25px;
}

.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.link-btn .icon {
  font-weight: 700;
}

.link-btn.linkedin {
  background: #0077b5;
  color: #fff;
}

.link-btn.linkedin:hover {
  background: #005885;
}

.link-btn.github {
  background: #333;
  color: #fff;
}

.link-btn.github:hover {
  background: #555;
}

.link-btn.email {
  background: #4caf50;
  color: #fff;
}

.link-btn.email:hover {
  background: #3d8b40;
}

.link-btn.resume {
  background: transparent;
  border: 2px solid #ff9800;
  color: #ff9800;
}

.link-btn.resume:hover {
  background: #ff9800;
  color: #fff;
}

/* Content Section overrides for this page */
.content-section {
  padding: 30px;
  margin-top: 30px;
}

.content-section h2 {
  font-size: 1.3rem;
}

/* CTA Container */
.cta-container {
  margin-top: 25px;
}

/* Responsive */
@media (max-width: 768px) {
  .about-page {
    padding: 40px 20px;
  }

  .hero-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
  }

  .link-btn {
    padding: 10px 14px;
    font-size: 0.9rem;
    justify-content: center;
  }

  .content-section {
    padding: 20px;
  }
}
</style>
