import { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from 'react-query'

import { PageLayout, AccountLayout } from 'components'
import { Chat } from 'components/chat'

import { chatAPI } from 'api'

import * as S from './Chats.styled'

export const AccountChatsPage: NextPage = () => {
  const { data: chats = [], isLoading: isChatsLoading } = useQuery('chats', chatAPI.fetchChats)

  return (
    <S.AccountChatsPage>
      <Head>
        <title>Мои чаты</title>
      </Head>

      <PageLayout>
        <AccountLayout title="Мои чаты">
          <Chat chats={chats} isLoading={isChatsLoading} />
        </AccountLayout>
      </PageLayout>
    </S.AccountChatsPage>
  )
}
