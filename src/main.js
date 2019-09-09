import Vue from 'vue'
import './plugins'
import App from './App.vue'
import router from './router'
import store from './store'

import { apiBaseUrl } from '@/environment';
import ApiService from './services/api.service'
import { TokenService } from './services/storage.service'

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
