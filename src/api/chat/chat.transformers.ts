import * as ApiTypes from './chat.types'
import { Message, Chat } from 'types/chat'

import { withBasePath } from 'utils'

const transformMessages = (messages: ApiTypes.Message[]): Message[] => {
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
      file: file ? withBasePath(file) : null
    }
  })
}

export const transformChats = (chats: ApiTypes.Chat[]): Chat[] => {
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
