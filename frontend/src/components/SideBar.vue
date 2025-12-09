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
    <div class="sidebar-footer">
      <span class="built-by" @click="navigateTo('/karanaulakh')">
        Built by Karan Aulakh
      </span>
    </div>
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
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  margin: 0;
  padding: 20px;
  font-size: 1.5rem;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar li:hover {
  background-color: #2c3e50;
}

@media (max-width: 600px) {
  .sidebar {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sidebar h1 {
    display: none;
  }

  .sidebar ul {
    display: flex;
    gap: 20px;
    margin: 0;
  }

  .sidebar li {
    padding: 10px 15px;
  }

  .sidebar-footer {
    display: none;
  }
}

.sidebar-footer {
  margin-top: auto;
  padding: 15px 20px;
  border-top: 1px solid rgba(144, 143, 143, 0.15);
}

.built-by {
  font-size: 0.75rem; /* Slightly smaller than global default */
}
</style>
