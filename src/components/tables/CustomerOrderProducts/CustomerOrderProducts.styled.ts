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
import { Box } from 'common/Box/Box.styled'

const media720 = media.createMedia(720)

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

export const CustomerOrderProductsTable = styled.div`
  margin-top: 10px;

  ${TableRow} {
    grid-template-columns:
      1fr
      minmax(100px, auto)
      minmax(100px, auto)
      100px
      50px;
  }

  ${TableCardRows} {
    grid-template-columns: 89px auto;
    grid-gap: 15px 60px;
  }

  ${media720} {
    ${Table} {
      display: none;
    }

    ${TableCardsList} {
      display: block;
      margin-top: 10px;
    }

    ${Box} {
      background: transparent;
      box-shadow: none;

      h4 {
        padding: 0;
      }
    }
  }
`
