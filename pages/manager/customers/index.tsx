import Head from 'next/head'
import { useQuery, useMutation } from 'react-query'
import { useRouter } from 'next/router'

import { CustomersTable } from 'components/tables'
import { AccountPageTitle } from 'components'

import { ROUTE_NAMES } from 'core'
import { managerAPI } from 'api'

const ManagerCustomersPage = () => {
  const router = useRouter()

  const { data: customers, isLoading: isCustomersLoading } = useQuery(
    'manager-customers',
    managerAPI.getCustomers
  )

  const toggleStatus = useMutation(managerAPI.changeCustomer)

  const toCustomerEditPage = (id: number) => {
    router.push(`${ROUTE_NAMES.MANAGER_CUSTOMERS}/${id}`)
  }

  const toCustomerOrdersPage = (id: number) => {
    router.push({
      ...router,
      pathname: `${ROUTE_NAMES.MANAGER_CUSTOMERS}/${id}`,
      query: { ...router.query, tab: 'orders' }
    })
  }

  return (
    <>
      <Head>
        <title>Список покупателей</title>
      </Head>

      <AccountPageTitle>Список покупателей</AccountPageTitle>

      <CustomersTable
        customers={customers}
        isLoading={isCustomersLoading}
        onCustomerEdit={toCustomerEditPage}
        onListClick={toCustomerOrdersPage}
        onCustomerStatusToggle={toggleStatus.mutate}
      />
    </>
  )
}

export default ManagerCustomersPage
