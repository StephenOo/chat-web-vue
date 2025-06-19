<script setup lang="ts">
import { ref } from 'vue'
import { Edit } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

// 从父组件传递进来的属性
const props = defineProps<{
  chatId: string
  chatName: string
}>()

// 从父组件传递进来方法
const emit = defineEmits<{
  onEditRecord: [chatId: string, chatName: string]
}>()

const open = ref<boolean>(false)
const newChatName = ref<string>(props.chatName)

const onSure = () => {
  emit('onEditRecord', props.chatId, newChatName.value)
  open.value = false
}

// 取消
const onCancel = () => {
  open.value = false
} // 确认
</script>

<template>
  <Dialog :open="open">
    <DialogTrigger asChild>
      <DropdownMenuItem
        class="cursor-pointer"
        @select="(e: Event) => {
            e.preventDefault()
            open = true
          }"
      >
        <Edit />
        <span>编辑</span>
      </DropdownMenuItem>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>重命名会话</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <Input
          id="chatName"
          class="col-span-3"
          v-model="newChatName"
        />
      </div>
      <DialogFooter>
        <Button class="cursor-pointer" variant="outline" @click="onCancel">
          取消
        </Button>
        <Button class="cursor-pointer" @click="onSure">
          确定
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
