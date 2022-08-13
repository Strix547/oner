import { Button } from 'ui'

import * as S from './OrderActions.styled'

type ActionType =
  | 'cancel'
  | 'cancel-refund'
  | 'documents-print'
  | 'status-change'
  | 'partial-refund'

interface Action {
  label: string
  type: ActionType
}

interface OrderActionsProps {
  partialRefundAvailable?: boolean
  onAction: (type: ActionType) => void
}

export const OrderActions = ({ partialRefundAvailable = true, onAction }: OrderActionsProps) => {
  const actions: Action[] = [
    { label: 'Отменить', type: 'cancel' },
    { label: 'Отменить с возвратом', type: 'cancel-refund' },
    { label: 'Печать документов', type: 'documents-print' },
    { label: 'Изменить статус', type: 'status-change' },
    { label: 'Сделать частичный возврат', type: 'partial-refund' }
  ]

  const actionButtons = actions
    .filter((action) => {
      if (!partialRefundAvailable && action.type === 'partial-refund') return false
      return true
    })
    .map(({ label, type }) => {
      return (
        <li key={type}>
          <Button
            variant="outlined"
            onClick={() => {
              onAction(type)
            }}
          >
            {label}
          </Button>
        </li>
      )
    })

  return <S.OrderActions>{actionButtons}</S.OrderActions>
}
