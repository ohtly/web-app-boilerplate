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
            throw new AuthenticationError(error.response.status, zerror.response.data.error)
        }
    },
    logout() {
        logger.info(`退出登录..`)
        TokenService.removeToken()
        ApiService.removeHeader()

        ApiService.unmount401Interceptor()
    }
}

export default UserService
export { UserService }