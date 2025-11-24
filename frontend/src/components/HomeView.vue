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

.content-section {
  margin-bottom: 30px;
  padding: 25px;
  background-color: rgba(34, 49, 63, 0.5);
  border-radius: 12px;
  border-left: 4px solid #4caf50;
}

.content-section h2 {
  margin: 0 0 15px 0;
  color: #4caf50;
}

.accent-orange {
  border-left-color: #ff9800;
}

.accent-orange h2 {
  color: #ff9800;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.feature-list li {
  padding: 10px 0;
  color: #d0d0d0;
  border-bottom: 1px solid rgba(144, 143, 143, 0.2);
}

.feature-list li:last-child {
  border-bottom: none;
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
</style>
