import { logger } from '@/services/log.service'

const TOKEN_KEY = 'access_token'

const TokenService = {
    getToken() {
        logger.info(`获取token: ${localStorage.getItem(TOKEN_KEY)}`)
        return localStorage.getItem(TOKEN_KEY)
    },
    saveToken(accessToken) {
        logger.info(`保存token: ${accessToken}`)
        localStorage.setItem(TOKEN_KEY, accessToken)
    },
    removeToken() {
        logger.info(`删除token`)
        localStorage.removeItem(TOKEN_KEY)
    }
}

export { TokenService }