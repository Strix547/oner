import { useMemo, useEffect } from 'react'
import { Column } from 'react-table'
import { useForm, FormProvider } from 'react-hook-form'
import Link from 'next/link'
import Typography from '@mui/material/Typography'

import { TableCardsList } from 'components'
import { Table, Switch } from 'ui'
import { EditButton } from 'common/buttons'

import { Store, StoreStatus } from 'types/supplier'
import { formatPhone } from 'utils'

import * as S from './Stores.styled'

interface StoreColumn {
  id: number
  name: string
  city: string
  address: string
  phone: string
  email: string
  status: StoreStatus
  actions: null
}

interface OnStoreStatusToggle {
  id: number
  enabled: boolean
}

interface StoresTableProps {
  stores?: Store[]
  storePath?: string
  isLoading?: boolean
  onStoreEdit?: (id: number) => void
  onStoreStatusToggle: ({ id, enabled }: OnStoreStatusToggle) => void
}

export const StoresTable = ({
  stores = [],
  storePath,
  isLoading,
  onStoreStatusToggle,
  onStoreEdit
}: StoresTableProps) => {
  const useFormProps = useForm()
  const { reset, getValues } = useFormProps

  // set enabled status
  useEffect(() => {
    if (stores.length) {
      stores.forEach(({ id, enabled }) => {
        reset({
          ...getValues(),
          [`store-enabled-${id}`]: enabled
        })
      })
    }
  }, [stores, reset, getValues])

  const renderStatusBadge = (status: StoreStatus) => {
    switch (status) {
      case 'active':
        return <S.Badge color="green">Активен</S.Badge>
      case 'disactive':
        return <S.Badge color="gray">Неактивен</S.Badge>
      case 'moderation':
        return <S.Badge color="orange">Модерация</S.Badge>
    }
  }

  const renderStoreActions = (id: number) => {
    return (
      <S.ActionsRow>
        {onStoreEdit && (
          <EditButton
            onClick={() => {
              onStoreEdit(id)
            }}
          />
        )}

        <Switch
          name={`store-enabled-${id}`}
          onClick={() => {
            const isEnabled = getValues(`store-enabled-${id}`)

            onStoreStatusToggle({
              id,
              enabled: !isEnabled
            })
          }}
        />
      </S.ActionsRow>
    )
  }

  const columns: Column<StoreColumn>[] = useMemo(
    () => [
      {
        Header: 'Название',
        accessor: 'name',
        Cell: ({ value: name, row }) => {
          const storeId = row.original.id

          return (
            <Link href={`${storePath}/${storeId}`} passHref>
              <S.Link>{name}</S.Link>
            </Link>
          )
        }
      },
      {
        Header: 'Город',
        accessor: 'city'
      },
      {
        Header: 'Адрес',
        accessor: 'address'
      },
      {
        Header: 'Телефон',
        accessor: 'phone',
        Cell: ({ value: phone }) => formatPhone(phone)
      },
      {
        Header: 'Эл. почта',
        accessor: 'email',
        Cell: ({ value: email }) => <Typography>{email}</Typography>
      },
      {
        Header: 'Статус',
        accessor: 'status',
        Cell: ({ value: status }) => {
          return renderStatusBadge(status)
        }
      },
      {
        Header: 'Действия',
        accessor: 'actions',
        Cell: ({ row }) => {
          const storeId = row.original.id

          return renderStoreActions(storeId)
        }
      }
    ],
    []
  )

  const selectStoreProps = (stores: Store[]): StoreColumn[] => {
    return stores.map((store) => {
      const { id, name, city, phone, email, status, address } = store

      return {
        id,
        name,
        city,
        address,
        phone,
        email,
        status,
        actions: null
      }
    })
  }

  const tableCards = selectStoreProps(stores).map((store) => {
    const { id, name, city, phone, email, status, address } = store

    return (
      <S.TableCard key={id}>
        <S.TableCardTop>
          <Link href={`${storePath}/${id}`} passHref>
            <S.Link>{name}</S.Link>
          </Link>

          <S.TableCardTopRight>{renderStoreActions(id)}</S.TableCardTopRight>
        </S.TableCardTop>

        <S.TableCardContent>
          <S.TableCardRows>
            <Typography>Город</Typography>
            <Typography>{city}</Typography>

            <Typography>Адрес</Typography>
            <Typography>{address}</Typography>

            <Typography>Телефон</Typography>
            <Typography>{phone}</Typography>

            <Typography>Эл. почта</Typography>
            <Typography>{email}</Typography>

            <Typography>Статус</Typography>
            {renderStatusBadge(status)}
          </S.TableCardRows>
        </S.TableCardContent>
      </S.TableCard>
    )
  })

  return (
    <S.StoresTable>
      <FormProvider {...useFormProps}>
        <Table
          columns={columns}
          data={selectStoreProps(stores)}
          isLoading={isLoading}
          noDataText="Магазины отсутствуют"
        />

        <TableCardsList
          cards={tableCards}
          isLoading={isLoading}
          noDataText="Магазины отсутствуют"
          skeletonHeight={277}
        />
      </FormProvider>
    </S.StoresTable>
  )
}
