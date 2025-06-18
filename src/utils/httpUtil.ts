import axios from 'axios'
import router from '@/router'
import { useAuth } from '@/composables/useAuth.ts'

/**
 * 创建实例
 */
export const httpInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
})

/**
 * 添加请求拦截器
 */
httpInstance.interceptors.request.use(
  // 拦截请求，增加token
  (config) => {
    const { user } = useAuth()
    if (user) {
      //console.log(`token : ${token}`)
      config.headers['Authorization'] = `Bearer ${user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * 添加响应拦截器
 */
httpInstance.interceptors.response.use(
  // 成功返回
  (resp) => {
    // console.log(`response: ${JSON.stringify(resp.data)}`)
    if (resp.data.code === 401) {
      const { clearUser } = useAuth()
      clearUser()
      console.log('token失效，转跳到登录页')
      router.push('/login')
    }

    return resp.data
  },
  // 错误返回
  (error) => {
    console.log(`response error: ${JSON.stringify(error)}`)
    return Promise.reject(error)
  },
)
