import { API } from 'core'

import {
  FetchChatsRes,
  CreateChatReq,
  ChatTicket,
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
      ticket: ticketId,
      sender: senderId,
      receiver: receiverId
    } = messageItem

    return {
      id,
      ticketId,
      senderId,
      receiverId,
      dateTime,
      message,
      isRead
    }
  })
}

export const fetchChatMessages = async ({
  ticketId,
  senderId,
  receiverId,
  page
}: FetchChatMessagesReq) => {
  const {
    data: { results: messages, ...rest }
  } = await API.get<FetchChatMessagesRes>(`${rootPath}/message/`, {
    params: { ticket: ticketId, sender: senderId, receiver: receiverId, page }
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
      const { results: messages } = await fetchChatMessages({ ticketId: id, page: 1 })

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
  return API.get<ChatTicket>(`${rootPath}/${ticketId}/`)
}

export const createMassage = ({
  ticketId,
  receiverId,
  senderId,
  message,
  isRead
}: CreateMessageReq) => {
  return API.post(`${rootPath}/message/`, {
    ticket: ticketId,
    receiver: receiverId,
    sender: senderId,
    message,
    is_read: isRead
  })
}
