<script setup lang="ts">
import { Avatar, AvatarImage } from '@/components/ui/avatar'
const appName = import.meta.env.VITE_APP_NAME
</script>

<template>
  <div class="flex flex-col gap-3 mt-[20%] mb-10">
    <div class="flex justify-center items-center gap-4">
      <Avatar class="h-8 w-8 rounded-lg">
        <AvatarImage src="src/assets/logo.svg" alt="dw" />
      </Avatar>

      <span class="text-2xl font-bold"> 我是 {{appName}}，很高兴见到你！ </span>
    </div>
    <div>
      <span class="text-sm text-muted-foreground">
        我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~
      </span>
    </div>
  </div>
</template>

<style scoped></style>
