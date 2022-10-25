import styled from '@emotion/styled'

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
import { TableCardsList } from 'components/TableCardsList/TableCardsList.styled'

export { Link, TableCard, TableCardTop, TableCardContent, TableCardRows, TableCardActions }

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
