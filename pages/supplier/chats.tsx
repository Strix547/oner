import Head from 'next/head'
import { useQuery } from 'react-query'
import { FormProvider, useForm } from 'react-hook-form'

import { AccountPageTitle, Chat } from 'components'
import { RadioGroup } from 'ui'

import { chatAPI } from 'api'

import * as S from 'styled/pages/supplier/Chats'

interface ChatFilters {
  chatType: 'opened' | 'closed'
}

const SupplierChatsPage = () => {
  const useFormProps = useForm<ChatFilters>({
    defaultValues: {
      chatType: 'opened'
    }
  })
  const { watch } = useFormProps

  const { data: chats = [], isLoading: isChatsLoading } = useQuery('chats', chatAPI.getChats)

  const chatTypes = [
    { label: 'Открытые', value: 'opened' },
    { label: 'Закрытые', value: 'closed' }
  ]
  const filteredChats =
    watch('chatType') === 'opened'
      ? chats.filter(({ isActive }) => isActive)
      : chats.filter(({ isActive }) => !isActive)

  return (
    <>
      <Head>
        <title>Мои чаты</title>
      </Head>

      <AccountPageTitle>Мои чаты</AccountPageTitle>

      <S.ChatTypeFilter>
        <FormProvider {...useFormProps}>
          <RadioGroup name="chatType" options={chatTypes} />
        </FormProvider>
      </S.ChatTypeFilter>

      <Chat chats={filteredChats} isLoading={isChatsLoading} />
    </>
  )
}

export default SupplierChatsPage
