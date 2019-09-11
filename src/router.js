import Vue from 'vue'
import Router from 'vue-router'

import LoginView from './components/Login.vue'
import DashView from './components/Dash.vue'

import { TokenService } from './services/storage.service'

import NotFoundView from './components/404.vue'

import DashboardView from './components/views/Dashboard.vue'
import { ErrorDemoView, MockRefreshErrorView } from './components/views/demos'

import { logger } from "@/services/log.service"

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
          path: 'error-demo',
          component: ErrorDemoView,
          name: 'ErrorDemo',
          meta: { description: 'error demo view' }
        },
        {
          path: 'mock-refresh-error',
          component: MockRefreshErrorView,
          name: 'MockRefreshError',
          meta: { description: 'mock refresh error view' }
        },
      ]
    }, {
      path: '*',
      component: NotFoundView,
      meta: {
        public: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  logger.info(`路由前处理, 路径: ${to.fullPath}`)
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
  const loggedIn = !!TokenService.getToken()

  if (!isPublic && !loggedIn) {
    logger.info('检查.. 需要登录，转登录页面')
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  if (loggedIn && onlyWhenLoggedOut) {
    logger.info('登录页面仅当退出登录状态才可用，转默认首页 / ')
    return next('/')
  }

  next()
})

export default router