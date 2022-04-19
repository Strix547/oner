import { NextPage } from 'next'
import Head from 'next/head'
import { useQuery, useMutation } from 'react-query'
import { useEffect } from 'react'

import { PageLayout, AccountLayout } from 'components'
import { ChatContainer } from 'components/chat'

import { chatAPI } from 'api'

import * as S from './Chats.styled'

export const AccountChatsPage: NextPage = () => {
  const { data: chats } = useQuery('chats', () => chatAPI.fetchChats(1))
  console.log(chats?.results)
  // const { data: messages } = useQuery(['messages', chats], chatAPI.fetchChatMessages)
  // const createChat = useMutation(() => chatAPI.createChat({ orderId: 1, title: 'Тест' }))
  // const createChat = useMutation(() =>
  //   chatAPI.createMassage({ ticketId: 4, message: 'Тестовое сообщение' })
  // )

  // useEffect(() => {
  //   createChat.mutate()
  // }, [])

  return (
    <S.AccountChatsPage>
      <Head>Мои чаты</Head>

      <PageLayout>
        <AccountLayout title="Персональная информация">
          <ChatContainer chats={chats?.results} />
        </AccountLayout>
      </PageLayout>
    </S.AccountChatsPage>
  )
}
