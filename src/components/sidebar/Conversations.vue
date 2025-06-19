<script setup lang="ts">
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'vue-sonner'
import { MoreHorizontal } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useAuth } from '@/composables/useAuth.ts'
import { deleteChatAPI, queryChatPageAPI, saveChatAPI } from '@/apis/chat/chatApi.ts'
import type { ApiResponse } from '@/types'
import type { ChatRecordVO } from '@/types/chat/chatModel.ts'
import MenuEditItem from '@/components/sidebar/MenuEditItem.vue'
import MenuDeleteItem from '@/components/sidebar/MenuDeleteItem.vue'

const route = useRoute()
const chatId = route.params.chatId
const router = useRouter()
const { open } = useSidebar()
const { user } = useAuth()

const selectedChatId = ref<string>('')
const conversations = ref<ChatRecordVO[]>([])

// 初始化加载
onMounted(() => {
  initConversations()
})

const initConversations = async () => {
  const data = await queryConversations()
  conversations.value = data
}

/**
 * 查询会话记录列表
 */
const queryConversations = async () => {
  const resp = await queryChatPageAPI({
    pageNum: 1,
    pageSize: 100,
    chatName: '',
  })
  return resp.data.list
}

// 新增会话
const handleAdd = async ({ chatName }: { chatName: string }) => {
  if (!chatName) {
    return
  }

  const resp: ApiResponse = await saveChatAPI({ chatId: '', chatName })
  if (resp.code === 200) {
    console.log('新增会话成功')
  } else {
    console.error('新增会话失败')
  }
}

// 重命名会话
const handleRename = async (chatId: string, chatName: string) => {
  const resp: ApiResponse = await saveChatAPI({ chatId, chatName })

  if (resp.code === 200) {
    toast.success('修改会话成功')
    await initConversations()
  } else {
    toast.error('修改会话失败')
  }
}

// 删除会话
const handleDelete = async (deleteChatId: string) => {
  if (!deleteChatId) {
    return
  }

  const resp: ApiResponse = await deleteChatAPI(deleteChatId)

  if (resp.code === 200) {
    toast.success('删除会话成功')
    if (deleteChatId === chatId?.toString()) {
      router.push('/')
    } else {
      await initConversations()
    }
  } else {
    toast.error('删除会话失败')
  }
}

const onSelectChat = (id: string) => {
  selectedChatId.value = id
  router.push(`/chat/${id}`)
}
</script>

<template>
  <template v-if="open">
    <ScrollArea class="h-full">
      <SidebarGroup>
        <SidebarGroupLabel>今天</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="(item, index) in conversations" :key="item.chatId">
              <SidebarMenuButton
                as-child
                class="cursor-pointer"
                :isActive="item.chatId === selectedChatId"
                @click="onSelectChat(item.chatId)"
              >
                <span>{{ item.chatName }}</span>
              </SidebarMenuButton>

              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <SidebarMenuAction class="cursor-pointer">
                    <MoreHorizontal />
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="end">
                  <MenuEditItem
                    :chatId="item.chatId"
                    :chatName="item.chatName"
                    @on-edit-record="(id, name) => handleRename(id, name)"
                  />
                  <MenuDeleteItem
                    :chatId="item.chatId"
                    @on-delete="handleDelete(item.chatId)"
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </ScrollArea>
  </template>
</template>

<style scoped></style>
