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

const media1230 = media.createMedia(1230)

export { Link, TableCard, TableCardTop, TableCardContent, TableCardRows, TableCardActions }

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
