import styled from 'styled-components'

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
