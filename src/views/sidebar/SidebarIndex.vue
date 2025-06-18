<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useAuth } from '@/composables/useAuth.ts'
const {logout} = useAuth()

</script>

<template>
<div class="text-center">
  sidebar
  <Button @click="async () => { await logout()}">
    退出
  </Button>
</div>
</template>

<style scoped>

</style>