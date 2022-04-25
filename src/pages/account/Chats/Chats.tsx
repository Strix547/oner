import { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { useState } from 'react'

import { PageLayout, AccountLayout } from 'components'
import { Chat } from 'components/chat'

import { chatAPI } from 'api'

import * as S from './Chats.styled'

export const AccountChatsPage: NextPage = () => {
  const [chatsPage, setChatsPage] = useState(1)
  const { data: chats } = useQuery(['chats', chatsPage], () => chatAPI.fetchChats(chatsPage))

  return (
    <S.AccountChatsPage>
      <Head>Мои чаты</Head>

      <PageLayout>
        <AccountLayout title="Персональная информация">
          <Chat chats={chats?.results || []} />
        </AccountLayout>
      </PageLayout>
    </S.AccountChatsPage>
  )
}
