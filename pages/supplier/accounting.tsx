import Head from 'next/head'
import { useState } from 'react'

import { AccountPageTitle } from 'components'
import { OrdersAccountingTable } from 'components/tables'
import { Pagination } from 'components/common'
import { Tabs, TabPanel } from 'ui'

import { useOrders } from 'hooks'
import { ROUTE_NAMES } from 'core'

import * as S from 'styled/pages/supplier/Accounting'

const SupplierAccountingPage = () => {
  const [tab, setTab] = useState('documents')
  const [ordersPage, setOrdersPage] = useState(1)

  const { orders, isOrdersLoading } = useOrders({
    keys: [ordersPage],
    props: {
      page: ordersPage
    }
  })

  const tabs = [
    {
      label: 'Список документов',
      value: 'documents'
    },
    {
      label: 'Мои сверки',
      value: 'reconciliation'
    },
    {
      label: 'Запрос в бухгалтерию',
      value: 'accounting-request'
    }
  ]

  const ordersAccountingTable = (
    <OrdersAccountingTable
      orders={orders?.results}
      orderPath={ROUTE_NAMES.SUPPLIER_ORDERS}
      isLoading={isOrdersLoading}
    />
  )

  return (
    <>
      <Head>
        <title>Бухгалтерия</title>
      </Head>

      <AccountPageTitle>Бухгалтерия</AccountPageTitle>

      <S.SupplierAccountingPage>
        <Tabs activeTab={tab} tabs={tabs} onTabChange={setTab}>
          <TabPanel value="documents">
            {ordersAccountingTable}
            <Pagination page={ordersPage} itemsCount={orders?.count} onChange={setOrdersPage} />
          </TabPanel>

          <TabPanel value="reconciliation">
            {ordersAccountingTable}
            <Pagination page={ordersPage} itemsCount={orders?.count} onChange={setOrdersPage} />
          </TabPanel>

          <TabPanel value="accounting-request"></TabPanel>
        </Tabs>
      </S.SupplierAccountingPage>
    </>
  )
}

export default SupplierAccountingPage
