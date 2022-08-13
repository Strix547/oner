import styled from 'styled-components'

import {
  Link,
  TableCardsList,
  TableCard,
  TableCardTop,
  TableCardContent,
  TableCardRows,
  TableCardActions,
  NoDataText
} from 'styled/components'
import { media } from 'styled/media'

import { Table, TableRow } from 'ui/Table/Table.styled'

export {
  Link,
  TableCardsList,
  TableCard,
  TableCardTop,
  TableCardContent,
  TableCardRows,
  TableCardActions,
  NoDataText
}

export const OrderProductsTable = styled.div`
  ${TableRow} {
    grid-template-columns:
      minmax(auto, 300px)
      71px
      79px
      70px
      79px;
  }

  ${TableCardRows} {
    grid-template-columns: 80px 1fr;
  }

  ${media.laptop} {
    ${TableRow} {
      grid-template-columns:
        auto
        71px
        79px
        70px
        79px;
      grid-gap: 20px;
      justify-content: space-between;
    }
  }

  ${media.tablet} {
    ${Table} {
      display: none;
    }

    ${TableCardsList} {
      display: block;
    }
  }
`
