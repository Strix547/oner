import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Typography from '@mui/material/Typography'

import { Button } from 'ui'
import { ChatInput } from '../Input'
import { ChatMessagesContainer } from '../MessagesContainer'

import { chatAPI } from 'api'
import { Message, NewMessage } from '../types'
import { ROUTE_NAMES } from 'core'

import * as S from './Dialog.styled'

interface ChatDialogProps {
  id: number
  isActive: boolean
  title: string
  messages: Message[] | []
}

export const ChatDialog = ({ id, isActive, title, messages }: ChatDialogProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const [isDialogueEnded, setDialogueEnded] = useState(!isActive)
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>(messages)

  const sendMessage = useMutation(
    ({ message, file }: NewMessage) => chatAPI.createMassage({ chatId: id, message, file }),
    {
      onError: () => {
        toast.error('Сообщение не было отправлено')
      }
    }
  )

  const endChat = useMutation((chatId: number) => chatAPI.endChat(chatId), {
    onError: () => {
      toast.error('Не удалось завершить диалог')
    }
  })

  const scrollMessagesContainerToBottom = () => {
    if (!messagesContainerRef.current) return
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
  }

  // scroll to bottom after render and new message
  useEffect(() => {
    if (messagesContainerRef.current) {
      scrollMessagesContainerToBottom()
    }
  }, [messagesContainerRef, displayedMessages])

  const onChatEnd = () => {
    setDialogueEnded(true)
    endChat.mutate(id)
  }

  const onMessageSubmit = async (message: string, file: File | null) => {
    const newMessage = await sendMessage.mutateAsync({ message, file })
    setDisplayedMessages([...displayedMessages, newMessage])
  }

  return (
    <S.ChatDialog>
      <S.Top>
        <Typography variant="body2">Заказ {title}</Typography>

        {!isDialogueEnded && (
          <Button variant="outlined" onClick={onChatEnd}>
            Завершить диалог
          </Button>
        )}
      </S.Top>

      <S.Dialog>
        <ChatMessagesContainer ref={messagesContainerRef} messages={displayedMessages} />

        {!isDialogueEnded ? (
          <ChatInput isMessageSending={sendMessage.isLoading} onMessageSubmit={onMessageSubmit} />
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
