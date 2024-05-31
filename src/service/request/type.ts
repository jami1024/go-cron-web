import type {
  AxiosRequestConfig,
  // AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

// 针对AxiosRequestConfig配置进行扩展
export interface ZLInterceptors<T = AxiosResponse> {
  // requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 新版axios需要用InternalAxiosRequestConfig
  requestSuccessFn?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface ZLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZLInterceptors<T>
}
