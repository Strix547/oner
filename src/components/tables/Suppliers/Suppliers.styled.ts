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

const media1240 = media.createMedia(1240)

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

export const SuppliersTable = styled(Box)`
  ${Table} {
    font-size: 16px;
  }

  ${TableRow} {
    grid-template-columns:
      minmax(auto, 257px)
      93px
      136px
      110px
      84px;
  }

  ${TableCardRows} {
    grid-template-columns: 96px 1fr;
  }

  ${media1240} {
    ${TableRow} {
      grid-gap: 20px;
      justify-content: space-between;
    }
  }

  ${media.tablet} {
    background: transparent;
    box-shadow: none;

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
  align-items: center;
  grid-gap: 20px;
`
