import styled from '@emotion/styled'

import {
  Box,
  Link,
  TableCard,
  TableCardTop,
  TableCardContent,
  TableCardRows,
  TableCardActions
} from 'styled/components'
import { media } from 'styled/media'

import { Button } from 'ui/Button/Button.styled'
import { Table, TableRow } from 'ui/Table/Table.styled'
import { TableCardsList } from 'components/TableCardsList/TableCardsList.styled'

const media1300 = media.createMedia(1300)
const media850 = media.createMedia(850)

export { Link, TableCard, TableCardTop, TableCardContent, TableCardRows, TableCardActions }

export const CustomersTable = styled(Box)`
  ${Table} {
    font-size: 16px;
  }

  ${TableRow} {
    grid-template-columns:
      50px
      60px
      70px
      70px
      127px
      167px
      128px;
    justify-content: space-between;
    grid-gap: 30px;
  }

  ${TableCardRows} {
    grid-template-columns: 55px 1fr;
  }

  ${media1300} {
    ${TableRow} {
      grid-gap: 10px;
    }
  }

  ${media850} {
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
  justify-content: space-between;
  width: 128px;

  ${Button} {
    padding: 0;
  }
`
