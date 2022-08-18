import Typography from '@mui/material/Typography'

import { EditDeleteCard } from 'components'

import * as S from './RequisitesCard.styled'

import СardIcon from 'public/icons/card.svg'

interface RequisitesCardProps {
  id: number
  name: string
  accountNumber: string
  onEdit?: () => void
  onDelete?: () => void
  asRadio?: boolean
}

export const RequisitesCard = ({
  id,
  name,
  accountNumber,
  onEdit,
  onDelete,
  asRadio = false
}: RequisitesCardProps) => {
  const requisitesLeftSide = (
    <S.Left>
      <S.CardIcon>
        <СardIcon />
      </S.CardIcon>

      <S.Info>
        <Typography variant="h5" component="p">
          {name}
        </Typography>

        <Typography>•••• {String(accountNumber).slice(-4)}</Typography>
      </S.Info>
    </S.Left>
  )

  return (
    <S.RequisitesCard asRadio={asRadio}>
      {asRadio ? (
        <>
          {requisitesLeftSide}
          <S.RadioGroupFormControlLabel
            label="Основной счёт"
            labelPlacement="start"
            control={<S.Radio />}
            value={id}
          />
        </>
      ) : (
        <EditDeleteCard
          onEdit={() => {
            if (onEdit) {
              onEdit()
            }
          }}
          onDelete={() => {
            if (onDelete) {
              onDelete()
            }
          }}
        >
          {requisitesLeftSide}
        </EditDeleteCard>
      )}
    </S.RequisitesCard>
  )
}
