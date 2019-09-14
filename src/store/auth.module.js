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
    async logout({ commit }) {
        commit('logoutRequest')
        try {
            await UserService.logout()
            commit('logoutSuccess')
        } catch (error) {
            throw error
        } finally {
            router.push('/login')
        }


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
                () => {
                    commit('refreshTokenPromise', null)
                }
            )
        }
        return state.refreshTokenPromise
    }
}

const mutations = {
    loginRequest(state) {
        logger.info(`发起登录请求..`)
        state.authenticating = true;
        state.authenticationError = ''
    },
    loginSuccess(state, accessToken) {
        logger.info(`登录响应成功.`)
        state.accessToken = accessToken
        state.authenticating = false
    },
    logoutSuccess(state) {
        logger.info(`退出登录成功.`)
        state.accessToken = ''
    },
    loginError(state, error) {
        logger.info(`登录错误.`)
        state.authenticating = false
        state.authenticationError = error
    },
    refreshTokenPromise(state, promise) {
        state.refreshTokenPromise = promise
    },
    logoutRequest() {
        logger.info(`发起退出登录请求..`)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
