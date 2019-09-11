import axios from 'axios'
import { TokenService } from './storage.service'
import { logger } from '@/services/log.service'
import store from '@/store'

const ApiService = {
    _401interceptor: null,
    mount401Interceptor() {
        logger.info('设置 401 拦截器')
        this._401interceptor = axios.interceptors.response.use(response => {
            logger.info('401 拦截器正常通过')
            return response
        }, async (error) => {
            if (error.response.status == 401) {
                logger.info(`HTTP 401 转退出登录`)
                store.dispatch("auth/logout")
                throw error
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