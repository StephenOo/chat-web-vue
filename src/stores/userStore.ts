import {ref} from 'vue'
import {defineStore} from 'pinia'
import {loginAPI} from "@/apis/user/userApi";
import type {LoginParam, LoginUser} from "@/types/user/userModel.ts";


/**
 * 登录用户信息
 */
export const useUserStore
    = defineStore('userStore', () => {

        // 用户信息
        const loginUser = ref<LoginUser>({
            username: '',
            token: ''
        })

        // 用户登录信息
        const getUserInfo = async ({username, password}: LoginParam) => {
            const resp = await loginAPI({username, password});
            loginUser.value.token = resp.data;
            loginUser.value.username = username
            // 获取登录用户信息信息
        }

        // 退出登录，清理用户信息
        const clearUserInfo = () => {
            loginUser.value = {token: "", username: ""}

        }

        // 是否登录
        const isLogin = () => {
            if (loginUser.value.token) {
                return true
            }
            return false;
        }

        return {loginUser, getUserInfo, clearUserInfo, isLogin}
    },
    // 持久化到localStore
    {persist: true}
)
