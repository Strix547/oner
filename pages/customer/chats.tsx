import Head from 'next/head'
import { useQuery } from 'react-query'

import { AccountPageTitle, Chat } from 'components'

import { chatAPI } from 'api'

export const CustomerChatsPage = () => {
  const { data: chats, isLoading: isChatsLoading } = useQuery('chats', chatAPI.getChats)

  return (
    <>
      <Head>
        <title>Мои чаты</title>
      </Head>

      <AccountPageTitle>Мои чаты</AccountPageTitle>

      <Chat chats={chats} isLoading={isChatsLoading} />
    </>
  )
}

export default CustomerChatsPage
