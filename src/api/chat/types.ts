interface ResponsePagination<T> {
  count: number
  next: string | null
  previous: string | null
  results: T
}

export interface CreateChatReq {
  title: string
  orderId: number
  isActive?: boolean
}

export interface Chat {
  id: number
  title: string
  is_active: boolean
  order: number
}

export interface MessageRes {
  id: number
  message: string
  timestamp: Date
  is_read: boolean
  ticket: number
  sender: number
  receiver: number | null
  file: string | null
}

export type FetchChatsRes = ResponsePagination<Chat[]>

export type FetchChatMessagesRes = ResponsePagination<MessageRes[] | []>

export interface CreateMessageReq {
  chatId: number
  message: string
  file: File | null
}

export interface FetchChatMessagesReq {
  chatId: number
  page: number
}
