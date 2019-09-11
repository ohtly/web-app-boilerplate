import { UserService } from '../services/user.service'
import { TokenService } from '../services/storage.service'
import router from '../router'

import { logger } from "@/services/log.service"

const state = {
    accessToken: TokenService.getToken(),
    authenticating: false,
    authenticationError: ''
}

const getters = {
    loggedId: state => {
        return state.accessToken
    },
    authenticating: state => {
        return state.authenticating
    },
    authenticationError: state => {
        return state.authenticationError
    }
}

const actions = {
    async login({ commit }, { userName, password }) {
        commit('loginRequest')
        try {
            const token = await UserService.login(userName, password)
            commit('loginSuccess', token)

            router.push(router.history.current.query.redirect || '/')
        } catch (error) {
            commit('loginError', error)
            throw error
        }
    },
    logout({ commit }) {
        UserService.logout()
        commit('logoutSuccess')
        router.push('/login')
    }
}

const mutations = {
    loginRequest(state) {
        logger.info(`登录中..`)
        state.authenticating = true;
        state.authenticationError = ''
    },
    loginSuccess(state, accessToken) {
        logger.info(`登录成功.`)
        state.accessToken = accessToken
    },
    logoutSuccess(state) {
        logger.info(`退出登录成功.`)
        state.accessToken = ''
        state.authenticating = false
    },
    loginError(state, { message }) {
        logger.info(`登录错误.`)
        state.authenticating = false
        state.authenticationError = message
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
