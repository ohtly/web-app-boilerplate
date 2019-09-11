import axios from 'axios'
import { TokenService } from './storage.service'
import { logger } from '@/services/log.service'
import store from '@/store'

// TODO 如果一个url请求多次 401，也应退出登录

const ApiService = {
    _401interceptor: null,
    mount401Interceptor() {
        logger.info('设置 401 拦截器')
        this._401interceptor = axios.interceptors.response.use(response => {
            logger.info('401 拦截器正常通过')
            return response
        }, async (error) => {
            if (error.response.status == 401) {
                if (error.config.url.includes('/login')) {
                    logger.info(`HTTP 401 转退出登录`)
                    store.dispatch("auth/logout")
                    throw error
                } else {
                    try {
                        logger.info('重新请求 refresh token ..')

                        // 对测试的支持 ---->
                        if (error.config.url.includes('/test2')) {
                            TokenService.saveRefreshToken('3333');
                        }
                        // <----

                        await store.dispatch('auth/refreshToken')
                        logger.info('refresh token 成功，重做之前的请求 ')

                        // 对测试的支持 --->
                        let { url, method, data } = error.config
                        url = url.includes(`/visit`) ? url + '?id=7' : url
                        // <---

                        return this.customRequest({
                            method,
                            url,
                            data
                        })
                    } catch (error) {
                        throw error
                    }
                }

            }
        })
    },
    unmount401Interceptor() {
        logger.info('取消 401 拦截器')
        axios.interceptors.response.eject(this._401interceptor)
    },
    init(baseURL) {
        axios.defaults.baseURL = baseURL
    },
    setHeader() {
        logger.info(`设置 Authorization 头信息`)
        axios.defaults.headers.common['Authorization'] = `Bearer ${TokenService.getToken()}`
    },
    removeHeader() {
        axios.defaults.headers.common = {}
    },
    get(resource, params = null) {
        return axios.get(resource, params)
    },
    post(resource, data) {
        return axios.post(resource, data)
    },
    put(resource, data) {
        return axios.put(resource, data)
    },
    delete(resource) {
        return axios.delete(resource)
    },
    customRequest(data) {
        return axios(data)
    }
}

export default ApiService