import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: () => import(/* webpackChunkName: "about" */ '../views/Movie.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "about" */ '../views/Account.vue')
  },
  {
    path: '/trending',
    name: 'Trending',
    component: () => import(/* webpackChunkName: "about" */ '../views/Trending.vue')
  },
  {
    path: '/trailers',
    name: 'Trailers',
    component: () => import(/* webpackChunkName: "about" */ '../views/Trailers.vue')
  },
  {
    path: '/genres',
    name: 'Genres',
    component: () => import(/* webpackChunkName: "about" */ '../views/Genres.vue')
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ranking.vue')
  },
  {
    path: '/changelog',
    name: 'Change Log',
    component: () => import(/* webpackChunkName: "about" */ '../views/Changelog.vue')
  },
  {
    path: '/mymovies',
    name: 'My Movies',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyMovies.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
