<template>
  <div class="main-layout">
    <SideBar />
    <router-view class="app-container" />
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";

export default {
  name: "App",
  components: {
    SideBar,
  },
};
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  background-color: #2c3e50;
  /* account for fixed sidebar width */
  margin-left: 200px;
}

@media (max-width: 600px) {
  .main-layout {
    flex-direction: column;
    margin-left: 0;
    /* account for fixed top bar height */
    margin-top: 50px;
  }
}
</style>
