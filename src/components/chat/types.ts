export interface DialogMessage {
  id: number
  message: string
  dateTime: Date
  sender: 'me' | 'companion'
  file: string | null
}

export interface MessagesByDay {
  date: string
  messages: DialogMessage[]
}

export interface NewMessage {
  message: string
  file: File | null
}

export interface Message {
  id: number
  chatId: number
  senderId: number
  receiverId: number | null
  dateTime: Date
  message: string
  isRead: boolean
  file: string | null
}

export interface Chat {
  id: number
  orderId: number
  title: string
  isActive: boolean
  messages: Message[] | []
}
