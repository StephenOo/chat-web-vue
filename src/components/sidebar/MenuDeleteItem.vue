<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Trash2 } from 'lucide-vue-next'


// 从父组件传递进来的属性
const props = defineProps<{
  chatId: string
}>()

// 从父组件传递进来方法
const emit = defineEmits<{
  onDelete: [chatId: string]
}>()

const open = ref<boolean>(false)

const onSure = () => {
  emit('onDelete', props.chatId)
  open.value = false
}

// 取消
const onCancel = () => {
  open.value = false
}
</script>

<template>
  <Dialog :open="open">
    <DialogTrigger asChild>
      <DropdownMenuItem
        class='cursor-pointer'
        @select="(e: Event) => {
            e.preventDefault()
            open = true
          }"
      >
      <Trash2/>
      <span>删除</span>
      </DropdownMenuItem>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>永久删除对话</DialogTitle>
      </DialogHeader>
      <p>
        删除后，该对话不可恢复，确认删除吗？
      </p>
      <DialogFooter>
        <Button
          class='cursor-pointer'
          variant='outline'
          @click="onCancel"
        >
        取消
        </Button>
        <Button
          class='cursor-pointer'
          type="submit"
          variant='destructive'
          @click="onSure"
        >
        删除
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>

</style>