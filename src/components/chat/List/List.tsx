import Typography from '@mui/material/Typography'

import * as S from './List.styled'

interface ChatItem {
  id: number
  title: string
  date: Date
  lastMessText: string
  unreadMessNumber?: number
}

interface ChatListProps {
  chats: ChatItem[]
}

export const ChatList = ({ chats }: ChatListProps) => {
  const chatItems = chats.map(({ id, title, date, lastMessText, unreadMessNumber }) => {
    return (
      <S.Item key={id}>
        <S.ItemTop>
          <S.Title>{title}</S.Title>
          <S.Date>{date.toLocaleDateString()}</S.Date>
        </S.ItemTop>

        <Typography>{lastMessText}</Typography>

        {unreadMessNumber && (
          <S.UnreadMessageCounter>
            <span>{unreadMessNumber}</span>
          </S.UnreadMessageCounter>
        )}
      </S.Item>
    )
  })

  return <S.ChatList>{chatItems}</S.ChatList>
}
