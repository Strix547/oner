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

export interface ChatTicket {
  id: number
  title: string
  is_active: boolean
  order: number
}

export interface Message {
  id: number
  message: string
  timestamp: Date
  is_read: boolean
  ticket: number
  sender: number
  receiver: number
}

export type FetchChatsRes = ResponsePagination<ChatTicket[]>

export type FetchChatMessagesRes = ResponsePagination<Message[]>

export interface CreateMessageReq {
  ticketId: number
  senderId?: number
  receiverId?: number
  message: string
  isRead?: boolean
}

export interface FetchChatMessagesReq {
  ticketId?: number
  senderId?: number
  receiverId?: number
  page: number
}
