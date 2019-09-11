import axios from 'axios'
import { TokenService } from './storage.service'
import { logger } from '@/services/log.service'

const ApiService = {
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
    get(resource) {
        return axios.get(resource)
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