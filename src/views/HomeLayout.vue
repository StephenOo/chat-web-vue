<script setup lang="ts">

import SidebarIndex from '@/views/sidebar/SidebarIndex.vue'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import ChatSidebar from '@/components/sidebar/ChatSidebar.vue'
</script>

<template>
  <SidebarProvider>
    <SidebarIndex/>

    <SidebarInset>
      <RouterView/>
    </SidebarInset>

  </SidebarProvider>

</template>

<style scoped>

</style>