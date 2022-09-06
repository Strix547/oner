import styled from 'styled-components'

import {
  Link,
  TableCard,
  TableCardTop,
  TableCardContent,
  TableCardRows,
  TableCardActions
} from 'styled/components'
import { media } from 'styled/media'

import { Table, TableRow } from 'ui/Table/Table.styled'
import { Button } from 'ui/Button/Button.styled'
import { TableCardsList } from 'components/TableCardsList/TableCardsList.styled'

const media1300 = media.createMedia(1300)
const media900 = media.createMedia(900)

export { Link, TableCard, TableCardTop, TableCardContent, TableCardRows, TableCardActions }

export const PriceTotal = styled.p`
  font-weight: 500;
`

export const DeliveryPrice = styled.span`
  font-weight: 500;
  font-size: 14px;
`

export const OrdersTable = styled.div`
  ${Table} {
    p {
      font-size: 14px;
    }
  }

  ${TableRow} {
    grid-template-columns:
      79px
      68px
      93px
      170px
      90px
      140px
      79px
      24px;

    grid-gap: 20px;

    ${Button} {
      padding: 0;
    }
  }

  ${TableCardRows} {
    grid-template-columns: 140px 1fr;

    ${PriceTotal} {
      font-size: 16px;
    }
  }

  ${media1300} {
    ${TableRow} {
      grid-template-columns:
        79px
        68px
        93px
        minmax(100px, 170px)
        90px
        minmax(auto, 140px)
        79px
        24px;
    }
  }

  ${media.laptop} {
    ${TableRow} {
      justify-content: space-between;
      grid-gap: 10px;
    }
  }

  ${media900} {
    ${Table} {
      display: none;
    }

    ${TableCardsList} {
      display: block;
    }
  }

  ${media.mobile} {
    ${TableCardRows} {
      grid-template-columns: 86px 1fr;
    }
  }
`

export const ColumnShrink = styled.div`
  p {
    white-space: normal;
  }
`

export const TableCardTopRight = styled.div`
  display: flex;
  align-items: center;

  ${Button} {
    margin-top: 4px;
    margin-left: 20px;
    padding: 0;
  }
`
