<script setup lang="ts">
import { ref, watch, onUnmounted, onMounted } from 'vue'

import { fetchEventSource } from '@microsoft/fetch-event-source'
import { useAuth } from '@/composables/useAuth.ts'
import { queryMessageListAPI, saveChatAPI, saveVoteAPI } from '@/apis/chat/chatApi.ts'
import ChatHeader from '@/components/chat/ChatHeader.vue'
import ChatMessages from '@/components/chat/ChatMessages.vue'
import InitWelcome from '@/components/chat/InitWelcome.vue'
import ChatSender from '@/components/chat/ChatSender.vue'
import ChatFooter from '@/components/chat/ChatFooter.vue'
import type { MessageVo } from '@/types/chat/chatModel.ts'
import { snowflake } from '@/utils/snowflake.ts'
import { useRoute } from 'vue-router'

const route = useRoute()
const { user } = useAuth()

const chatId = ref<string>( '')
const messages = ref<MessageVo[]>([])
const input = ref('')
const loading = ref(false)
console.log('init chat')


// 初始化加载
onMounted(() => {
  try {
    const id = route.params.chatId.toString()
    if (id) {
      console.log('init chatId:', chatId)
      chatId.value = id

      initMessage()
    }
  } catch (e) {
    console.log('init error:', e)
  }
})

const initMessage = async () => {
  const resp = await queryMessageListAPI(chatId.value)
  messages.value = resp.data
  console.log('init messages:', JSON.stringify(messages))
}

// 监听 chatId 变化，更新 messages
watch(chatId, (newChatId) => {
  console.log('newChatId:', newChatId)
  initMessage()
})

// 监听路径变化，更新 chatId
watch(
  () => route.path.trim(),
  (newPath) => {
    console.log('newPath:', newPath)
    if (newPath.startsWith('/chat')) {
      const newChatId = newPath.substring('/chat'.length).trim()
      if (newChatId) {
        console.log('从路径中提取的 chatId:', newChatId)
        chatId.value = newChatId
      }
    }
  },
)

// 初始化 AbortController
let controller = new AbortController()
// 清理函数：组件卸载时取消请求
onUnmounted(() => {
  controller.abort('组件卸载，取消请求')
})

// 发送消息
const handleSubmit = async (message: string, openReasoning: boolean, openSearch: boolean) => {
  if (!message.trim()) return

  let currentChatId = chatId.value

  if (!currentChatId) {
    const chatName = message.length > 10 ? message.substring(0, 15) : message

    try {
      const resp = await saveChatAPI({ chatId: currentChatId, chatName })

      if (resp.code === 200 && resp.data) {
        chatId.value = resp.data
        currentChatId = resp.data

        // 更新 URL
        window.history.replaceState({}, '', `/chat/${currentChatId}`)

        // 延迟执行流式聊天
        setTimeout(async () => {
          await streamChat(currentChatId, message, openReasoning, openSearch)
        }, 500)
      } else {
        console.error('添加会话失败')
      }
    } catch (error) {
      console.error('保存会话失败:', error)
    }
  } else {
    await streamChat(currentChatId, message, openReasoning, openSearch)
  }
}

// 流式聊天处理
const streamChat = async (
  id: string,
  message: string,
  openReasoning: boolean,
  openSearch: boolean,
) => {
  const userMessage = {
    msgId: snowflake.generate().toString(),
    chatId: id,
    type: 'user',
    role: 'user',
    content: message,
    reasoningContent: '',
    modelId: '',
  }

  messages.value = [...messages.value, userMessage]

  input.value = ''
  loading.value = true

  const aiMessage = {
    msgId: snowflake.generate().toString(),
    chatId: id,
    type: 'ai',
    role: 'assistant',
    content: '',
    reasoningContent: '',
    modelId: '',
    loading: true,
  }

  messages.value = [...messages.value, aiMessage]

  try {
    const streamChatUrl = import.meta.env.VITE_API_BASE_URL + '/sse/chat/streamChat'
    await fetchEventSource(streamChatUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token || ''}`,
      },
      body: JSON.stringify({
        chatId: id,
        content: message,
        modelId: '',
        openReasoning,
        openSearch,
      }),
      signal: controller.signal, // 控制停止
      openWhenHidden: true, // 在调用失败时禁止重复调用

      onopen(response) {
        console.log('onopen:', response)
        return Promise.resolve()
      },
      onmessage(event) {
        console.debug('onmessage:', event)
        const data = JSON.parse(event.data)

        if (data.reasoningContent) {
          messages.value = messages.value.map((msg, index) => {
            if (index === messages.value.length - 1 && msg.role === 'assistant') {
              return {
                ...msg,
                content: msg.content || '',
                reasoningContent: (msg.reasoningContent || '') + (data.reasoningContent || ''),
              }
            }
            return msg
          })
        }

        if (data.content) {
          messages.value = messages.value.map((msg, index) => {
            if (index === messages.value.length - 1 && msg.role === 'assistant') {
              return {
                ...msg,
                content: msg.content + data.content,
                reasoningContent: msg.reasoningContent,
              }
            }
            return msg
          })
        }
      },
      onclose() {
        console.log('onclose')
        loading.value = false

        messages.value = messages.value.map((msg, index) => {
          if (index === messages.value.length - 1 && msg.role === 'assistant') {
            return {
              ...msg,
              loading: false,
            }
          }
          return msg
        })
      },
      onerror(error) {
        console.error('error:', error)
        loading.value = false
      },
    })
  } catch (error) {
    console.error('流式聊天错误:', error)
    loading.value = false
  }
}

// 停止回答
const handleCancel = () => {
  console.log('停止回答')
  loading.value = false
  controller.abort('手动停止')
}

// 喜欢/不喜欢
const handleSaveVote = async (msgId: string, voteType: string) => {
  try {
    const resp = await saveVoteAPI({ contentId: msgId, voteType })

    if (resp.code === 200) {
      console.log('点赞成功')
    } else {
      console.error('点赞失败')
    }
  } catch (error) {
    console.error('保存投票失败:', error)
  }
}
</script>

<template>
  <div>
    <!-- 头部 -->
    <ChatHeader />

    <div class="h-lvh w-full flex flex-col justify-center items-center">
      <ChatMessages
        v-if="chatId"
        :chat-id="chatId"
        :messages="messages"
        @like="handleSaveVote"
        @dislike="handleSaveVote"
      />
      <InitWelcome v-else />
    </div>

    <!-- 发送框 -->
    <ChatSender
      v-model:value="input"
      :loading="loading"
      @onSubmit="handleSubmit"
      @onCancel="handleCancel"
    />

    <!-- 页脚 -->
    <ChatFooter />
  </div>
</template>

<style scoped></style>
