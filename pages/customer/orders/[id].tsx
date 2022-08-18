import Head from 'next/head'
import { useRouter } from 'next/router'

import { CustomerOrderProductsTable } from 'components/tables'
import { CustomerOrderDetails, AccountPageTitle } from 'components'
import { Skeleton } from 'ui'

import { useOrder } from 'hooks'

const CustomerOrderPage = () => {
  const router = useRouter()
  const orderId = Number(router.query.id)

  const { order, isOrderLoading, changeOrder, cancelOrderProduct } = useOrder(orderId)

  const orderTitle = !isOrderLoading && order ? `Заказ № ${orderId}` : 'Загружается...'
  const isOrderEditable = order?.status === 'accepted'

  return (
    <>
      <Head>
        <title>{orderTitle}</title>
      </Head>

      <AccountPageTitle>{orderTitle}</AccountPageTitle>

      {order && !isOrderLoading ? (
        <CustomerOrderDetails
          address={order.delivery.address}
          deliveryType={order.delivery.type}
          paymentType={order.paymentMethod}
          editable={isOrderEditable}
          onPaymentTypeChange={(paymentId) => {
            changeOrder.mutate({ orderId: order.id, paymentId })
          }}
          onDeliveryTypeChange={(deliveryId) => {
            changeOrder.mutate({ orderId: order.id, deliveryId })
          }}
        />
      ) : (
        <Skeleton height={146} />
      )}

      <CustomerOrderProductsTable
        products={order?.products}
        isLoading={isOrderLoading}
        onProductRemove={(productId) => {
          cancelOrderProduct.mutate({ orderId, productId })
        }}
      />
    </>
  )
}

export default CustomerOrderPage
