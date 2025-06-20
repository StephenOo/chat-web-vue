<script setup lang="ts">
import { type HTMLAttributes, ref } from 'vue'
import { cn } from '@/lib/utils.ts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { useAuth } from '@/composables/useAuth.ts'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const router = useRouter()
const {login} = useAuth()
const appName = import.meta.env.VITE_APP_NAME

const loading = ref<boolean>(false)
const username = ref<string>('')
const password = ref<string>('')


// 执行登录操作
const onLogin = async (e: Event) => {

  try {
    loading.value = true
    const user = await login( username.value, password.value )

    if (user) {
      console.log('登录成功，跳转首页')
      router.push('/')
    } else {
      console.log('登录失败')
    }
  } catch (e) {
    console.error('登录失败:', e)
    if (e instanceof Error) {
      toast.error(e.message || '')
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <CardTitle class="text-center text-xl"> 登录到 {{appName}} </CardTitle>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="onLogin">
          <div class="flex flex-col gap-6">
            <div class="grid gap-3">
              <Label for="username">用户名</Label>
              <Input v-model="username" placeholder="dawei" required />
            </div>
            <div class="grid gap-3">
              <div class="flex items-center">
                <Label for="password">密码</Label>
                <a href="#" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  忘记密码？
                </a>
              </div>
              <Input  v-model="password" type="password" placeholder="123456" required />
            </div>
            <div class="flex flex-col gap-3">
              <Button
                type="submit"
                class="w-full cursor-pointer"
                :disabled="loading"
              >
                登录
              </Button>
              <Button variant="outline" class="w-full">
                Login with Google
              </Button>
            </div>
          </div>
          <div class="mt-4 text-center text-sm">
            还没有账号?
            <a href="#" class="underline underline-offset-4"> 注册 </a>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
