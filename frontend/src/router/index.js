import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/components/HomeView.vue";
import PlayChess from "@/components/PlayChess.vue";
import AboutMe from "@/components/AboutMe.vue";

const routes = [
  {
    path: "/",
    name: "homeView",
    component: HomeView,
  },
  {
    path: "/play",
    name: "playChess",
    component: PlayChess,
  },
  {
    path: "/karanaulakh",
    name: "aboutMe",
    component: AboutMe,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
