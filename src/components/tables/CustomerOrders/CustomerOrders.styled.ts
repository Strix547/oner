import styled from 'styled-components'

import {
  Box,
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

const media1300 = media.createMedia(1300)
const media860 = media.createMedia(860)

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

export const CustomerOrdersTable = styled(Box)`
  ${TableRow} {
    grid-template-columns:
      96px
      66px
      120px
      105px
      75px
      128px
      70px;
  }

  ${TableCardRows} {
    grid-template-columns: 89px auto;
    grid-gap: 15px 40px;
  }

  ${media1300} {
    ${TableRow} {
      grid-template-columns:
        96px
        66px
        120px
        105px
        75px
        128px
        70px;

      justify-content: space-between;
      grid-gap: 0;
    }
  }

  ${media860} {
    background: transparent;

    ${Table} {
      display: none;
    }

    ${TableCardsList} {
      display: block;
    }
  }
`

export const ActionsRow = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`

export const CustomerOrdersShrinkTable = styled.div`
  ${TableRow} {
    grid-template-columns:
      96px
      66px
      93px
      116px
      120px
      116px
      79px;

    grid-gap: 30px;
  }

  ${TableCardRows} {
    grid-template-columns: 116px 1fr;
  }

  ${media1300} {
    ${TableRow} {
      justify-content: space-between;
      grid-gap: 10px;
    }
  }

  ${media860} {
    background: transparent;

    ${Table} {
      display: none;
    }

    ${TableCardsList} {
      display: block;
    }
  }
`
