<script setup lang="ts">
import TypingDots from './TypingDots.vue'
import { computed } from 'vue'

interface LoadingProps {
  text?: string
  className?: string
}

const props = withDefaults(defineProps<LoadingProps>(), {
  text: 'loading...',
  className: '',
})
</script>

<template>
  <div :class="`flex flex-col items-center justify-center space-y-2 ${props.className}`">
    <div v-motion :initial="{ opacity: 0 }" :animate="{ opacity: 0.8 }">
      <TypingDots />
    </div>
    <p class="text-sm text-muted-foreground ml-3">{{ props.text }}</p>
  </div>
</template>
