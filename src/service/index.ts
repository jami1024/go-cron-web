// service统一出口
import ZLRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

const zlRequest = new ZLRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 每一个请求都自动携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      console.log('token', token)
      if (config.headers && token) {
        // 类型缩小
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default zlRequest
