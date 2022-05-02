import Typography from '@mui/material/Typography'
import Skeleton from 'react-loading-skeleton'

import * as S from './List.styled'

interface ChatItem {
  id: number
  title: string
  unreadMessNumber?: number
  lastMessage?: {
    dateTime: Date
    message: string
  }
}

interface ChatListProps {
  chats?: ChatItem[]
  isLoading: boolean
  onChatOpen: (id: number) => void
}

export const ChatList = ({ chats, isLoading, onChatOpen }: ChatListProps) => {
  const chatItems = chats?.map(({ id, title, unreadMessNumber, lastMessage }) => {
    const { message = '', dateTime = '' } = lastMessage || {}

    return (
      <S.Item
        key={id}
        onClick={() => {
          onChatOpen(id)
        }}
      >
        <S.ItemTop>
          <S.Title>{title}</S.Title>
          {dateTime && <S.Date>{new Date(dateTime).toLocaleDateString()}</S.Date>}
        </S.ItemTop>

        {message && <Typography>{message}</Typography>}

        {unreadMessNumber !== 0 && (
          <S.UnreadMessageCounter>
            <span>{unreadMessNumber}</span>
          </S.UnreadMessageCounter>
        )}
      </S.Item>
    )
  })

  if (isLoading) {
    return (
      <S.ChatList>
        <Skeleton height="100%" />
      </S.ChatList>
    )
  }

  return (
    <S.ChatList>
      {chatItems?.length ? (
        chatItems
      ) : (
        <Typography variant="h4" component="p">
          Чаты отсутствуют
        </Typography>
      )}
    </S.ChatList>
  )
}
