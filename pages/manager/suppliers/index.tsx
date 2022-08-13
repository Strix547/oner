import Head from 'next/head'
import { useQuery, useMutation } from 'react-query'
import { useRouter } from 'next/router'

import { AccountPageTitle } from 'components'
import { SuppliersTable } from 'components/tables'

import { managerAPI } from 'api'
import { ROUTE_NAMES } from 'core'

const ManagerSuppliersPage = () => {
  const router = useRouter()

  const { data: suppliers, isLoading: isSuppliersLoading } = useQuery(
    'manager-suppliers',
    managerAPI.getSuppliers,
    {
      select: (suppliers) => {
        return suppliers.map((supplier) => {
          const { id, legalPerson, firstName, middleName, lastName, phone, email, active } =
            supplier

          return {
            id,
            name: legalPerson?.name,
            fullName: `${lastName} ${firstName[0]}. ${middleName[0]}.`,
            phone,
            email,
            inn: legalPerson?.inn,
            active
          }
        })
      }
    }
  )

  const toggleStatus = useMutation(managerAPI.changeSupplier)

  const toSupplierPage = (id: number) => {
    router.push(`${ROUTE_NAMES.MANAGER_SUPPLIERS}/${id}`)
  }

  return (
    <>
      <Head>
        <title>Список поставщиков</title>
      </Head>

      <AccountPageTitle>Список поставщиков</AccountPageTitle>

      <SuppliersTable
        suppliers={suppliers}
        isLoading={isSuppliersLoading}
        onSupplierEdit={toSupplierPage}
        onSupplierStatusToggle={toggleStatus.mutate}
      />
    </>
  )
}

export default ManagerSuppliersPage
