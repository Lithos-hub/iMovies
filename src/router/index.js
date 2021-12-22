import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  { path: "*", redirect: "/404" },
  { path: "/404", component: () => import("../views/404.vue") },
  {
    path: "/",
    name: "Access",
    component: () => import("../views/Access.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/movie/:id",
    name: "Movie",
    component: () => import("../views/Movie.vue"),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/Account.vue"),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/trending",
    name: "Trending",
    component: () => import("../views/Trending.vue"),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/trailers",
    name: "Trailers",
    component: () => import("../views/Trailers.vue"),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/genres",
    name: "Genres",
    component: () => import("../views/Genres.vue"),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/popular",
    name: "Ranking",
    component: () => import("../views/Popular.vue"),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/changelog",
    name: "Change Log",
    component: () => import("../views/Changelog.vue"),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/mymovies",
    name: "My Movies",
    component: () => import("../views/MyMovies.vue"),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
    meta: {
      requiresAuth: true
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Requires Auth and the user is logged in
  if (requiresAuth && (await store.dispatch("getCurrentUser"))) {
    next()
    // If requires auth and user is not logged in
  } else if (requiresAuth && !(await store.dispatch("getCurrentUser"))) {
    next({ path: "/" })
  } else {
    next()
  }
})

export default router;
