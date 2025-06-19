<script setup lang="ts">
import { useAuth } from '@/composables/useAuth.ts'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { BadgeCheck, ChevronsUpDown, LogOut, User, Settings } from 'lucide-vue-next'
import { Icon } from '@iconify/vue'
import ThemeToggle from '@/components/sidebar/ThemeToggle.vue'


const { open, isMobile } = useSidebar()
const { logout } = useAuth()
const { user } = useAuth()

// 退出登录
const onLogout = async () => {
  await logout()
}
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem class="flex justify-start gap-5" :class="{'flex-col-reverse gap-3': !open }">
      <!-- 用户信息 -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton class="w-30">
            <User />
            <span>{{ user?.username }}</span>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-(--radix-dropdown-menu-trigger-width) min-w-40 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :sideOffset="-20"
          :alignOffset="50"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheck />
              账号
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              设置
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="onLogout">
            <LogOut />
            <span>退出</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <!-- Github -->
      <SidebarMenuButton class="w-8 h-8 ml-auto p-1 cursor-pointer">
        <a key="github_link" href="https://github.com/dawei1898/dw-chat-web-vue" target="_blank">
          <Icon icon="la:github" width="24" height="24" />
        </a>
      </SidebarMenuButton>

      <!-- 切换亮暗 -->
      <ThemeToggle />
    </SidebarMenuItem>
  </SidebarMenu>
</template>

<style scoped></style>
