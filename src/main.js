import Vue from 'vue'

import './plugins'
import App from './App.vue'
import router from './router'
import store from './store'
import { apiBaseUrl } from '@/environment'
import { logger } from '@/services/log.service'

import ApiService from './services/api.service'
import { TokenService } from './services/storage.service'

import { capitalize } from '@/filters'
Vue.filter('capitalize', capitalize)

Vue.config.productionTip = false

ApiService.init(apiBaseUrl)

if (TokenService.getToken()) {
  ApiService.setHeader()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

logger.info('App 完成加载')
