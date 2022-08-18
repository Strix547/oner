import { useMemo, useEffect } from 'react'
import { Column } from 'react-table'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'
import Typography from '@mui/material/Typography'

import { TableCardsList } from 'components'
import { Table, Switch, Button } from 'ui'
import { EditButton } from 'common/buttons'

import { ROUTE_NAMES } from 'core'
import { formatPhone } from 'utils'

import * as S from './Customers.styled'

import ListIcon from 'public/icons/list.svg'

interface Customer {
  id: number
  lastName: string
  firstName: string
  middleName: string
  phone: string
  email: string
  active: boolean
}

interface StatusToggleProps {
  customerId: number
  email: string
  active: boolean
}

interface CustomersTableProps {
  customers?: Customer[]
  isLoading: boolean
  onCustomerEdit: (customerId: number) => void
  onListClick: (customerId: number) => void
  onCustomerStatusToggle: (props: StatusToggleProps) => void
}

export const CustomersTable = ({
  customers = [],
  isLoading,
  onCustomerEdit,
  onListClick,
  onCustomerStatusToggle
}: CustomersTableProps) => {
  const useFormProps = useForm()
  const { reset, getValues } = useFormProps

  useEffect(() => {
    if (customers.length) {
      const defaultValues = customers.reduce((prev, { id, active }) => {
        return {
          ...prev,
          [`customer-active-${id}`]: active
        }
      }, {})

      reset(defaultValues)
    }
  }, [customers])

  const renderActions = (customerId: number, email: string) => {
    const switchName = `customer-active-${customerId}`

    return (
      <S.ActionsRow>
        <Button
          variant="text"
          onClick={() => {
            onListClick(customerId)
          }}
        >
          <ListIcon />
        </Button>

        <EditButton
          onClick={() => {
            onCustomerEdit(customerId)
          }}
        />

        <Switch
          name={switchName}
          onClick={() => {
            const isActive = getValues(switchName)

            onCustomerStatusToggle({
              customerId,
              email,
              active: !isActive
            })
          }}
        />
      </S.ActionsRow>
    )
  }

  const columns: Column<Customer & { actions: null }>[] = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        Cell: ({ value: id }) => {
          return (
            <Link href={`${ROUTE_NAMES.MANAGER_CUSTOMERS}/${id}`} passHref>
              <S.Link>{id}</S.Link>
            </Link>
          )
        }
      },
      {
        Header: 'Фамилия',
        accessor: 'lastName',
        sortable: true
      },
      {
        Header: 'Имя',
        accessor: 'firstName',
        sortable: true
      },
      {
        Header: 'Отчество',
        accessor: 'middleName',
        sortable: true
      },
      {
        Header: 'Телефон',
        accessor: 'phone',
        Cell: ({ value: phone }) => formatPhone(phone),
        sortable: true
      },
      {
        Header: 'E-mail',
        accessor: 'email',
        sortable: true
      },
      {
        Header: 'Действия',
        accessor: 'actions',
        Cell: ({ row }) => {
          const { id, email } = row.original

          return renderActions(id, email)
        }
      }
    ],
    []
  )

  const tableCards = customers.map((customer) => {
    const { id, lastName, firstName, middleName, phone, email } = customer

    return (
      <S.TableCard key={id}>
        <S.TableCardTop>
          <Link href={`${ROUTE_NAMES.MANAGER_CUSTOMERS}/${id}`} passHref>
            <S.Link>{id}</S.Link>
          </Link>

          {renderActions(id, email)}
        </S.TableCardTop>

        <S.TableCardContent>
          <S.TableCardRows>
            <Typography>Фамилия</Typography>
            <Typography>{lastName}</Typography>

            <Typography>Имя</Typography>
            <Typography>{firstName}</Typography>

            <Typography>Отчество</Typography>
            <Typography>{middleName}</Typography>

            <Typography>Телефон</Typography>
            <Typography>{formatPhone(phone)}</Typography>

            <Typography>E-mail</Typography>
            <Typography>{email}</Typography>
          </S.TableCardRows>
        </S.TableCardContent>
      </S.TableCard>
    )
  })

  return (
    <S.CustomersTable>
      <FormProvider {...useFormProps}>
        <Table
          columns={columns}
          data={customers}
          isLoading={isLoading}
          noDataText="Покупатели отсутствуют"
        />

        <TableCardsList
          cards={tableCards}
          isLoading={isLoading}
          skeletonHeight={253}
          noDataText="Покупатели отсутствуют"
        />
      </FormProvider>
    </S.CustomersTable>
  )
}
