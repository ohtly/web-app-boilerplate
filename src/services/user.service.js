import ApiService from "./api.service"
import { TokenService } from './storage.service'
import { logger } from '@/services/log.service'

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
            ApiService.setHeader()

            logger.info(`get access token: ${response.data.access_token}`)
            return response.data.access_token

        } catch (error) {
            throw new Error(error.response.data.error)
        }
    },
    logout() {
        TokenService.removeToken()
        ApiService.removeHeader()
    }
}

export default UserService
export { UserService }