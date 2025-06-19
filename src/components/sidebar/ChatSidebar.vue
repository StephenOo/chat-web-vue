<script setup lang="ts">
import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar'
import Logo from '@/components/sidebar/Logo.vue'
import AddConversation from '@/components/sidebar/AddConversation.vue'
import NavFooter from '@/components/sidebar/NavFooter.vue'
import Conversations from '@/components/sidebar/Conversations.vue'

</script>


<template>
  <Sidebar side="left"  variant="sidebar" collapsible="icon">
    <SidebarHeader class="not-dark:bg-slate-50">
      <SidebarMenu>
        <!-- Logo & Title -->
        <SidebarMenuItem>
          <Logo />
        </SidebarMenuItem>

        <!-- 新建会话 -->
        <SidebarMenuItem>
          <AddConversation />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent class="not-dark:bg-slate-50">
      <!-- 会话列表 -->
      <Conversations />
    </SidebarContent>

    <!--  边栏底部  -->
    <SidebarFooter class="not-dark:bg-slate-50">
      <NavFooter />
    </SidebarFooter>

    <!-- 控制侧边栏右侧分割线实现收起、展开 -->
    <SidebarRail />
  </Sidebar>
</template>

<style scoped></style>
