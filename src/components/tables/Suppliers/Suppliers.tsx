import { useMemo, useEffect } from 'react'
import { Column } from 'react-table'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import { FormProvider, useForm } from 'react-hook-form'

import { EditButton } from 'common/buttons'
import { Table, Switch, Skeleton } from 'ui'

import { ROUTE_NAMES } from 'core'
import { formatPhone } from 'utils'

import * as S from './Suppliers.styled'

interface Supplier {
  id: number
  name: string | null
  inn: number | null
  phone: string
  fullName: string
  email: string
  active: boolean
}

interface StatusToggleProps {
  supplierId: number
  email: string
  active: boolean
}

interface SuppliersTableProps {
  suppliers?: Supplier[]
  isLoading?: boolean
  onSupplierEdit: (id: number) => void
  onSupplierStatusToggle: (props: StatusToggleProps) => void
}

export const SuppliersTable = ({
  suppliers = [],
  isLoading,
  onSupplierEdit,
  onSupplierStatusToggle
}: SuppliersTableProps) => {
  const useFormProps = useForm()
  const { reset, getValues } = useFormProps

  useEffect(() => {
    if (suppliers.length) {
      suppliers.forEach(({ id, active }) => {
        reset({
          ...getValues(),
          [`supplier-active-${id}`]: active
        })
      })
    }
  }, [suppliers, reset, getValues])

  const renderActions = (supplierId: number, email: string) => {
    return (
      <S.ActionsRow>
        <EditButton
          onClick={() => {
            onSupplierEdit(supplierId)
          }}
        />
        <Switch
          name={`supplier-active-${supplierId}`}
          onClick={() => {
            const isActive = getValues(`supplier-active-${supplierId}`)
            onSupplierStatusToggle({
              supplierId,
              email,
              active: !isActive
            })
          }}
        />
      </S.ActionsRow>
    )
  }

  const columns: Column<Supplier>[] = useMemo(
    () => [
      {
        Header: 'Название организации',
        accessor: 'name',
        Cell: ({ value: name, row }) => {
          const supplierId = row.original.id

          return (
            <Link href={`${ROUTE_NAMES.MANAGER_SUPPLIERS}/${supplierId}`} passHref>
              <S.Link>{name}</S.Link>
            </Link>
          )
        },
        sortable: true
      },
      {
        Header: 'ИНН',
        accessor: 'inn',
        Cell: ({ value: inn }) => {
          return <Typography fontWeight={500}>{inn}</Typography>
        },
        sortable: true
      },
      {
        Header: 'Контактный телефон',
        accessor: 'phone',
        Cell: ({ value: phone }) => formatPhone(phone)
      },
      {
        Header: 'Контактное лицо',
        accessor: 'fullName'
      },
      {
        Header: 'Действия',
        accessor: 'id',
        Cell: ({ value: supplierId, row }) => {
          return renderActions(supplierId, row.original.email)
        }
      }
    ],
    []
  )

  const tableCards = suppliers.length ? (
    suppliers.map((supplier) => {
      const { id, name, inn, phone, fullName, email } = supplier

      return (
        <S.TableCard key={id}>
          <S.TableCardTop>
            <Link href={`${ROUTE_NAMES.MANAGER_SUPPLIERS}/${id}`} passHref>
              <S.Link>{name}</S.Link>
            </Link>

            {renderActions(id, email)}
          </S.TableCardTop>

          <S.TableCardContent>
            <S.TableCardRows>
              <Typography>ИНН</Typography>
              <Typography fontWeight={500}>{inn}</Typography>

              <Typography>Телефон</Typography>
              <Typography>{formatPhone(phone)}</Typography>

              <Typography>Контактное лицо</Typography>
              <Typography>{fullName}</Typography>
            </S.TableCardRows>
          </S.TableCardContent>
        </S.TableCard>
      )
    })
  ) : (
    <S.NoDataText>Данные отсутствуют</S.NoDataText>
  )

  return (
    <S.SuppliersTable>
      <FormProvider {...useFormProps}>
        <Table columns={columns} data={suppliers} isLoading={isLoading} />

        <S.TableCardsList>
          {!isLoading ? tableCards : <Skeleton count={3} height={181} />}
        </S.TableCardsList>
      </FormProvider>
    </S.SuppliersTable>
  )
}
