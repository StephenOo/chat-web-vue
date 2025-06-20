<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { open, toggleSidebar } = useSidebar()
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          data-sidebar="trigger"
          data-slot="sidebar-trigger"
          variant="ghost"
          size="icon"
          :class="cn('h-9 w-9 cursor-pointer', props.class)"
          @click="toggleSidebar"
        >
          <template v-if="open">
            <PanelLeftClose
              class="text-muted-foreground"
              :style="{ width: '20px', height: '20px' }"
            />
          </template>
          <template v-else>
            <PanelLeftOpen
              class="text-muted-foreground h-7 w-7"
              :style="{ width: '20px', height: '20px' }"
            />
          </template>
          <span class="sr-only">Toggle Sidebar</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <span>{{ open ? '收起边栏' : '打开边栏' }}</span>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
