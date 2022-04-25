import { API } from 'core'

import {
  FetchChatsRes,
  CreateChatReq,
  Chat,
  FetchChatMessagesRes,
  CreateMessageReq,
  FetchChatMessagesReq,
  MessageRes
} from './types'

const rootPath = '/chat'

const transformMessages = (messages: MessageRes[]) => {
  return messages.map((messageItem) => {
    const {
      id,
      message,
      timestamp: dateTime,
      is_read: isRead,
      ticket: chatId,
      sender: senderId,
      receiver: receiverId,
      file
    } = messageItem

    return {
      id,
      chatId,
      senderId,
      receiverId,
      dateTime,
      message,
      isRead,
      file
    }
  })
}

export const fetchChatMessages = async ({ chatId, page }: FetchChatMessagesReq) => {
  const {
    data: { results: messages, ...rest }
  } = await API.get<FetchChatMessagesRes>(`${rootPath}/message/`, {
    params: { ticket: chatId, page }
  })

  return {
    ...rest,
    results: transformMessages(messages)
  }
}

export const fetchChats = async (page: number) => {
  const {
    data: { results: chats, ...rest }
  } = await API.get<FetchChatsRes>(`${rootPath}/chat/`, { params: { page } })

  const chatsWithMessages = await Promise.all(
    chats.map(async ({ id, order, title, is_active }) => {
      const { results: messages } = await fetchChatMessages({ chatId: id, page: 1 })

      return {
        id,
        orderId: order,
        title,
        isActive: is_active,
        messages
      }
    })
  )

  return {
    ...rest,
    results: chatsWithMessages
  }
}

export const createChat = ({ orderId, title, isActive }: CreateChatReq) => {
  return API.post(`${rootPath}/chat/`, { order: orderId, title, is_active: isActive })
}

export const fetchChat = (ticketId: number) => {
  return API.get<Chat>(`${rootPath}/${ticketId}/`)
}

export const createMassage = ({ chatId, message, file }: CreateMessageReq) => {
  const formData = new FormData()
  formData.append('message', message)
  formData.append('ticket', String(chatId))

  if (file) {
    formData.append('file', file)
  }

  return API.post(`${rootPath}/message/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const readMessage = (id: number, chatId: number, message: string) => {
  return API.patch(`${rootPath}/message/${id}/`, {
    id,
    chatId,
    message,
    is_read: true
  })
}

export const endChat = (chatId: number) => {
  return API.patch(`${rootPath}/chat/${chatId}/`, { is_active: false })
}
