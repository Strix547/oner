import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { Skeleton } from 'ui/Skeleton/Skeleton.styled'

const gridStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > p {
    text-align: center;
  }
`

export const AddressList = styled.ul`
  ${gridStyles}

  ${Skeleton} > span {
    ${gridStyles}
  }
`
