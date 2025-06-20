<script setup lang="ts">
import { useSidebar } from '@/components/ui/sidebar'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

const { open } = useSidebar()
const appName = import.meta.env.VITE_APP_NAME
</script>

<template>
  <RouterLink to="/">
    <div class="flex gap-3 justify-start items-center mx-auto cursor-pointer w-7/8">
      <Avatar class="h-8 w-8 rounded-lg">
        <AvatarImage src="src/assets/logo.svg" alt="dw" />
      </Avatar>
      <template v-if="open">
        <span class="dark:invert text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          {{appName}}
        </span>
      </template>
    </div>
  </RouterLink>
</template>

<style scoped></style>
