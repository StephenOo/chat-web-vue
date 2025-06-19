<script setup lang="ts">

import SidebarIndex from '@/views/sidebar/SidebarIndex.vue'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import ChatSidebar from '@/components/sidebar/ChatSidebar.vue'
</script>

<template>
  <SidebarProvider>
<!--    <div class="text-center">layout</div>
    <SidebarIndex/>-->
    <ChatSidebar/>

    <SidebarInset>
      <RouterView/>
    </SidebarInset>

  </SidebarProvider>

</template>

<style scoped>

</style>