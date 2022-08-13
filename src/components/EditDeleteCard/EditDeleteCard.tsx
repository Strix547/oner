import { ReactNode } from 'react'

import * as S from './EditDeleteCard.styled'

import { EditButton, DeleteButton } from 'common/buttons'

interface EditDeleteCardProps {
  children: ReactNode
  onEdit: () => void
  onDelete: () => void
}

export const EditDeleteCard = ({ children, onEdit, onDelete }: EditDeleteCardProps) => {
  return (
    <S.EditDeleteCard>
      {children}

      <S.Actions>
        <EditButton onClick={onEdit} />
        <DeleteButton onClick={onDelete} />
      </S.Actions>
    </S.EditDeleteCard>
  )
}
