import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { AccountingTable, OrderProductsTable, RefundsTable } from 'components/tables'
import {
  ChangeOrderStatusModal,
  RequisitesModal,
  OrderProductsRefundModal
} from 'components/modals'
import {
  AccountPageTitle,
  DeliveryTypeCard,
  PaymentTypeCard,
  CustomerInfoCard,
  RequisitesList,
  OrderActions
} from 'components'
import { Tabs, TabPanel, Skeleton, Button } from 'ui'
import { Box } from 'common'

import { managerAPI, ordersAPI } from 'api'
import { useManagerRequisites } from 'hooks'
import { ROUTE_NAMES } from 'core'

import * as S from 'styled/pages/manager/Order'

type OrderActionType =
  | 'cancel'
  | 'cancel-refund'
  | 'documents-print'
  | 'status-change'
  | 'partial-refund'

type TabValue =
  | 'customer-info'
  | 'payment-type'
  | 'delivery-type'
  | 'order-products'
  | 'refunds'
  | 'requisites'
  | 'accounting'

interface Tab {
  label: string
  value: TabValue
}

interface OnRequisitesSubmitProps {
  purpose: 'edit' | 'add'
  requisites: {
    name: string
    accountNumber: number
    bik: number
  }
}

interface RequisitesModalProps {
  purpose: 'edit' | 'add'
  requisites?: {
    id?: number
    name: string
    accountNumber: number
    bik: number
  }
}

