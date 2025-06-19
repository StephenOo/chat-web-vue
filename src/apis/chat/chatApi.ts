import {httpInstance} from "@/utils/httpUtil";
import type { ApiResponse, PageResult } from '@/types'
import type { ChatRecord, ChatRecordVO, MessageVo, RecordPageParam, VoteParam } from '@/types/chat/chatModel.ts'


/**
 * 查询会话列表 API
 */
export function queryChatPageAPI(param: RecordPageParam) {
  const url = `/chat/queryChatPage`;
    return httpInstance.post<any, ApiResponse<PageResult<ChatRecordVO>>>(url, param)
}


/**
 * 保存会话 API
 */
export const  saveChatAPI = async (param: ChatRecord) => {
  const url = `/chat/saveChat`;
  return httpInstance.post<any, ApiResponse<string>>(url, param)
}


/**
 * 删除会话 API
 */
export const  deleteChatAPI = async (chatId: string) => {
  const url = `/chat/deleteChat/${chatId}`;
  return httpInstance.delete<any, ApiResponse<number>>(url)
}


/**
 * 查询当前会话消息列表
 */
export const  queryMessageListAPI = async (chatId: string) => {
  const url = `/chat/queryMessageList/${chatId}`;
  return httpInstance.get<any, ApiResponse<MessageVo[]>>(url)
}


/**
 * 点赞/踩 API
 */
export const  saveVoteAPI = async (param: VoteParam) => {
  const url = "/vote/saveVote";
  return httpInstance.post<any, ApiResponse<string>>(url, param)
}
