import styled from '@emotion/styled'

import { NoDataText } from 'styled/components'

import { SkeletonItem } from 'ui/Skeleton/Skeleton.styled'

export { NoDataText }

export const TableCardsList = styled.div`
  display: none;

  ${SkeletonItem} {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`
