<!-- 消息列表 -->
<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
import ChatBubble from '@/components/chat/ChatBubble.vue'
import type { MessageVo } from '@/types/chat/chatModel.ts'
import { onMounted, ref, watch } from 'vue'


const props = defineProps<{
  chatId?: string,
  messages?: MessageVo[],
}>()

const emits = defineEmits<{
  onLike: [msgId: string, voteType: string]
  onDislike: [msgId: string, voteType: string]
}>()


// 创建 ref
const messagesEndRef = ref<HTMLElement | null>(null);

// 滚动到底部的方法
const scrollToBottom = () => {
  if (messagesEndRef.value) {
    messagesEndRef.value.scrollIntoView({ behavior: 'smooth' });
  }
};

// 组件挂载后首次滚动到底部
onMounted(() => {
  scrollToBottom();
});

// 在 messages 变化时滚动到底部
watch(
  () => props.messages,
  () => {
    scrollToBottom();
  }
);
</script>

<template>
  <ScrollArea class="h-[calc(100%_-_170px)] w-full my-2 mb-auto">
    <div class="h-full max-w-2xl  mx-auto space-y-4">
      <ChatBubble
        v-for="(item, index) in messages"
        :key="item.msgId"
        :msgId="item.msgId"
        :role="item.role === 'user' ? 'user' : 'ai'"
        :reasoningContent="item.reasoningContent || ''"
        :content="item.content"
        :voteType="item.voteType"
        :loading="item.loading"
        @on-like="emits('onLike', item.msgId, 'up')"
        @on-dislike="emits('onDislike', item.msgId, 'down')"
        @on-copy="console.log('Copied')"
      />
    </div>

    <div ref="messagesEndRef"/>
  </ScrollArea>
</template>

<style scoped>

</style>