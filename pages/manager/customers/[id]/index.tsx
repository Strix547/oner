import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { CustomerPersonalInfoForm } from 'components/forms'
import { CustomerOrdersShrinkTable } from 'components/tables'
import { Box } from 'common'
import { Tabs, TabPanel } from 'ui'
import { AccountPageTitle } from 'components'

import { managerAPI } from 'api'
import { ROUTE_NAMES } from 'core'
import { Customer } from 'types/manager'

import * as S from 'styled/pages/manager/Customer'

const ManagerCustomerPage = () => {
  const queryClient = useQueryClient()
  const {
    query: { id, tab: activeTab = 'info' }
  } = useRouter()
  const customerId = Number(id)

  const { data: customer, isLoading: isCustomerLoading } = useQuery(
    ['customer', customerId],
    () => managerAPI.getCustomer(customerId),
    {
      enabled: !!customerId
    }
  )

  const editCustomer = useMutation(managerAPI.changeCustomer, {
    onError: () => {
      toast.error('Ошибка изменения данных покупателя')
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['customer', customerId])
      toast.success('Данные покупателя успешно изменены')
    }
  })

  const tabs = [
    { label: 'Информация о покупателе', value: 'info' },
    { label: 'Заказы покупателя', value: 'orders' }
  ]

  const customerFullName = `${customer?.firstName} ${customer?.middleName} ${customer?.lastName}`
  const pageTitle = !isCustomerLoading && customer ? customerFullName : 'Загрузка...'

  const selectPersonalInfo = (customer?: Customer) => {
    if (!customer) return

    const { firstName, middleName, lastName, phone, email } = customer
    return { firstName, middleName, lastName, phone, email }
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <AccountPageTitle>{pageTitle}</AccountPageTitle>

      <Tabs activeTab={activeTab as string} tabs={tabs} asLinks>
        <TabPanel value="info">
          <Box title="Информация">
            <CustomerPersonalInfoForm
              isChanging={editCustomer.isLoading}
              fields={selectPersonalInfo(customer)}
              onSubmit={(fields) => {
                editCustomer.mutate({ customerId, ...fields })
              }}
            />
          </Box>
        </TabPanel>

        <TabPanel value="orders">
          <S.Orders>
            <Box title="Заказы" noPaddings>
              <CustomerOrdersShrinkTable
                orders={customer?.orders}
                orderPath={ROUTE_NAMES.MANAGER_ORDERS}
              />
            </Box>
          </S.Orders>
        </TabPanel>
      </Tabs>
    </>
  )
}

export default ManagerCustomerPage
