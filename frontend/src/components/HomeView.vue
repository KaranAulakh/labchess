<template>
  <div class="home-view">
    <section class="page-header">
      <h1>Lab Chess</h1>
      <p class="tagline">
        Lab Chess is a web-based chess platform designed to help players improve
        their game through practice and analysis. Built with a modern tech
        stack, this project showcases full-stack development skills including
        real-time gameplay, custom game logic, and responsive design.
      </p>
    </section>

    <div class="two-col-grid">
      <section class="content-section">
        <h2>Current Features</h2>
        <ul class="feature-list">
          <li>Full chess gameplay with custom game logic implementation</li>
          <li>Legal move validation and piece movement rules</li>
          <li>Game timer with player clocks</li>
          <li>
            Responsive design for mobile and desktop (more work in progress
            here)
          </li>
          <li>Scalable backend and frontend</li>
        </ul>
      </section>

      <section class="content-section accent-orange">
        <h2>In Development</h2>
        <ul class="feature-list">
          <li>Opponent bot with adjustable difficulty</li>
          <li>
            AI-powered training and analysis
            <ul class="sub-list">
              <li>Mistake explanations</li>
              <li>Best move analysis</li>
              <li>Player strength and weakness detection</li>
            </ul>
          </li>
          <li>User accounts and authentication</li>
          <li>Game history and replay system</li>
          <li>Online multiplayer matchmaking</li>
        </ul>
      </section>
    </div>

    <footer class="mobile-footer">
      <router-link to="/karanaulakh" class="built-by">
        Built by Karan Aulakh
      </router-link>
    </footer>
  </div>
</template>

<script>
export default {
  name: "homeView",
};
</script>

<style scoped>
.home-view {
  width: 100%;
  padding: 30px 40px;
}

/* Override global content-section for HomeView specific spacing */
.content-section {
  margin-bottom: 30px;
}

.sub-list {
  list-style: none;
  padding-left: 30px;
  margin-top: 10px;
}

.sub-list li {
  padding: 6px 0;
  color: #b0b0b0;
  border-bottom: none;
}

.two-col-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

@media (max-width: 968px) {
  .two-col-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .home-view {
    padding: 20px 15px;
  }

  .content-section {
    padding: 20px;
  }
}

/* Mobile-only footer */
.mobile-footer {
  display: none;
  text-align: center;
  padding: 20px 0 10px 0;
}

@media (max-width: 600px) {
  .mobile-footer {
    display: block;
  }
}
</style>
