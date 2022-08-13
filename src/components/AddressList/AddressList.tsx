import Typography from '@mui/material/Typography'

import { AddressCard } from 'components'
import { Skeleton } from 'ui'

import { Address } from 'types/account'

import * as S from './AddressList.styled'

interface AddressListProps {
  addresses?: Address[]
  isLoading: boolean
  onEdit: (props: Address) => void
  onDelete: (id: number) => void
}

export const AddressList = ({ addresses, isLoading, onEdit, onDelete }: AddressListProps) => {
  if (isLoading) {
    return (
      <S.AddressList>
        <Skeleton count={2} height={119} />
      </S.AddressList>
    )
  }

  if (!addresses?.length) {
    return (
      <S.AddressList>
        <Typography variant="body2" component="p">
          У вас нет добавленных адресов
        </Typography>
      </S.AddressList>
    )
  }

  const addressCards = addresses.map((address) => {
    const { id } = address

    return (
      <AddressCard
        key={id}
        address={address}
        onEdit={() => onEdit(address)}
        onDelete={() => onDelete(id)}
      />
    )
  })

  return (
    <>
      <S.AddressList>{addressCards}</S.AddressList>
    </>
  )
}
