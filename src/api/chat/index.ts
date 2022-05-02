import { API } from 'core'

import { withBasePath } from 'utils'

import {
  CreateChatReq,
  Chat,
  FetchChatMessagesRes,
  CreateMessageReq,
  FetchChatMessagesReq,
  Message
} from './types'

const rootPath = '/chat'

const transformMessages = (messages: Message[]) => {
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
      file: file && withBasePath(file)
    }
  })
}

const transformChats = (chats: Chat[]) => {
  return chats.map((chat) => {
    const {
      id,
      is_active: isActive,
      messages,
      order: orderId,
      title,
      unread_msgs_count: unreadMessNumber
    } = chat

    return {
      id,
      orderId,
      title,
      isActive,
      unreadMessNumber,
      messages: transformMessages(messages).reverse()
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

export const fetchChats = async () => {
  const { data: chats } = await API.get<Chat[]>(`${rootPath}/chat/`)

  return transformChats(chats)
}

export const createChat = ({ orderId, title, isActive }: CreateChatReq) => {
  return API.post(`${rootPath}/chat/`, { order: orderId, title, is_active: isActive })
}

export const fetchChat = (ticketId: number) => {
  return API.get<Chat>(`${rootPath}/${ticketId}/`)
}

export const createMassage = async ({ chatId, message, file }: CreateMessageReq) => {
  const transformMessage = (mess: Message) => {
    const {
      id,
      message,
      timestamp: dateTime,
      is_read: isRead,
      ticket: chatId,
      sender: senderId,
      receiver: receiverId,
      file
    } = mess

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
  }

  const formData = new FormData()
  formData.append('message', message)
  formData.append('ticket', String(chatId))

  if (file) {
    formData.append('file', file)
  }

  const { data: newMessage } = await API.post<Message>(`${rootPath}/message/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return transformMessage(newMessage)
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
