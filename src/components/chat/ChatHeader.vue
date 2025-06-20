<script setup lang="ts">
import ChatSidebarTrigger from '@/components/sidebar/ChatSidebarTrigger.vue'

</script>

<template>
  <!-- 上浮 -->
  <header class="fixed z-10">
  <div class='flex justify-start items-center h-12 w-30 p-3 '>
    <!-- 自定义侧边栏开关 -->
    <ChatSidebarTrigger/>
  </div>
  </header>
</template>

<style scoped>

</style>