<script setup lang="ts">
import { useMotion } from '@vueuse/motion'

const dots = [0, 1, 2]
</script>

<template>
  <div class="flex space-x-1 h-5 items-end">
    <div
      v-for="i in dots"
      :key="i"
      v-motion
      class="w-2 h-2 bg-muted-foreground rounded-full"
      :initial="{ y: '20%' }"
      :animate="{ y: ['20%', '-80%', '20%'] }"
      :transition="{
        duration: 1.5,
        repeat: Infinity,
        delay: i * 0.2,
        ease: 'easeInOut'
      }"
    />
  </div>
</template>
