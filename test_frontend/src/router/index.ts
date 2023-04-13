import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../views/HomeView.vue"

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/explore/",
      name: "explore",
      component: () => import("../views/ExploreView.vue"),
    },
    {
      path: "/reels/",
      name: "reels",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ReelsView.vue"),
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
})
