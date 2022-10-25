import styled from '@emotion/styled'

import {
  Link,
  Badge,
  TableCard,
  TableCardTop,
  TableCardContent,
  TableCardRows,
  TableCardActions
} from 'styled/components'
import { media } from 'styled/media'

import { Table, TableRow } from 'ui/Table/Table.styled'
import { EditButton } from 'common/buttons/Edit/Edit.styled'
import { TableCardsList } from 'components/TableCardsList/TableCardsList.styled'

const media1300 = media.createMedia(1300)
const media880 = media.createMedia(880)

export { Link, Badge, TableCard, TableCardTop, TableCardContent, TableCardRows, TableCardActions }

export const StoresTable = styled.div`
  ${TableRow} {
    grid-template-columns:
      120px
      99px
      130px
      110px
      120px
      86px
      74px;

    grid-gap: 27px;

    ${Link} {
      font-size: 14px;
    }
  }

  ${TableCardRows} {
    grid-template-columns: 60px 1fr;
  }

  ${media1300} {
    ${TableRow} {
      grid-template-columns:
        120px
        99px
        130px
        110px
        120px
        86px
        74px;

      grid-gap: 10px;
      justify-content: space-between;
    }
  }

  ${media880} {
    ${Table} {
      display: none;
    }

    ${TableCardsList} {
      display: block;
    }
  }
`

export const ActionsRow = styled.div`
  ${EditButton} {
    width: 24px;
    margin-right: 10px;
  }
`

export const StoreName = styled.div`
  cursor: pointer;
`

export const TableCardTopRight = styled.div`
  display: flex;
  align-items: center;
`
