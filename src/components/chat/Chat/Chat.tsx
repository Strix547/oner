import { useState } from 'react'
import Typography from '@mui/material/Typography'

import { ChatList } from '../List'
import { ChatDialog } from '../Dialog'

import { useAuth } from 'hooks'

import { Chat as IChat } from '../types'

import * as S from './Chat.styled'

type OpenedChatId = number | null

interface ChatProps {
  chats: IChat[] | []
}

export const Chat = ({ chats }: ChatProps) => {
  const { user } = useAuth()
  const [openedChatId, setOpenedChatId] = useState<OpenedChatId>(null)

  const chatListItems = chats?.map(({ id, title, messages }) => {
    const unreadedMessNumber = messages.filter(
      ({ isRead, senderId }) => senderId !== user?.id && !isRead
    ).length
    const lastMessage = messages[messages.length - 1]

    return {
      id,
      title: `Заказ ${title}`,
      unreadMessNumber: unreadedMessNumber,
      lastMessage: {
        dateTime: lastMessage?.dateTime,
        message: lastMessage?.message
      }
    }
  })

  const renderOpenedDialog = (chats: IChat[], openedChatId: OpenedChatId) => {
    const openedChat = chats.find(({ id }) => id === openedChatId) as IChat
    const { id, title, messages, isActive } = openedChat

    return (
      <ChatDialog
        id={id}
        isActive={isActive}
        title={title}
        messages={messages}
        onDialogClose={() => {
          setOpenedChatId(null)
        }}
      />
    )
  }

  return (
    <S.Chat>
      <ChatList chats={chatListItems} onChatOpen={setOpenedChatId} />

      {openedChatId ? (
        renderOpenedDialog(chats, openedChatId)
      ) : (
        <S.SelectChatContainer>
          <Typography variant="h4">Выберите чат</Typography>
        </S.SelectChatContainer>
      )}
    </S.Chat>
  )
}
