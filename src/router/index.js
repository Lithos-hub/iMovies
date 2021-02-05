import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Access',
    component: () => import('../views/Access.vue'),
  },
  { path: '/404',  
  component: () => import('../views/404.vue') },  
  { path: '*', redirect: '/404' },  
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {restrictedRoute: true}
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: () => import('../views/Movie.vue'),
    meta: {restrictedRoute: true}
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {restrictedRoute: true}
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue'),
    meta: {restrictedRoute: true}
  },
  {
    path: '/trending',
    name: 'Trending',
    component: () => import('../views/Trending.vue'),
    meta: {restrictedRoute: true}
  },
  {
    path: '/trailers',
    name: 'Trailers',
    component: () => import('../views/Trailers.vue'),
    meta: {restrictedRoute: true}
  },
  {
    path: '/genres',
    name: 'Genres',
    component: () => import('../views/Genres.vue'),
    meta: {restrictedRoute: true}
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import('../views/Ranking.vue'),
    meta: {restrictedRoute: true}
  },
  {
    path: '/changelog',
    name: 'Change Log',
    component: () => import('../views/Changelog.vue'),
    meta: {restrictedRoute: true}
  },
  {
    path: '/mymovies',
    name: 'My Movies',
    component: () => import('../views/MyMovies.vue'),
    meta: {restrictedRoute: true}
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {restrictedRoute: true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const restrictedRoute = to.meta.restrictedRoute
  
  if(restrictedRoute) {
    if (store.getters.signedUser){
      next()
    }else{
      next('/')
    }
  }else{
    next()
  }

})

export default router
