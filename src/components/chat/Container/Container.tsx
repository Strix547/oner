import { useState } from 'react'

import { ChatList } from '../List'
import { Chat } from '../Chat'

import * as S from './Container.styled'

interface Message {
  id: number
  receiverId?: number
  senderId?: number
  ticketId?: number
  dateTime: Date
  isRead: boolean
  message: string
}

interface Chat {
  id: number
  orderId: number
  isActive: boolean
  title: string
  messages: Message[]
}

interface ChatContainerProps {
  chats: Chat[]
}

export const ChatContainer = () => {
  const [openedChat, setOpenedChat] = useState()

  const chats = [
    {
      id: 1,
      title: 'Заказ №178395030',
      date: new Date(),
      lastMessText: 'Для поиска товаров вы можете сделать например что угодно в поиске набрать'
    },
    {
      id: 2,
      title: 'Заказ №178395030',
      date: new Date(),
      lastMessText: 'Для поиска товаров вы можете сделать например что угодно в поиске набрать',
      unreadMessNumber: 3
    },
    {
      id: 3,
      title: 'Заказ №178395030',
      date: new Date(),
      lastMessText: 'Для поиска товаров вы можете сделать например что угодно в поиске набрать'
    },
    {
      id: 4,
      title: 'Заказ №178395030',
      date: new Date(),
      lastMessText: 'Для поиска товаров вы можете сделать например что угодно в поиске набрать'
    }
  ]

  const messages: Message[] = [
    {
      id: 1,
      message:
        'Мы предлагаем полный ассортимент запчастей для иномарок — оригинальные, неоригинальные высококачественные аналоги, бюджетные запчасти. В нашем ассортементе вся номенклатура запчастей для автомобилей ВАЗ и УАЗ от официальных дистрибьюторов.',
      date: new Date(),
      sender: 'me'
    },
    {
      id: 2,
      message: 'Товар еще не включен в наш ассортимент.',
      date: new Date(),
      sender: 'companion'
    },
    {
      id: 3,
      message:
        'У нас вы можете найти редкие запчасти на автомобили снятые с производства. Автозапчасти.ру работает с крупнейшими поставщиками запчастей Москвы, Санкт-Петербурга и Нижнего Новгорода.',
      date: new Date(),
      sender: 'me'
    },
    {
      id: 4,
      message: 'Срок комплектования согласовывается после оформления заказа.',
      date: new Date(),
      sender: 'me'
    },
    {
      id: 5,
      message: 'Срок комплектования согласовывается после оформления заказа.',
      date: new Date(),
      sender: 'me'
    },
    {
      id: 6,
      message: 'Срок комплектования согласовывается после оформления заказа.',
      date: new Date(),
      sender: 'me'
    }
  ]

  return (
    <S.ChatContainer>
      <ChatList chats={chats} />

      <Chat title="Заказ №178395030" messages={messages} />
    </S.ChatContainer>
  )
}
