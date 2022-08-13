import Head from 'next/head'
import { useForm, FormProvider } from 'react-hook-form'
import InputAdornment from '@mui/material/InputAdornment'
import { useState } from 'react'

import { AccountPageTitle } from 'components'
import { OrdersTable } from 'components/tables'
import { Pagination } from 'components/common'
import { DateRangePicker, Tabs, TabPanel, TextField } from 'ui'

import { ROUTE_NAMES } from 'core'
import { useOrders } from 'hooks'

import * as S from 'styled/pages/supplier/Orders'

import LoupeIcon from 'public/icons/loupe.svg'

type TabValue = 'orders' | 'orders-archive'

interface Tab {
  label: string
  value: TabValue
}

interface Filters {
  orderIdSearch?: string
  dates: [string, string]
}

const SupplierOrdersPage = () => {
  const useFormProps = useForm<Filters>({
    defaultValues: {
      dates: []
    }
  })
  const { watch } = useFormProps

  const [tab, setTab] = useState<TabValue>('orders')
  const [ordersPage, setOrdersPage] = useState(1)
  const [ordersArchivedPage, setOrdersArchivedPage] = useState(1)

  const { orderIdSearch, dates } = watch()

  const { orders, isOrdersLoading, archiveOrder, unarchiveOrder } = useOrders({
    props: {
      isArchive: tab === 'orders-archive',
      id: orderIdSearch ? Number(orderIdSearch) : undefined,
      startDate: dates[0],
      endDate: dates[1],
      page: tab === 'orders' ? ordersPage : ordersArchivedPage
    },
    keys: [tab, orderIdSearch, dates[0], dates[1], ordersPage, ordersArchivedPage]
  })

  const tabs: Tab[] = [
    { label: 'Список заказов покупателей', value: 'orders' },
    { label: 'Архив заказов', value: 'orders-archive' }
  ]

  return (
    <>
      <Head>
        <title>Мои заказы</title>
      </Head>

      <AccountPageTitle>Мои заказы</AccountPageTitle>

      <S.SupplierOrdersPage>
        <FormProvider {...useFormProps}>
          <S.TopFilters>
            <TextField
              type="number"
              name="orderIdSearch"
              placeholder="Поиск по ID заказа"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LoupeIcon />
                  </InputAdornment>
                )
              }}
            />

            <DateRangePicker />
          </S.TopFilters>
        </FormProvider>

        <Tabs activeTab={tab} tabs={tabs} onTabChange={setTab}>
          <TabPanel value="orders">
            <OrdersTable
              orders={orders?.results}
              orderPath={ROUTE_NAMES.SUPPLIER_ORDERS}
              isLoading={isOrdersLoading}
              onArchiveToggle={(orderId) => {
                archiveOrder.mutate(orderId)
              }}
            />

            <Pagination page={ordersPage} itemsCount={orders?.count} onChange={setOrdersPage} />
          </TabPanel>

          <TabPanel value="orders-archive">
            <OrdersTable
              orders={orders?.results}
              orderPath={ROUTE_NAMES.SUPPLIER_ORDERS}
              isLoading={isOrdersLoading}
              onArchiveToggle={(orderId) => {
                unarchiveOrder.mutate(orderId)
              }}
            />

            <Pagination
              page={ordersArchivedPage}
              itemsCount={orders?.count}
              onChange={setOrdersArchivedPage}
            />
          </TabPanel>
        </Tabs>
      </S.SupplierOrdersPage>
    </>
  )
}

export default SupplierOrdersPage
