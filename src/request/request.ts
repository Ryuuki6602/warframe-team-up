import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

export default class request {
  private instance: AxiosInstance | undefined

  constructor(requeseConfig: AxiosRequestConfig) {
    this.instance = axios.create(requeseConfig)
    // 全局请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return error
      }
    )

    // 全局响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        // res 为AxiosResponse 类型，含有conig\data\headers\request\status\statusText属性
        return res.data
        // 只需要返回data即可
      },
      (error) => {
        return error
      }
    )
  }

  request<T>(config: AxiosRequestConfig<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      /* eslint-disable */
      this.instance
        ?.request<any, T>(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get(url?: string, param?: any) {
    return new Promise((resolve, reject) => {
      this.instance
        ?.get(url + '?' + param)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  post(url: string, data?: any) {
    return new Promise((resolve, reject) => {
      this.instance
        ?.post(url, data)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
