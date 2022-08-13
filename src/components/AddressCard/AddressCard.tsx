import Typography from '@mui/material/Typography'

import { EditDeleteCard } from 'components'

import { getFullAddressStr } from 'utils'
import { Address } from 'types/account'

import * as S from './AddressCard.styled'

interface AddressCardProps {
  address: Address
  onEdit: () => void
  onDelete: () => void
}

export const AddressCard = ({ address, onEdit, onDelete }: AddressCardProps) => {
  const { apartment, building, city, house, name, postalCode, street } = address

  return (
    <S.AddressCard>
      <EditDeleteCard onEdit={onEdit} onDelete={onDelete}>
        <S.Address>
          <Typography variant="h5" component="p">
            {name}
          </Typography>
          <Typography>{getFullAddressStr({ city, street, house, building, apartment })}</Typography>
          <Typography>Индекс {postalCode}</Typography>
        </S.Address>
      </EditDeleteCard>
    </S.AddressCard>
  )
}
