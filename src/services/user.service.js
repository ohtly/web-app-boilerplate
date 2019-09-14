import ApiService from "./api.service"
import { TokenService } from './storage.service'
import { logger } from '@/services/log.service'

class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const UserService = {
    login: async function (userName, password) {
        const requestData = {
            method: 'post',
            url: '/login',
            data: {
                username: userName,
                password
            }
        }
        try {
            const response = await ApiService.customRequest(requestData)
            TokenService.saveToken(response.data.access_token)
            TokenService.saveRefreshToken(response.data.refresh_token)
            ApiService.setHeader()

            ApiService.mount401Interceptor()

            return response.data.access_token
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.error)
        }
    },
    refreshToken: async function () {
        const refreshToken = TokenService.getRefreshToken()

        const requestData = {
            method: 'post',
            url: '/login',
            data: {
                refresh_token: refreshToken
            }
        }

        try {
            const response = await ApiService.customRequest(requestData)
            const { access_token, refresh_token } = response.data

            TokenService.saveToken(access_token)
            TokenService.saveRefreshToken(refresh_token)
            ApiService.setHeader()

            return access_token
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.error)
        }
    },
    async logout() {
        try {
            const refreshToken = TokenService.getRefreshToken()
            const requestData = {
                method: 'post',
                url: '/logout',
                data: {
                    refresh_token: refreshToken
                }
            }
            await ApiService.customRequest(requestData)
        } catch (error) {
            throw error
        } finally {
            TokenService.removeToken()
            ApiService.removeHeader()

            ApiService.unmount401Interceptor()
        }
    }
}

export default UserService
export { UserService, AuthenticationError }