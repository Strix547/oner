import styled from '@emotion/styled'
import { css } from '@emotion/react'

import {
  Link,
  TableCard,
  TableCardTop,
  TableCardContent,
  TableCardRows,
  TableCardActions
} from 'styled/components'
import { media } from 'styled/media'

import { Button } from 'ui'

import { Table, TableRow } from 'ui/Table/Table.styled'
import { TableCardsList } from 'components/TableCardsList/TableCardsList.styled'

type OrderStatus = 'active'

interface OrderStatusProps {
  status: OrderStatus
}

const media1260 = media.createMedia(1260)
const media800 = media.createMedia(800)
const media730 = media.createMedia(730)

export { Link, TableCard, TableCardTop, TableCardContent, TableCardRows, TableCardActions }

export const OrdersReceiptsTable = styled.div`
  ${Table} {
    font-size: 16px;
  }

  ${TableRow} {
    grid-template-columns:
      110px
      76px
      89px
      110px
      96px
      137px;

    grid-gap: 45px;
  }

  ${TableCardRows} {
    grid-template-columns: 120px 1fr;
  }

  ${media1260} {
    ${TableRow} {
      grid-gap: 20px;
      justify-content: space-between;
    }
  }

  ${media800} {
    ${TableRow} {
      grid-template-columns:
        110px
        76px
        89px
        110px
        minmax(70px, 96px)
        minmax(96px, 137px);
    }
  }

  ${media730} {
    ${Table} {
      display: none;
    }

    ${TableCardsList} {
      display: block;
    }
  }

  ${media.mobile} {
    ${TableCardRows} {
      & > *:nth-child(even) {
        justify-self: flex-end;
      }
    }
  }
`

const getStatusStyles = (status: OrderStatus) => {
  if (status === 'active') {
    return css`
      color: var(--color-green-200);

      &::before {
        background: var(--color-green-200);
      }
    `
  }

  return css`
    color: var(--color-gray);

    &::before {
      background: var(--color-gray);
    }
  `
}

export const OrderStatus = styled.span<OrderStatusProps>`
  position: relative;
  padding-left: 16px;
  font-size: 16px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 3px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  ${({ status }) => getStatusStyles(status)}
`

export const DocumentButton = styled(Button)`
  padding: 4px;

  svg path {
    transition: 0.3s;
  }

  &:hover {
    background: var(--color-primary);

    svg {
      path {
        stroke: #fff;
      }
    }
  }
`
