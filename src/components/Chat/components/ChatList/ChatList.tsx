import Typography from '@mui/material/Typography'

import { Skeleton } from 'ui'

import { useUser } from 'hooks'
import { Chat } from 'types/chat'

import * as S from './ChatList.styled'

interface ChatListProps {
  chats?: Chat[]
  isLoading: boolean
  onChatOpen: (id: number) => void
}

export const ChatList = ({ chats = [], isLoading, onChatOpen }: ChatListProps) => {
  const user = useUser()

  const chatItems = chats?.map((chat) => {
    const { id, orderId, messages } = chat
    const lastMessage = messages[messages.length - 1]

    const unreadMessages = messages.filter((message) => {
      const { isRead, senderId } = message

      if (isRead) return

      return senderId !== user.id
    })

    return (
      <S.ChatItem
        key={id}
        onClick={() => {
          onChatOpen(id)
        }}
      >
        <S.ChatItemTop>
          <S.Title>Заказ №{orderId}</S.Title>

          {lastMessage && <S.Date>{new Date(lastMessage.dateTime).toLocaleDateString()}</S.Date>}
        </S.ChatItemTop>

        {lastMessage && <Typography>{lastMessage.message}</Typography>}

        {unreadMessages.length !== 0 && (
          <S.UnreadMessageCounter>
            <span>{unreadMessages.length}</span>
          </S.UnreadMessageCounter>
        )}
      </S.ChatItem>
    )
  })

  if (isLoading) {
    return (
      <S.ChatList>
        <Skeleton count={3} height={75} style={{ marginBottom: 10 }} />
      </S.ChatList>
    )
  }

  return (
    <S.ChatList>
      {chats.length ? (
        chatItems
      ) : (
        <Typography variant="h4" component="p">
          Чаты отсутствуют
        </Typography>
      )}
    </S.ChatList>
  )
}
