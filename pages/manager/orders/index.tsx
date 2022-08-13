import Head from 'next/head'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { AccountPageTitle } from 'components'
import { OrdersTable } from 'components/tables'
import { Pagination } from 'components/common'
import { Tabs, TabPanel, Skeleton } from 'ui'
import { Box } from 'common'

import { managerAPI } from 'api'
import { ROUTE_NAMES } from 'core'

import * as S from 'styled/pages/manager/Orders'

type TabValue = 'suppliers' | 'customers'

interface Tab {
  label: string
  value: TabValue
}

const ManagerOrdersPage = () => {
  const queryClient = useQueryClient()

  const tabs: Tab[] = [
    { label: 'Заказы поставщиков', value: 'suppliers' },
    { label: 'Заказы покупателей', value: 'customers' }
  ]

  const [suppliersOrdersPage, setSuppliersOrdersPage] = useState(1)
  const [customersOrdersPage, setCustomersOrdersPage] = useState(1)
  const [tab, setTab] = useState<TabValue>('suppliers')

  const { data: orders, isLoading: isOrdersLoading } = useQuery(
    ['orders', tab, suppliersOrdersPage, customersOrdersPage],
    () =>
      managerAPI.getOrders({
        role: tab,
        page: tab === 'suppliers' ? suppliersOrdersPage : customersOrdersPage
      })
  )

  const archiveOrder = useMutation(managerAPI.archiveOrder, {
    onError: () => {
      toast.error('Ошибка помещения в архив')
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders', tab])
      toast.success('Заказ помещён в архив')
    }
  })

  const unarchiveOrder = useMutation(managerAPI.unarchiveOrder, {
    onError: () => {
      toast.error('Ошибка разахивирования заказа')
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders', tab])
      toast.success('Заказ разархивирован')
    }
  })

  const ordersTable = (
    <Box noPaddings>
      <OrdersTable
        orders={orders?.results}
        orderPath={ROUTE_NAMES.MANAGER_ORDERS}
        onArchiveToggle={(orderId, isArhived) => {
          if (isArhived) {
            unarchiveOrder.mutate(orderId)
          } else {
            archiveOrder.mutate(orderId)
          }
        }}
      />
    </Box>
  )

  return (
    <>
      <Head>
        <title>Список заказов</title>
      </Head>

      <AccountPageTitle>Список заказов</AccountPageTitle>

      <S.ManagerOrdersPage>
        <Tabs activeTab={tab} tabs={tabs} onTabChange={setTab}>
          {!isOrdersLoading ? (
            <>
              <TabPanel value="suppliers">
                {ordersTable}

                <Pagination
                  page={suppliersOrdersPage}
                  itemsCount={orders?.count}
                  onChange={setSuppliersOrdersPage}
                />
              </TabPanel>

              <TabPanel value="customers">
                {ordersTable}

                <Pagination
                  page={customersOrdersPage}
                  itemsCount={orders?.count}
                  onChange={setCustomersOrdersPage}
                />
              </TabPanel>
            </>
          ) : (
            <Skeleton height={300} />
          )}
        </Tabs>
      </S.ManagerOrdersPage>
    </>
  )
}

export default ManagerOrdersPage
