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
import { DownloadButton } from 'common/buttons/Download/Download.styled'
import { TableCardsList } from 'components/TableCardsList/TableCardsList.styled'

const media660 = media.createMedia(660)

export { Link, TableCard, TableCardTop, TableCardContent, TableCardRows, TableCardActions }

export const AccountingTable = styled.div`
  ${TableRow} {
    grid-template-columns:
      1fr
      89px
      106px;
  }

  ${Link} {
    display: flex;
    align-items: flex-end;

    svg {
      margin-right: 10px;
    }
  }

  ${TableCardRows} {
    grid-template-columns: 82px 1fr;
  }

  ${TableCardActions} {
    ${DownloadButton} {
      width: auto;
      padding: 0 15px;
    }
  }

  ${media660} {
    ${Table} {
      display: none;
    }

    ${TableCardsList} {
      display: block;
    }
  }
`
