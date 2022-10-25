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
import { scrollStyles } from 'styled/scroll'

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableBodyContainer
} from 'ui/Table/Table.styled'
import { TableCardsList } from 'components/TableCardsList/TableCardsList.styled'

const media1320 = media.createMedia(1320)
const media900 = media.createMedia(900)

export { Link, TableCard, TableCardTop, TableCardContent, TableCardRows, TableCardActions }

export const CarDetailsTable = styled(Box)`
  border-radius: 0;

  ${Table} {
    position: relative;
    overflow-x: auto;

    ${scrollStyles()}

    &::-webkit-scrollbar {
      height: 10px;
    }

    ${TableBodyContainer} {
      position: relative;
      min-width: 1240px;
      height: 334px;
      overflow-y: auto;
      overflow-x: hidden;

      ${scrollStyles()}
    }
  }

  ${TableHead} {
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    min-width: 1260px;
    z-index: 10;
  }

  ${TableBody} {
    position: absolute;
    min-width: 1240px;
    margin-top: 51px;

    ${TableRow} {
      cursor: pointer;
      grid-template-rows: minmax(20px, auto);

      ${TableCell} {
        word-break: break-all;

        &:first-of-type {
          font-size: 14px;
          font-weight: 400;
          color: var(--color-black);
        }
      }
    }
  }

  ${TableRow} {
    grid-auto-flow: column;
    grid-auto-columns: minmax(100px, 1fr);
    grid-gap: 10px;
  }

  ${TableCardsList} {
    display: none;
  }

  ${media1320} {
    ${TableHead} {
      min-width: 1240px;
    }
  }

  ${media900} {
    background: transparent;
    box-shadow: none;

    ${Table} {
      display: none;
    }

    ${TableCardsList} {
      display: block;
    }

    ${TableCardRows} {
      grid-template-columns: 89px auto;
      grid-gap: 15px 40px;
    }

    ${TableCard} {
      cursor: pointer;
    }
  }
`
