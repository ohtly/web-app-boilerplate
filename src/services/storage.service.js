import { logger } from '@/services/log.service'

const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

const TokenService = {
    getToken() {
        logger.info(`获取 token: ${localStorage.getItem(TOKEN_KEY)}`)
        return localStorage.getItem(TOKEN_KEY)
    },
    saveToken(accessToken) {
        logger.info(`保存 token: ${accessToken}`)
        localStorage.setItem(TOKEN_KEY, accessToken)
    },
    removeToken() {
        logger.info(`删除 token`)
        localStorage.removeItem(TOKEN_KEY)
    },
    getRefreshToken() {
        logger.info(`获取 refresh token: ${localStorage.getItem(REFRESH_TOKEN_KEY)}`)
        return localStorage.getItem(REFRESH_TOKEN_KEY)
    },
    saveRefreshToken(refreshToken) {
        logger.info(`保存 refresh token: ${refreshToken}`)
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    },
    removeRefreshToken() {
        logger.info(`删除 refresh token`)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    }
}

export { TokenService }