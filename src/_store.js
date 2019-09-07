import Vue from 'vue'
import Vuex from 'vuex'

import { UserService } from './services/user.service'
import { TokenService } from './services/storage.service'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    accessToken: TokenService.getToken(),
    authenticating: false,
    authenticationError: ''
  },
  getters: {
    loggedId: state => {
      return state.accessToken
    },
    authenticating: state => {
      return state.authenticating
    },
    authenticationError: state => {
      return state.authenticationError
    }
  },
  actions: {
    async login({ commit }, { userName, password }) {
      commit('loginRequest')
      try {
        const token = await UserService.login(userName, password)
        commit('loginSuccess', token)

        router.push(router.history.current.query.redirect || '/')
      } catch (error) {
        commit('loginError', error)
      }
    },
    logout({ commit }) {
      UserService.logout()
      commit('logoutSuccess')
      router.push('/login')
    }
  },
  mutations: {
    loginRequest(state) {
      state.authenticating = true;
      state.authenticationError = ''
    },
    loginSuccess(state, accessToken) {
      state.accessToken = accessToken
    },
    logoutSuccess(state) {
      state.accessToken = ''
      state.authenticating = false
    },
    loginError(state, { message }) {
      state.authenticating = false
      state.authenticationError = message
    }
  }
})
