import styled, { css } from 'styled-components'

import { Skeleton } from 'ui/Skeleton/Skeleton.styled'

interface RequisitesListProps {
  column: boolean
}

const gridStyles = ({ column }: RequisitesListProps) => css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;

  ${column &&
  css`
    grid-template-columns: 1fr;

    .form-group {
      gap: 20px;
    }
  `}
`

export const RequisitesList = styled.ul<RequisitesListProps>`
  ${(props) => gridStyles(props)}
`

export const NoRequisites = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export const SkeletonList = styled.div<RequisitesListProps>`
  ${Skeleton} > span {
    ${(props) => gridStyles(props)}
  }
`
