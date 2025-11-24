<template>
  <div class="sidebar">
    <h1>Lab Chess</h1>
    <ul>
      <li @click="navigateTo('/')">
        <icon-images name="home"></icon-images>
        <span class="nav-text">Home</span>
      </li>
      <li @click="navigateTo('/play')">
        <icon-images name="play"></icon-images>
        <span class="nav-text">Play</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import IconImages from "../assets/IconImages.vue";

export default {
  name: "SideBar",
  components: {
    IconImages,
  },
  setup() {
    const router = useRouter();

    const navigateTo = (route) => {
      router.push(route);
    };

    return {
      navigateTo,
    };
  },
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #22313f;
  color: #908f8f;
  transition: width 0.3s ease;
  flex-shrink: 0;
}

.sidebar h1 {
  margin: 0;
  padding: 20px;
  font-size: 1.5rem;
}

.sidebar ul {
  list-style-type: none;
  width: 100%;
  padding: 0;
}

.sidebar li {
  color: #908f8f;
  text-align: left;
  padding: 15px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar li:hover {
  background-color: #2c3e50;
}

@media (max-width: 768px) {
  .sidebar {
    width: 60px;
    position: fixed;
    z-index: 1000;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
    min-height: 100vh;
  }

  .sidebar h1 {
    display: none;
  }

  .sidebar li {
    padding: 15px 10px;
    justify-content: center;
  }

  .sidebar :deep(.nav-text) {
    display: none;
  }
}
</style>
