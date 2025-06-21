<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css' // vue-sonner v2 requires this import
</script>

<template>
  <div>
    <Toaster position='top-center' class="pointer-events-auto"/>
    <RouterView />
  </div>
</template>

<style scoped>

</style>
