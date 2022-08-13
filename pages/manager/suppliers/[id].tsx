import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { SupplierInfoForm } from 'components/forms'
import { OrdersTable, OrdersReceiptsTable, StoresTable, AccountingTable } from 'components/tables'
import { AccountPageTitle, RequisitesList } from 'components'
import { Box } from 'common'
import { Tabs, TabPanel, Skeleton } from 'ui'

import { useManagerSupplier } from 'hooks'
import { ROUTE_NAMES } from 'core'
import { AccountingFile, AccountingItem, Supplier } from 'types/manager'

import * as S from 'styled/pages/manager/Supplier'

const ManagerSupplierPage = () => {
  const router = useRouter()
  const supplierId = Number(router.query.id)

  const [tab, setTab] = useState('info')

  const {
    supplier,
    isSupplierLoading,
    archiveOrder,
    unarchiveOrder,
    changeSupplierMainRequisites,
    toggleStoreStatus
  } = useManagerSupplier({
    supplierId
  })

  const pageTitle = supplier && !isSupplierLoading ? supplier.legalPerson.name : 'Загружается...'
  const ordersPayed = supplier?.orders.filter(
    ({ status }) =>
      status === 'payed' || status === 'shipping' || status === 'shipped' || status === 'completed'
  )

  const tabs = [
    { label: 'Информация', value: 'info' },
    { label: 'Заказы', value: 'orders' },
    { label: 'Реквизиты', value: 'requisites' },
    { label: 'Поступления', value: 'receipts' },
    { label: 'Магазины', value: 'stores' },
    { label: 'Бухгалтерия', value: 'accounting' }
  ]

  const selectContactPerson = (supplier: Supplier) => {
    if (!supplier) return

    const { firstName, middleName, lastName, phone, email, legalPerson } = supplier

    return {
      firstName,
      middleName,
      lastName,
      phone,
      email,
      additionally: legalPerson?.additionally || ''
    }
  }

  const selectLegalPerson = (supplier: Supplier) => {
    if (!supplier) return

    const { ownershipForm, name, inn, kpp, ogrn, address, phone, website, email } =
      supplier.legalPerson

    return {
      ownershipForm,
      name,
      inn,
      kpp,
      ogrn,
      address,
      phone,
      website,
      email
    }
  }

  const selectAccountingFiles = (accountingItems: AccountingItem[]) => {
    return accountingItems
      .reduce<AccountingFile[]>((prev, curr) => [...prev, ...curr.files], [])
      .map((accountingFile) => {
        const { id, name, file, size } = accountingFile

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
        <title>{pageTitle}</title>
      </Head>

      <AccountPageTitle>{pageTitle}</AccountPageTitle>

      <S.ManagerSupplierPage>
        <Tabs activeTab={tab} tabs={tabs} onTabChange={setTab}>
          {!isSupplierLoading && supplier ? (
            <>
              <TabPanel value="info">
                <Box title="Информация">
                  <SupplierInfoForm
                    contactPerson={selectContactPerson(supplier)}
                    legalPerson={selectLegalPerson(supplier)}
                    supplierId={supplierId}
                  />
                </Box>
              </TabPanel>

              <TabPanel value="orders">
                <S.Orders>
                  <Box title="Заказы" noPaddings>
                    <OrdersTable
                      orders={supplier.orders}
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
                </S.Orders>
              </TabPanel>

              <TabPanel value="requisites">
                <Box title="Реквизиты">
                  <RequisitesList
                    requisites={supplier.requisites}
                    mainRequisitesId={supplier.mainRequisites?.id}
                    asRadios
                    onChangeMainRequisites={(requisitesId) => {
                      changeSupplierMainRequisites.mutate({ supplierId, requisitesId })
                    }}
                  />
                </Box>
              </TabPanel>

              <TabPanel value="receipts">
                <S.Receipts>
                  <Box title="Мои поступления" noPaddings>
                    <OrdersReceiptsTable
                      orders={ordersPayed}
                      orderPath={ROUTE_NAMES.MANAGER_ORDERS}
                    />
                  </Box>
                </S.Receipts>
              </TabPanel>

              <TabPanel value="stores">
                <S.Stores>
                  <Box title="Магазины" noPaddings>
                    <StoresTable
                      stores={supplier.stores}
                      storePath={ROUTE_NAMES.MANAGER_STORES}
                      onStoreStatusToggle={toggleStoreStatus}
                    />
                  </Box>
                </S.Stores>
              </TabPanel>

              <TabPanel value="accounting">
                <S.Accounting>
                  <Box title="Бухгалтерия" noPaddings>
                    <AccountingTable accounting={selectAccountingFiles(supplier.accounting)} />
                  </Box>
                </S.Accounting>
              </TabPanel>
            </>
          ) : (
            <Skeleton height={300} />
          )}
        </Tabs>
      </S.ManagerSupplierPage>
    </>
  )
}

export default ManagerSupplierPage
