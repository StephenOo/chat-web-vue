<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useAuth } from '@/composables/useAuth.ts'
import Logo from '@/components/sidebar/Logo.vue'
const {logout} = useAuth()

</script>

<template>
<div class="text-center">
  sidebar
  <Button @click="async () => { await logout()}">
    退出
  </Button>

  <Logo/>
</div>
</template>

<style scoped>

</style>