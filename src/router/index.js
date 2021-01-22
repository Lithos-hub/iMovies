import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/404',  
  component: () => import('../views/404.vue') },  
  { path: '*', redirect: '/404' },  
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: () => import('../views/Movie.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  },
  {
    path: '/trending',
    name: 'Trending',
    component: () => import('../views/Trending.vue')
  },
  {
    path: '/trailers',
    name: 'Trailers',
    component: () => import('../views/Trailers.vue')
  },
  {
    path: '/genres',
    name: 'Genres',
    component: () => import('../views/Genres.vue')
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import('../views/Ranking.vue')
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
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
