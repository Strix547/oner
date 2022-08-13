import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { AccountingTable, OrderProductsTable } from 'components/tables'
import { SupplierOrderRefundModal } from 'components/modals'
import { CustomerInfoCard, PaymentTypeCard, DeliveryTypeCard, AccountPageTitle } from 'components'
import { Tabs, TabPanel, Skeleton, Button } from 'ui'

import { ordersAPI } from 'api'
import { useOrder } from 'hooks'
import { OrderDocument } from 'types/orders'

import * as S from 'styled/pages/supplier/Order'

const SupplierOrderPage = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const orderId = Number(router.query.id)

  const { order, isOrderLoading, changeOrderProduct } = useOrder(orderId)

  const [tab, setTab] = useState('documents')
  const [isRefundModalOpen, setRefundModalOpen] = useState(false)

  const refundOrder = useMutation(ordersAPI.refundOrder, {
    onError: () => {
      toast.error('Ошибка при осуществлении возврата')
    },
    onSuccess: () => {
      toast.success('Возврат успешно осуществлён')
      queryClient.invalidateQueries(['order', orderId])
      setRefundModalOpen(false)
    }
  })

  const isOrderPayed =
    order?.status === 'payed' ||
    order?.status === 'shipping' ||
    order?.status === 'shipped' ||
    order?.status === 'completed'

  const isCustomerDataVisible = isOrderPayed

  const tabs = isCustomerDataVisible
    ? [
        { label: 'Документы', value: 'documents' },
        { label: 'Информация о покупателе', value: 'customer-info' },
        { label: 'Тип оплаты', value: 'payment-type' },
        { label: 'Тип доставки', value: 'delivery-type' },
        { label: 'Состав заказа', value: 'order-products' }
      ]
    : [
        { label: 'Документы', value: 'documents' },
        { label: 'Тип оплаты', value: 'payment-type' },
        { label: 'Тип доставки', value: 'delivery-type' },
        { label: 'Состав заказа', value: 'order-products' }
      ]

  const orderTitle = !isOrderLoading && order ? `Заказ № ${orderId}` : 'Загружается...'

  const selectOrderDocumentsProps = (documents: OrderDocument[]) => {
    return documents.map((document) => {
      const { id, name, file, size } = document

      return {
        id,
        name,
        file,
        size
      }
    })
  }

  return (
    <>
      <Head>
        <title>{orderTitle}</title>
      </Head>

      <AccountPageTitle>{orderTitle}</AccountPageTitle>

      {order && !isOrderLoading ? (
        <Tabs activeTab={tab} tabs={tabs} onTabChange={setTab}>
          <TabPanel value="documents">
            <AccountingTable accounting={selectOrderDocumentsProps(order.documents)} />
          </TabPanel>

          <TabPanel value="customer-info">
            <CustomerInfoCard info={order.user} deliveryAddress={order.delivery.address} />
          </TabPanel>

          <TabPanel value="payment-type">
            <PaymentTypeCard
              info={{
                payed: isOrderPayed,
                paymentDateTime: order.saleDateTime,
                paymentMethod: order.paymentMethod
              }}
            />
          </TabPanel>

          <TabPanel value="delivery-type">
            <DeliveryTypeCard type={order.delivery.type} />
          </TabPanel>

          <TabPanel value="order-products">
            <S.Products>
              <OrderProductsTable
                products={order.products}
                onProductCountChange={changeOrderProduct.mutate}
              />

              {isOrderPayed && (
                <>
                  <Button
                    onClick={() => {
                      setRefundModalOpen(true)
                    }}
                  >
                    Возврат
                  </Button>

                  <SupplierOrderRefundModal
                    open={isRefundModalOpen}
                    isRefunding={refundOrder.isLoading}
                    onOrderRefund={(reason) => {
                      refundOrder.mutate({ orderId, desc: reason })
                    }}
                    onClose={() => {
                      setRefundModalOpen(false)
                    }}
                  />
                </>
              )}
            </S.Products>
          </TabPanel>
        </Tabs>
      ) : (
        <Skeleton height={200} />
      )}
    </>
  )
}

export default SupplierOrderPage
