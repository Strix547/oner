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

const media1230 = media.createMedia(1230)

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

export const RefundsTable = styled.div`
  ${TableRow} {
    grid-template-columns:
      96px
      66px
      78px
      92px
      81px;

    grid-gap: 100px;
  }

  ${TableCardRows} {
    grid-template-columns: 92px 1fr;
  }

  ${media1230} {
    ${TableRow} {
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
