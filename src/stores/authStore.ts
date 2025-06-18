import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {loginAPI, logoutAPI} from "@/apis/user/userApi";
import type { LoginUser} from "@/types/user/userModel.ts";

import { toast } from 'vue-sonner'

export const useAuthStore = defineStore(
  'authStore',
  () => {

    const user = ref<LoginUser | null>(null)
    const router = useRouter()

    // 登录
    const login = async (username: string, password: string) => {
      const resp = await loginAPI({ username, password })
      if (resp.code === 200) {
        const u: LoginUser = {
          username,
          token: resp.data,
        }
        user.value = u
        return u
      } else {
        user.value = null
        toast.error(resp.message)
      }
    }

    // 登出
    const logout = async () => {
      const resp = await logoutAPI()
      if (resp.code === 200) {
        user.value = null
        console.log('退出成功，跳转到登录页')
        router.push('/login')
      } else {
        toast.error(resp.message)
      }
    }

    // 是否登录
    const isLogin = computed(() => !!user.value?.token)

    const clearUser = () => {user.value = null}

    return {
      user,
      isLogin,
      login,
      logout,
      clearUser,
    }
  },
  // 持久化到localStore
  { persist: true },
)
