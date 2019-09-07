import Vue from 'vue'
import Router from 'vue-router'

import LoginView from './components/Login.vue'
import DashView from './components/Dash.vue'

import { TokenService } from './services/storage.service'

import DashboardView from './components/views/Dashboard.vue'
import BlankView from './components/views/Blank.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: LoginView,
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      }
    },
    {
      path: '/',
      component: DashView,
      children: [
        {
          path: 'dashboard',
          alias: '',
          component: DashboardView,
          name: 'Dashboard',
          meta: { description: 'Overview of environment' }
        },
        {
          path: 'blank',
          component: BlankView,
          name: 'Blank',
          meta: { description: 'blank view' }
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
  const loggedIn = !!TokenService.getToken()

  if (!isPublic && !loggedIn) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  if (loggedIn && onlyWhenLoggedOut) {
    return next('/')
  }

  next()
})

export default router