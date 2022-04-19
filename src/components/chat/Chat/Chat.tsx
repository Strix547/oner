import Typography from '@mui/material/Typography'

import { Button } from 'ui'
import { ChatInput } from '../Input'

import * as S from './Chat.styled'

type Sender = 'me' | 'companion'

interface Message {
  id: number
  message: string
  date: Date
  sender: Sender
}

interface ChatProps {
  title: string
  messages: Message[]
}

export const Chat = ({ title, messages }: ChatProps) => {
  const messagesItems = messages.map(({ id, date, message, sender }, idx) => {
    const nextMessSender = messages[idx + 1]?.sender
    const isntLatMessage = messages.length - 1 !== idx

    return (
      <S.Message
        key={id}
        sender={sender}
        style={
          isntLatMessage
            ? {
                marginBottom: nextMessSender === sender ? 5 : 20
              }
            : {}
        }
      >
        <Typography>{message}</Typography>
        <S.MessageTime>{date.toLocaleTimeString().slice(0, 5)}</S.MessageTime>
      </S.Message>
    )
  })

  return (
    <S.Chat>
      <S.Top>
        <Typography variant="body2">{title}</Typography>
        <Button variant="outlined">Завершить диалог</Button>
      </S.Top>

      <S.Content>
        <S.MessagesContainer>
          <S.MessagesList>{messagesItems}</S.MessagesList>
        </S.MessagesContainer>

        <ChatInput />
      </S.Content>
    </S.Chat>
  )
}
