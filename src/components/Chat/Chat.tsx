import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'

import { ChatList, ChatDialog } from './components'

import { chatAPI } from 'api'
import { Chat as IChat } from 'types/chat'

import * as S from './Chat.styled'

import ArrowRightIcon from 'public/icons/arrows/sign-right.svg'

interface ChatProps {
  chats?: IChat[]
  isLoading: boolean
}

export const Chat = ({ chats = [], isLoading }: ChatProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const orderId = Number(router.query.order)

  const [openedChatId, setOpenedChatId] = useState<number | null>(null)

  const sendMessage = useMutation(chatAPI.createMassage, {
    onError: () => {
      toast.error('Сообщение не было отправлено')
    },
    onSuccess: () => {
      queryClient.invalidateQueries('chats')
    }
  })

  const changeChat = useMutation(chatAPI.changeChat, {
    onError: () => {
      toast.error('Не удалось завершить диалог')
    },
    onSuccess: () => {
      queryClient.invalidateQueries('chats')
    }
  })

  const changeMessage = useMutation(chatAPI.changeMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries('chats')
    }
  })

  const openedChat = chats.find((chat) => chat.id === openedChatId)

  // read all unreaded messages in opened chat
  useEffect(() => {
    if (openedChat) {
      openedChat.messages.forEach(({ chatId, id, message, isRead }) => {
        if (!isRead) {
          changeMessage.mutate({ chatId, messageId: id, message, isRead: true })
        }
      })
    }
  }, [openedChat])

  useEffect(() => {
    if (!orderId || chats.length === 0 || isLoading) return

    const findedChat = chats.find((chat) => chat.orderId === orderId)

    if (findedChat) {
      setOpenedChatId(findedChat.id)
    }

    router.replace(router.pathname, undefined, { shallow: true })
  }, [orderId, isLoading, chats, setOpenedChatId])

  return (
    <S.Chat>
      <S.BackToListButton
        variant="text"
        onClick={() => {
          setOpenedChatId(null)
        }}
      >
        <ArrowRightIcon />К списку чатов
      </S.BackToListButton>

      <S.Container isChatOpen={Boolean(openedChatId)}>
        <ChatList chats={chats} isLoading={isLoading} onChatOpen={setOpenedChatId} />

        {openedChat ? (
          <ChatDialog
            chat={openedChat}
            isMessageSending={sendMessage.isLoading}
            onMessageSend={(message, file) => {
              sendMessage.mutate({ chatId: openedChat.id, message, file })
            }}
            onChatEnd={(id) => {
              changeChat.mutate({
                chatId: id,
                isActive: false
              })
            }}
          />
        ) : (
          <S.SelectChatContainer>
            <Typography variant="h4">Выберите чат</Typography>
          </S.SelectChatContainer>
        )}
      </S.Container>
    </S.Chat>
  )
}
