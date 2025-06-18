import axios from "axios";
import {useUserStore} from "@/stores/userStore";
import router from "@/router";


/**
 * 创建实例
 */
export const httpInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 60000
});


/**
 * 添加请求拦截器
 */
httpInstance.interceptors.request.use(
    // 拦截请求，增加token
    config => {
        const userStore = useUserStore()
        const token = userStore.loginUser.token
        if (token) {
            //console.log(`token : ${token}`)
            config.headers['token'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * 添加响应拦截器
 */
httpInstance.interceptors.response.use(
    // 成功返回
    resp => {
         //console.log(`response: ${JSON.stringify(res.data)}`)
        if (resp.data.code === 401) {
            const userStore = useUserStore()
            userStore.clearUserInfo()
            console.log('token失效，转跳到登录页')
            router.push('/login')
        }

        return resp.data
    },
    // 错误返回
    error => {
        console.log(`response error: ${JSON.stringify(error)}`)
        /*if (error.response) {
            window.alert(error.response.data.message)

            // 401token失效处理
            // 1.清除本地用户数据
            // 2.跳转登录界面
            if (error.response.data.code === 401) {
                const userStore = useUserStore()
                userStore.clearUserInfo()
                console.log('token失效，转跳到登录页')
                const router = useRouter()
                router.push('/login')
            }
        }*/
        return Promise.reject(error)
    }
)
