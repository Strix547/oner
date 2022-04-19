import Head from 'next/head'
import type { NextPage } from 'next'

import { PageLayout } from 'components'
import { ChatContainer } from 'components/chat'

import * as S from './MyChats.styled'

export const MyChatsPage: NextPage = () => {
  return (
    <S.MyChatsPage>
      <Head>
        <title>Мои чаты</title>
      </Head>

      <PageLayout>
        <ChatContainer />
      </PageLayout>
    </S.MyChatsPage>
  )
}
