import styled from 'styled-components'

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
import { scrollStyles } from 'styled/scroll'

import { Table, TableBody, TableCell, TableRow } from 'ui/Table/Table.styled'
import { TableCardsList } from 'components/TableCardsList/TableCardsList.styled'

export const CarDetailsTable = styled(Box)`
  border-radius: 0;

  ${Table} {
    max-height: 355px;
    overflow-y: auto;

    ${scrollStyles()}
  }

  ${TableBody} {
    ${TableRow} {
      cursor: pointer;

      ${TableCell}:first-child {
        font-size: 14px;
        font-weight: 400;
        color: var(--color-black);
      }
    }
  }

  ${TableRow} {
    grid-template-columns: repeat(6, 1fr);
  }
`