const ManagerOrderPage = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const orderId = Number(router.query.id)

  const [tab, setTab] = useState<TabValue>('customer-info')
  const [isChangeStatusModalOpen, setChangeStatusModalOpen] = useState(false)
  const [requisitesModal, setRequisitesModal] = useState<RequisitesModalProps | null>(null)
  const [isRefundModalOpen, setRefundModalOpen] = useState(false)

  const { data: order, isLoading: isOrderLoading } = useQuery(
    ['order', orderId],
    () => managerAPI.getOrder(orderId),
    {
      enabled: !!orderId
    }
  )
  const changeProductCount = useMutation(managerAPI.changeOrderProduct)
  const cancelOrder = useMutation(managerAPI.cancelOrder, {
    onError: () => {
      toast.error('Ошибка отмены заказа')
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['order', orderId])
      toast.success('Заказ успешно отменён')
    }
  })
  const refundOrder = useMutation(managerAPI.refundOrder, {
    onError: () => {
      toast.error('Ошибка отмены заказа с возвратом')
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['order', orderId])
      toast.success('Заказ успешно отменён с возвратом')
    }
  })
  const changeOrderStatus = useMutation(managerAPI.changeOrder, {
    onError: () => {
      toast.error('Ошибка изменения статуса')
    },
    onSuccess: () => {
      setChangeStatusModalOpen(false)
      queryClient.invalidateQueries(['order', orderId])
      toast.success('Статус успешно изменён')
    }
  })
  const changeOrder = useMutation(managerAPI.changeOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(['order', orderId])
    }
  })
  const changeCustomer = useMutation(managerAPI.changeCustomer, {
    onError: () => {
      toast.error('Ошибка изменения информации покупателя')
    },
    onSuccess: () => {
      toast.success('Информация о покупателе успешно изменена')
      return queryClient.invalidateQueries(['order', orderId])
    }
  })
  const changeSupplier = useMutation(managerAPI.changeSupplier, {
    onError: () => {
      toast.error('Ошибка изменения информации покупателя')
    },
    onSuccess: () => {
      toast.success('Информация о покупателе успешно изменена')
      return queryClient.invalidateQueries(['order', orderId])
    }
  })
  const refundOrderProduct = useMutation(ordersAPI.refundOrderProduct, {
    onError: () => {
      toast.error('Ошибка частичного возврата')
    },
    onSuccess: () => {
      toast.success('Заказ успешно частично возвращён')
      return queryClient.invalidateQueries(['order', orderId])
    }
  })

  const { requisites, addRequisites, editRequisites, deleteRequisites } = useManagerRequisites({
    userId: order?.user.id,
    onEditSuccess() {
      setRequisitesModal(null)
    },
    onAddSuccess() {
      setRequisitesModal(null)
    }
  })

  const pageTitle = !isOrderLoading && order ? `Заказ №${orderId}` : 'Загрузка...'

  const isOrderEditable =
    order?.status !== 'payed' &&
    order?.status !== 'shipping' &&
    order?.status !== 'shipped' &&
    order?.status !== 'completed'

  const tabs: Tab[] = [
    { label: 'Информация о покупателе', value: 'customer-info' },
    { label: 'Тип оплаты', value: 'payment-type' },
    { label: 'Тип доставки', value: 'delivery-type' },
    { label: 'Состав заказа', value: 'order-products' },
    { label: 'Возвраты', value: 'refunds' },
    { label: 'Реквизиты', value: 'requisites' },
    { label: 'Бухгалтерия', value: 'accounting' }
  ]

  const manageOrderActions = (action: OrderActionType) => {
    switch (action) {
      case 'cancel':
        cancelOrder.mutate(orderId)
        break
      case 'cancel-refund':
        refundOrder.mutate({ orderId })
        break
      case 'status-change':
        setChangeStatusModalOpen(true)
        break
      case 'partial-refund':
        setRefundModalOpen(true)
    }
  }

  const onRequisitesSubmit = async ({ purpose, requisites }: OnRequisitesSubmitProps) => {
    if (purpose === 'edit' && requisitesModal?.requisites?.id && order) {
      editRequisites.mutate({
        userId: order.user.id,
        id: requisitesModal.requisites.id,
        ...requisites
      })
    }

    if (purpose === 'add' && order) {
      addRequisites.mutate({ userId: order.user.id, ...requisites })
    }
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <AccountPageTitle>{pageTitle}</AccountPageTitle>

      <Tabs activeTab={tab} tabs={tabs} onTabChange={setTab}>
        {!isOrderLoading && order ? (
          <>
            <TabPanel value="customer-info">
              <CustomerInfoCard
                info={order.user}
                deliveryAddress={order.delivery.address}
                editable={isOrderEditable}
                isChanging={changeCustomer.isLoading || changeSupplier.isLoading}
                onCustomerChange={(fields) => {
                  if (order.user.role.title === 'Supplier') {
                    changeSupplier.mutate({ supplierId: order.user.id, ...fields })
                  } else {
                    changeCustomer.mutate({ customerId: order.user.id, ...fields })
                  }
                }}
              />
            </TabPanel>

            <TabPanel value="payment-type">
              <PaymentTypeCard
                info={{
                  payed: order.status === 'payed' || order.status === 'completed',
                  paymentDateTime: order.saleDateTime,
                  paymentMethod: order.paymentMethod
                }}
                editable={isOrderEditable}
                onPaymentTypeChange={(id) => {
                  changeOrder.mutate({
                    orderId,
                    paymentType: id
                  })
                }}
              />
            </TabPanel>

            <TabPanel value="delivery-type">
              <DeliveryTypeCard
                type={order.delivery.type}
                editable={isOrderEditable}
                onDeliveryTypeChange={(id) => {
                  changeOrder.mutate({
                    orderId,
                    deliveryType: id
                  })
                }}
              />
            </TabPanel>

            <TabPanel value="order-products">
              <S.OrderProducts>
                <Box title="Состав заказа" noPaddings>
                  <OrderProductsTable
                    products={order.products}
                    onProductCountChange={changeProductCount.mutate}
                  />

                  {isOrderEditable && (
                    <>
                      <S.OrderActionsBox>
                        <OrderActions
                          partialRefundAvailable={Boolean(order.products.length)}
                          onAction={manageOrderActions}
                        />
                      </S.OrderActionsBox>

                      <ChangeOrderStatusModal
                        open={isChangeStatusModalOpen}
                        status={order.status}
                        isChanging={changeOrderStatus.isLoading}
                        onSubmit={(status) => {
                          changeOrderStatus.mutate({ orderId, status })
                        }}
                        onClose={() => {
                          setChangeStatusModalOpen(false)
                        }}
                      />

                      <OrderProductsRefundModal
                        open={isRefundModalOpen}
                        products={order.products}
                        isRefunding={refundOrderProduct.isLoading}
                        onProductsRefund={(productIds) => {
                          productIds.forEach(async (productId) => {
                            await refundOrderProduct.mutateAsync({ orderId, productId })
                            setRefundModalOpen(false)
                          })
                        }}
                        onClose={() => {
                          setRefundModalOpen(false)
                        }}
                      />
                    </>
                  )}
                </Box>
              </S.OrderProducts>
            </TabPanel>

            <TabPanel value="refunds">
              <S.Refunds>
                <Box title="Возвраты" noPaddings>
                  <RefundsTable refunds={order.refunds} orderPath={ROUTE_NAMES.MANAGER_ORDERS} />
                </Box>
              </S.Refunds>
            </TabPanel>

            <TabPanel value="requisites">
              <S.Requisites>
                <Box title="Реквизиты">
                  <RequisitesList
                    requisites={requisites?.results}
                    mainRequisitesId={order.requisite.id}
                    asRadios={!isOrderEditable}
                    onEdit={(requisites) =>
                      setRequisitesModal({ purpose: 'edit', requisites: requisites })
                    }
                    onChangeMainRequisites={(id) => {
                      changeOrder.mutate({ orderId, requisiteId: id })
                    }}
                    onDelete={deleteRequisites.mutate}
                  />

                  {isOrderEditable && (
                    <>
                      <RequisitesModal
                        purpose={requisitesModal?.purpose === 'edit' ? 'edit' : 'add'}
                        requisites={requisitesModal?.requisites}
                        open={Boolean(requisitesModal)}
                        isChanging={addRequisites.isLoading || editRequisites.isLoading}
                        onClose={() => {
                          setRequisitesModal(null)
                        }}
                        onSubmit={onRequisitesSubmit}
                      />

                      <Button
                        onClick={() => {
                          setRequisitesModal({ purpose: 'add' })
                        }}
                      >
                        Добавить реквизиты
                      </Button>
                    </>
                  )}
                </Box>
              </S.Requisites>
            </TabPanel>

            <TabPanel value="accounting">
              <S.Accounting>
                <Box title="Бухгалтерия" noPaddings>
                  <AccountingTable accounting={order.documents} />
                </Box>
              </S.Accounting>
            </TabPanel>
          </>
        ) : (
          <Skeleton height={300} />
        )}
      </Tabs>
    </>
  )
}

export default ManagerOrderPage
