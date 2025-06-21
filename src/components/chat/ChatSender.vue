<!-- 发送框组件 -->
<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  ArrowUp,
  Atom,
  CirclePause,
  Globe,
  ImageUp,
  Paperclip,
  Plus,
} from 'lucide-vue-next';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'


const model = defineModel<{
  value: string
}>()

const props = defineProps<{
  loading: boolean
}>();

const emits = defineEmits<{
  onSubmit: [message: string, openReasoning: boolean, openSearch: boolean],
  onCancel:[],
}>();

const input = ref<string>(model.value?.value || '');
const openReasoning = ref(false);
const openSearch = ref(false);

// 监听 model.value 变化并更新本地状态
watch(
  () => model.value,
  (newValue) => {
    input.value = newValue?.value || '';
  }
);

// 切换深度思考模式
const toggleReasoning = () => {
  openReasoning.value = !openReasoning.value;
};

// 切换联网搜索模式
const toggleSearch = () => {
  openSearch.value = !openSearch.value;
};

// 处理 Enter 键按下事件
const handleEnter = () => {
  handleSubmit()
};

// 提交消息
const handleSubmit = () => {
  emits('onSubmit',input.value, openReasoning.value, openSearch.value);
  input.value = '';
};

// 停止消息
const handleCancel = () => {
  emits('onCancel');
};

</script>

<template>
  <div class="max-w-2xl w-full mx-auto fixed bottom-7 bg-background rounded-2xl
             outline-1 focus-within:outline-2 -outline-offset-1 focus-within:-outline-offset-2
             outline-muted-foreground/50 focus-within:outline-primary"
  >
    <!-- 输入框 -->
    <Textarea
      v-model="input"
      class="max-h-[150px] w-full border-none shadow-none resize-none focus-visible:ring-transparent mt-1 p-3"
      placeholder="请输入你的问题..."
      @keydown.enter.prevent="handleEnter"
    ></Textarea>

    <div class="flex items-center space-x-2 py-2 px-4">
      <!-- 上传 -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button 
            class="h-7 w-7 rounded-full cursor-pointer"
            variant="outline"
          >
            <Plus />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-(--radix-dropdown-menu-trigger-width) min-w-30 rounded-lg"
          side="top"
          align="end"
          :side-offset="10"
          :align-offset="-50"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Paperclip />
              上传文档
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ImageUp />
              上图片
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <!-- 深度思考 -->
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              class="h-7 cursor-pointer"
              :class="{
                'bg-primary/30 text-primary hover:bg-primary/30 hover:text-primary': openReasoning
              }"
              variant="outline"
              @click="toggleReasoning"
            >
              <Atom />
              <span class="text-sm">深度思考</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent v-if="!openReasoning" side="bottom">
            <span class="text-primary-foreground">深度思考</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <!-- 联网搜索 -->
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            class="h-7 cursor-pointer"
            :class="{
              'bg-primary/30 text-primary hover:bg-primary/30 hover:text-primary': openSearch
            }"
            variant="outline"
            @click="toggleSearch"
          >
            <Globe />
            <span>搜索</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent v-if="!openSearch" side="right">
          <span class="text-primary-foreground">联网搜索</span>
        </TooltipContent>
      </Tooltip>

      <!-- 发送 -->
      <template v-if="!loading">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              class="h-7 w-7 rounded-full cursor-pointer active:bg-primary ml-auto"
              size="icon"
              type="submit"
              :disabled="!input && !loading"
              @click="handleSubmit"
            >
              <ArrowUp />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span class="text-primary-foreground">发送</span>
          </TooltipContent>
        </Tooltip>
      </template>
      <!-- 停止 -->
      <template v-else>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              class="h-7 w-7 rounded-full cursor-pointer active:bg-primary ml-auto"
              size="icon"
              type="submit"
              @click="handleCancel"
            >
              <CirclePause />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span class="text-primary-foreground">停止</span>
          </TooltipContent>
        </Tooltip>
      </template>

    </div>
  </div>
</template>

<style scoped>

</style>