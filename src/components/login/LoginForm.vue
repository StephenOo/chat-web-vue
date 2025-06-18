<script setup lang="ts">
import { type HTMLAttributes, ref } from 'vue'
import { cn } from '@/lib/utils.ts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { toast } from 'vue-sonner'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const router = useRouter()
const userStore = useUserStore()

const loading = ref<boolean>(false)

// 执行登录操作
const handleSubmit = async (e: Event) => {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  try {
    loading.value = true
    await userStore.getUserInfo({ username, password })

    if (userStore.isLogin()) {
      console.log('登录成功')
      router.push('/')
    } else {
      console.log('登录失败')
      toast.error('登录失败')
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
        <CardTitle class="text-center text-xl"> 登录到 Dw Chat Vue </CardTitle>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit">
          <div class="flex flex-col gap-6">
            <div class="grid gap-3">
              <Label for="username">用户名</Label>
              <Input id="username" type="text" name="username" placeholder="dawei" required />
            </div>
            <div class="grid gap-3">
              <div class="flex items-center">
                <Label for="password">密码</Label>
                <a href="#" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  忘记密码？
                </a>
              </div>
              <Input id="password" type="password" name="password" placeholder="123456" required />
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
