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
    meta: {
      restrictedRoute: true,
      registeredUsersOnly: false
    }
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: () => import('../views/Movie.vue'),
    meta: {
      restrictedRoute: true,
      registeredUsersOnly: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      restrictedRoute: true,
      registeredUsersOnly: false
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue'),
    meta: {
      restrictedRoute: true,
      registeredUsersOnly: true
    }
  },
  {
    path: '/trending',
    name: 'Trending',
    component: () => import('../views/Trending.vue'),
    meta: {
      restrictedRoute: true,
      registeredUsersOnly: false
    }
  },
  {
    path: '/trailers',
    name: 'Trailers',
    component: () => import('../views/Trailers.vue'),
    meta: {
      restrictedRoute: true,
      registeredUsersOnly: false
    }
  },
  {
    path: '/genres',
    name: 'Genres',
    component: () => import('../views/Genres.vue'),
    meta: {
      restrictedRoute: true,
      registeredUsersOnly: false
    }
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import('../views/Ranking.vue'),
    meta: {
      restrictedRoute: true,
      registeredUsersOnly: true
    }
  },
  {
    path: '/changelog',
    name: 'Change Log',
    component: () => import('../views/Changelog.vue'),
    meta: {
      restrictedRoute: true,
      registeredUsersOnly: false
    }
  },
  {
    path: '/mymovies',
    name: 'My Movies',
    component: () => import('../views/MyMovies.vue'),
    meta: {
      restrictedRoute: true,
      registeredUsersOnly: true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      restrictedRoute: true,
      registeredUsersOnly: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const restrictedRoute = to.meta.restrictedRoute
  const registeredUsersOnly = to.meta.registeredUsersOnly
  
  if(restrictedRoute) {
    if (store.getters.signedUser !== {}){
      next()
    }else{
      next('/')
    }
  }else{
    next()
  }

  if(registeredUsersOnly) {
    if (!store.getters.defaultUser){
      next()
    }else{
      next('/home')
    }
  }else{
    next()
  }

})

export default router
