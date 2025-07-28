<!-- 消息气泡组件 -->
<script setup lang="ts">
import { ref } from 'vue'
import type { VoteType } from '@/types/chat/chatModel.ts'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Atom, Copy, ChevronUp, ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import DeepSeekIcon from '@/components/icons/DeepSeekIcon.vue'
import Loading from '@/components/chat/Loading.vue'
import { toast } from 'vue-sonner'
import { parseMarkdown } from '@/utils/markdown-parser.ts'

const props = defineProps<{
  msgId: string
  role: 'user' | 'ai'
  content: string // 回答内容
  reasoningContent?: string // 思考内容
  avatarSrc?: string
  voteType?: VoteType
  loading?: boolean
}>()

const emits = defineEmits<{
  onLike: [msgId: string, voteType: string]
  onDislike: [msgId: string, voteType: string]
  onCopy: []
}>()

const isUser = props.role === 'user'
const openReasoning = ref<boolean>(true)
const vote = ref<VoteType>('')

const toggleThinking = () => {
  openReasoning.value = !openReasoning.value
}

/**
 * 文本markdown格式
 */
const markdownContent = (content: string) => {
  return  parseMarkdown(content).toString()
}

/**
 * 复制
 */
const onHandleCopy = () => {
  navigator.clipboard.writeText(props.content)
  emits('onCopy')
  toast.success('已复制')
}

/**
 * 点赞
 */
const onHandelLike = () => {
    const newVote = 'up' ;
    vote.value = newVote
    emits('onLike', props.msgId,  newVote)
    toast.success("感谢您的支持")
}

/**
 * 点踩
 */
const onHandelDisLike = () => {
  const newVote = 'down' ;
  vote.value = newVote
  emits('onDislike', props.msgId,  newVote)
  toast.success("感谢您的反馈")
}

</script>

<template>
  <!-- 用户提问气泡 -->
  <template v-if="isUser">
    <div class="flex justify-end mb-4">
      <div class="max-w-[75%] bg-secondary text-secondary-foreground rounded-lg py-2 px-4">
        <span class="text-sm/6">{{content}}</span>
      </div>
    </div>
  </template>
  <!-- AI 回答气泡 -->
  <template v-else>
    <div class="flex items-start mb-4">
      <!-- AI 头像 -->
      <div
        class="size-8 flex items-center justify-center rounded-full mr-3 ring-1 shrink-0 ring-border bg-background"
      >
        <DeepSeekIcon :size="28" />
      </div>
      <div class="flex flex-col w-full max-w-[95%]">
        <!-- Loading -->
        <template v-if="!reasoningContent && !content">
          <Loading class="mr-auto" />
        </template>

        <!-- 思考内容 -->
        <div v-if="reasoningContent" class="mb-3">
          <Button
            variant="secondary"
            class="flex items-center text-sm text-muted-foreground p-1 h-auto mb-3"
            @click="toggleThinking"
          >
            <Atom :size="16" class="mr-2" />
            领导问述
            <ChevronUp v-if="openReasoning" :size="16" class="ml-2" />
            <ChevronDown v-else :size="16" class="ml-2" />
          </Button>
          <div v-if="openReasoning" class="text-sm border-l-2 my-2 mr-2 pl-4 text-muted-foreground">
            <span class="text-sm/6">{{reasoningContent}}</span>
          </div>
        </div>

        <!-- 回答内容  -->
        <div v-if="content" class="border-1 rounded-lg p-3 text-sm/6">
          <div class=" markdown-css" v-html="markdownContent(content)" />
        </div>

        <!-- 操作按钮 - 只在有消息时显示  -->
        <div
          v-if="content && !loading"
          class="flex items-center space-x-2 mt-2 ml-2 text-muted-foreground"
        >
          <!-- 复制 -->
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="ghost"
                size="icon"
                class="h-7 w-7 cursor-pointer"
                @click="onHandleCopy"
              >
                <Copy :size="14" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <span class="text-primary-foreground">复制</span>
            </TooltipContent>
          </Tooltip>

          <!-- 喜欢 -->
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="ghost"
                size="icon"
                class="h-7 w-7 cursor-pointer"
                @click="onHandelLike"
              >
                <ThumbsUp v-if="vote === 'up'" :size="14" fill="gray" />
                <ThumbsUp v-else :size="14" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <span class="text-primary-foreground">喜欢</span>
            </TooltipContent>
          </Tooltip>

          <!-- 不喜欢 -->
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                class="h-7 w-7 cursor-pointer"
                @click="onHandelDisLike"
              >
                <ThumbsDown v-if="vote === 'down'" :size="14" fill="gray" />
                <ThumbsDown v-else :size="14" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <span class="text-primary-foreground">不喜欢</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped></style>