<script setup lang="ts">
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<template>
  <div class="p-10 flex gap-2">
    <h3 class="text-2xl font-bold">Test</h3>
    <Button>send</Button>
    <Button variant="outline">click</Button>
    <Button variant="ghost">ghost</Button>
    <ThemeToggle />
  </div>
</template>
