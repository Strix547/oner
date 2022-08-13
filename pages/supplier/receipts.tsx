import Head from 'next/head'
import { useState } from 'react'

import { AccountPageTitle } from 'components'
import { OrdersReceiptsTable } from 'components/tables'
import { Pagination } from 'components/common'

import { useOrders } from 'hooks'
import { ROUTE_NAMES } from 'core'

const SupplierReceiptsPage = () => {
  const [ordersPage, setOrdersPage] = useState(1)

  const { orders, isOrdersLoading } = useOrders({
    keys: [ordersPage],
    props: {
      page: ordersPage
    }
  })

  const doneOrders = orders?.results.filter(
    ({ status }) =>
      status === 'payed' || status === 'shipping' || status === 'shipped' || status === 'completed'
  )

  return (
    <>
      <Head>
        <title>Мои поступления</title>
      </Head>

      <AccountPageTitle>Мои поступления</AccountPageTitle>

      <OrdersReceiptsTable
        orders={doneOrders}
        orderPath={ROUTE_NAMES.SUPPLIER_ORDERS}
        isLoading={isOrdersLoading}
      />

      <Pagination page={ordersPage} itemsCount={orders?.count} onChange={setOrdersPage} />
    </>
  )
}

export default SupplierReceiptsPage
