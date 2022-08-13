export interface Message {
  id: number
  is_read: boolean
  message: string
  receiver: number | null
  sender: number
  ticket: number
  timestamp: string
  file: string | null
}

export interface Chat {
  id: number
  order: number
  title: string
  unread_msgs_count: number
  is_active: boolean
  messages: Message[]
}

export interface CreateChat {
  orderId: number
  title?: string
  isActive?: boolean
}

export interface ChangeChat {
  chatId: number
  isActive?: boolean
}

export interface CreateMessage {
  chatId: number
  message: string
  file: File | null
}

export interface ChangeMessage {
  chatId: number
  messageId: number
  message: string
  isRead?: boolean
}
