import Head from 'next/head'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useForm, FormProvider } from 'react-hook-form'
import { toast } from 'react-toastify'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { CustomerOrdersTable } from 'components/tables'
import { AccountPageTitle } from 'components'
import { Pagination } from 'components/common'
import { OrderStatusSelect } from 'common'
import { DateRangePicker } from 'ui'

import { chatAPI, ordersAPI } from 'api'
import { OrderStatus } from 'types/orders'
import { ROUTE_NAMES } from 'core'

import * as S from 'styled/pages/customer/Orders'

interface FilterFields {
  status?: OrderStatus
  dates?: [string, string]
}

const CustomerOrdersPage = () => {
  const useFormProps = useForm<FilterFields>()
  const { watch } = useFormProps
  const router = useRouter()
  const queryClient = useQueryClient()

  const { status, dates } = watch()
  const [startDate, endDate] = dates || []
  const [ordersPage, setOrdersPage] = useState(1)

  const { data: orders, isLoading: isOrdersLoading } = useQuery(
    ['orders', ordersPage, status, endDate],
    () => ordersAPI.getOrders({ page: ordersPage, status, startDate, endDate })
  )

  const { data: chats = [], isLoading: isChatsLoading } = useQuery('chats', chatAPI.getChats)

  const cancelOrder = useMutation(ordersAPI.cancelOrder, {
    onError: () => {
      toast.error('Ошибка отмены заказа')
    },
    onSuccess: () => {
      toast.success('Заказ успешно отменён')
    }
  })

  const createChat = useMutation(chatAPI.createChat, {
    onSuccess: () => {
      return queryClient.invalidateQueries('chats')
    }
  })

  const onChatOpen = async (orderId: number) => {
    const isChatExist = chats.some((chat) => chat.orderId === orderId)

    if (isChatExist) {
      router.push({
        pathname: ROUTE_NAMES.CUSTOMER_CHATS,
        query: { order: orderId }
      })
    } else {
      await createChat.mutateAsync({ orderId })

      router.push({
        pathname: ROUTE_NAMES.CUSTOMER_CHATS,
        query: { order: orderId }
      })
    }
  }

  return (
    <S.CustomerOrdersPage>
      <Head>
        <title>История заказов</title>
      </Head>

      <AccountPageTitle
        endAdornment={
          <FormProvider {...useFormProps}>
            <S.Filters>
              <S.Filter>
                <Typography component="span">Статус</Typography>
                <OrderStatusSelect />
              </S.Filter>

              <S.Filter>
                <Typography component="span">Дата</Typography>

                <DateRangePicker />
              </S.Filter>
            </S.Filters>
          </FormProvider>
        }
      >
        История заказов
      </AccountPageTitle>

      <CustomerOrdersTable
        orders={orders?.results}
        isLoading={isOrdersLoading || isChatsLoading}
        onOrderCancel={cancelOrder.mutate}
        onChatOpen={onChatOpen}
      />

      <Pagination page={ordersPage} itemsCount={orders?.count} onChange={setOrdersPage} />
    </S.CustomerOrdersPage>
  )
}

export default CustomerOrdersPage
