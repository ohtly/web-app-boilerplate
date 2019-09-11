import { UserService } from '../services/user.service'
import { TokenService } from '../services/storage.service'
import router from '../router'

import { logger } from "@/services/log.service"

const state = {
    accessToken: TokenService.getToken(),
    authenticating: false,
    authenticationError: '',
    refreshTokenPromise: null
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
    },
    refreshToken({ commit, state }) {
        logger.info('执行 refresh token ..')
        if (!state.refreshTokenPromise) {
            const p = UserService.refreshToken()
            commit('refreshTokenPromise', p)

            p.then(
                response => {
                    commit('refreshTokenPromise', null)
                    commit('loginSuccess', response)
                },
                error => {
                    commit('refreshTokenPromise', null)
                }
            )
        }
        return state.refreshTokenPromise
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
    loginError(state, error) {
        logger.info(`登录错误.`)
        console.log(error)
        state.authenticating = false
        state.authenticationError = error
    },
    refreshTokenPromise(state, promise) {
        state.refreshTokenPromise = promise
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
