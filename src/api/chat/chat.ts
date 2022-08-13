import { API } from 'core'

import { transformChats } from './chat.transformers'
import { Chat, Message, CreateChat, ChangeChat, CreateMessage, ChangeMessage } from './chat.types'

const root = '/chat'

export const getChats = async () => {
  const { data: chats } = await API.get<Chat[]>(`${root}/chat/`)

  return transformChats(chats)
}

export const createChat = ({ orderId, title = `#${orderId}`, isActive = true }: CreateChat) => {
  return API.post(`${root}/chat/`, { order: orderId, title, is_active: isActive })
}

export const changeChat = ({ chatId, isActive }: ChangeChat) => {
  return API.patch(`${root}/chat/${chatId}/`, { is_active: isActive })
}

export const createMassage = ({ chatId, message, file }: CreateMessage) => {
  const formData = new FormData()
  formData.append('message', message)
  formData.append('ticket', String(chatId))

  if (file) {
    formData.append('file', file)
  }

  return API.post<Message>(`${root}/message/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const changeMessage = ({ chatId, messageId, message, isRead }: ChangeMessage) => {
  const formData = new FormData()
  formData.append('chatId', String(chatId))
  formData.append('id', String(messageId))
  formData.append('message', message)
  formData.append('is_read', String(isRead))

  return API.patch(`${root}/message/${messageId}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
