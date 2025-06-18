<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center gap-3">
    <p class="text-2xl">抱歉！您访问的页面不存在。</p>
    <p>404 | not fund</p>
    <RouterLink to="/">
      <Button class="cursor-pointer"> 返回主页</Button>
    </RouterLink>
  </div>
</template>

<style scoped></style>
