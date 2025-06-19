<script setup lang="ts">
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { Plus } from 'lucide-vue-next';
import { useRouter } from 'vue-router'

const router = useRouter()

const onAdd = () => {
  router.push('/')
}

</script>

<template>
  <SidebarMenuButton
    class="w-4/5 mx-auto my-3 cursor-pointer bg-sidebar-primary
    hover:bg-sidebar-primary/80 active:bg-sidebar-primary text-sidebar-primary-foreground
    hover:text-sidebar-primary-foreground active:text-sidebar-primary-foreground"
    tooltip="新建会话"
    @click="onAdd"
  >
    <Plus class="ml-auto"/>
    <span class="mr-auto"> 新建会话 </span>
  </SidebarMenuButton>
</template>

<style scoped></style>
