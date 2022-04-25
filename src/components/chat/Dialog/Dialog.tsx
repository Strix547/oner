import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useQuery, useMutation } from 'react-query'
import { toast } from 'react-toastify'
import Typography from '@mui/material/Typography'

import { Button } from 'ui'
import { ChatInput } from '../Input'
import { ChatMessagesContainer } from '../MessagesContainer'

import { chatAPI } from 'api'
import { useAuth } from 'hooks'
import { Message, NewMessage } from '../types'

import * as S from './Dialog.styled'
import { ROUTE_NAMES } from 'core'

interface ChatDialogProps {
  id: number
  isActive: boolean
  title: string
  messages: Message[] | []
  onDialogClose: () => void
}

export const ChatDialog = ({ id, isActive, title, messages, onDialogClose }: ChatDialogProps) => {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null)
  const [isDialogueEnded, setDialogueEnded] = useState(isActive)
  const [messagesPage, setMessagesPage] = useState(2)
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>(messages)
  const { user } = useAuth()

  const { data: messagesPages } = useQuery(
    [`chat-${id}`, messagesPage],
    () => chatAPI.fetchChatMessages({ chatId: id, page: messagesPage }),
    {
      onSuccess: ({ results }) => {
        setDisplayedMessages([...results, ...displayedMessages])
      }
    }
  )

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

  // scroll to bottom after render
  useEffect(() => {
    if (messagesContainerRef.current) {
      scrollMessagesContainerToBottom()
    }
  }, [messagesContainerRef])

  const addSendedMessage = ({ message }: NewMessage) => {
    if (!user?.id) return

    const lastSendedMessage = displayedMessages[displayedMessages.length - 1]

    const sendedMessage: Message = {
      id: lastSendedMessage ? lastSendedMessage.id + 1 : 1,
      chatId: id,
      message,
      file: null,
      dateTime: new Date(),
      senderId: user?.id,
      receiverId: null,
      isRead: false
    }

    setDisplayedMessages([...displayedMessages, sendedMessage])
    scrollMessagesContainerToBottom()
  }

  const onChatEnd = () => {
    onDialogClose()
    setDialogueEnded(true)
    endChat.mutate(id)
  }

  const loadMessagesNextPage = () => {
    if (messagesPages?.next) {
      setMessagesPage(messagesPage + 1)
    }
  }

  return (
    <S.ChatDialog>
      <S.Top>
        <Typography variant="body2">Заказ {title}</Typography>
        <Button variant="outlined" onClick={onChatEnd}>
          Завершить диалог
        </Button>
      </S.Top>

      <S.Dialog>
        <ChatMessagesContainer
          ref={messagesContainerRef}
          messages={displayedMessages}
          onLoadMore={loadMessagesNextPage}
          hasMoreMessages={Boolean(messagesPages?.next)}
        />

        {isDialogueEnded ? (
          <ChatInput
            onMessageSubmit={({ message, file }) => {
              sendMessage.mutate({ message, file })
              addSendedMessage({ message, file })
            }}
          />
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
