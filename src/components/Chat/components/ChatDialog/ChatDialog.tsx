import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Typography from '@mui/material/Typography'

import { Button } from 'ui'
import { MessageInput, MessagesList } from '..'

import { Chat } from 'types/chat'
import { ROUTE_NAMES } from 'core'

import * as S from './ChatDialog.styled'

interface ChatDialogProps {
  chat: Chat
  isMessageSending: boolean
  onMessageSend: (message: string, file: File | null) => void
  onChatEnd: (id: number) => void
}

export const ChatDialog = ({
  chat,
  isMessageSending,
  onMessageSend,
  onChatEnd
}: ChatDialogProps) => {
  const messagesListRef = useRef<HTMLDivElement>(null)

  const { id, isActive, orderId, messages } = chat

  // scroll to bottom after render and new message
  useEffect(() => {
    if (messagesListRef.current) {
      messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight
    }
  }, [messagesListRef, chat])

  return (
    <S.ChatDialog>
      <S.Top>
        <Typography variant="body2">Заказ №{orderId}</Typography>

        {isActive && (
          <Button
            variant="outlined"
            onClick={() => {
              onChatEnd(id)
            }}
          >
            Завершить диалог
          </Button>
        )}
      </S.Top>

      <S.Dialog>
        <MessagesList ref={messagesListRef} messages={messages} />

        {isActive ? (
          <MessageInput isMessageSending={isMessageSending} onMessageSubmit={onMessageSend} />
        ) : (
          <S.DialogueEnded>
            <Typography>Диалог закрыт, для связи с поставщиком напишите в</Typography>

            <Link href={ROUTE_NAMES.SUPPORT} passHref>
              <S.SupportLink>Службу поддержки</S.SupportLink>
            </Link>
          </S.DialogueEnded>
        )}
      </S.Dialog>
    </S.ChatDialog>
  )
}
