import React from 'react'
import { Skeleton } from 'ui'

import * as S from './TableCardsList.styled'

interface TableCardsListProps {
  cards: JSX.Element[]
  isLoading?: boolean
  noDataText?: string
  skeletonHeight?: number
}

export const TableCardsList = ({
  cards,
  isLoading,
  noDataText = 'Данные отсутствуют',
  skeletonHeight
}: TableCardsListProps) => {
  if (!cards.length && !isLoading) {
    return (
      <S.TableCardsList>
        <S.NoDataText>{noDataText}</S.NoDataText>
      </S.TableCardsList>
    )
  }

  return (
    <S.TableCardsList>
      {!isLoading ? cards : <Skeleton count={3} height={skeletonHeight} />}
    </S.TableCardsList>
  )
}
