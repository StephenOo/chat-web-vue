import {httpInstance} from "@/utils/httpUtil";
import type { LoginParam, RegisterParam } from '@/types/user/userModel.ts'
import type {ApiResponse} from "@/types";


 enum UserUrl {
   REGISTER = '/user/register',
     LOGIN = '/user/login',
     LOGOUT = '/user/logout',
     QUERY_USER = '/user/queryUser',
 }

/**
 * 用户注册 API
 */
export function registerAPI({username, email, password}: RegisterParam) {
  return httpInstance.post<any, ApiResponse<string>>(UserUrl.REGISTER, {username, email, password})
}

/**
 * 用户登录
 */
export function loginAPI({username, password}: LoginParam) {
    return httpInstance.post<any, ApiResponse<string>>(UserUrl.LOGIN, {username, password})
}

/**
 * 退出登录
 */
export function logoutAPI() {
    return httpInstance.delete<any, ApiResponse>(UserUrl.LOGOUT)
}

/**
 * 获取登录用户信息
 */
export const getLoginUserInfoAPI = () => {
    return httpInstance.get<any, ApiResponse>(UserUrl.QUERY_USER)
}
