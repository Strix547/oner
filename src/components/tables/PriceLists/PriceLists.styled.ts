import styled from 'styled-components'

import {
  Box,
  TableCard,
  TableCardTop,
  TableCardContent,
  TableCardRows,
  TableCardActions
} from 'styled/components'
import { media } from 'styled/media'

import { Badge } from 'styled/components/Badge'
import { Table, TableRow } from 'ui/Table/Table.styled'
import { CancelButton } from 'common/buttons/Cancel/Cancel.styled'
import { DownloadButton } from 'common/buttons/Download/Download.styled'
import { TableCardsList } from 'components/TableCardsList/TableCardsList.styled'

const media1300 = media.createMedia(1300)
const media900 = media.createMedia(900)
const media680 = media.createMedia(680)

export { Badge, TableCard, TableCardTop, TableCardContent, TableCardRows, TableCardActions }

export const TableBox = styled(Box)`
  ${media680} {
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

export const ActivePriceListsTable = styled(TableBox)`
  ${TableRow} {
    grid-template-columns:
      96px
      minmax(51px, 79px)
      minmax(68px, 98px)
      96px
      minmax(105px, 186px)
      109px;
  }

  ${TableCardContent} {
    position: relative;

    ${CancelButton} {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 0;
      border: none;

      svg {
        margin-right: 0;
      }

      span {
        display: none;
      }
    }
  }

  ${TableCardRows} {
    grid-template-columns: 150px auto;

    /* ID value */
    p:nth-child(2) {
      font-size: 16px;
      font-weight: 500;
    }
  }

  ${media.laptop} {
    ${TableRow} {
      justify-content: space-between;
    }
  }

  ${media900} {
    ${TableRow} {
      grid-template-columns:
        96px
        minmax(51px, 79px)
        minmax(68px, 98px)
        96px
        minmax(105px, 186px)
        32px;

      grid-gap: 20px;
    }

    ${CancelButton} {
      padding: 3px;

      svg {
        margin-right: 0;
      }

      span {
        display: none;
      }
    }
  }

  ${media.mobile} {
    ${TableCardRows} {
      grid-template-columns: 98px auto;
    }
  }
`

export const MessagesErrorsPriceListTable = styled(TableBox)`
  ${TableRow} {
    grid-gap: 60px;
    grid-template-columns:
      79px
      192px
      65px
      218px
      106px;
  }

  ${TableCardRows} {
    grid-template-columns: 105px auto;
  }

  ${TableCardActions} {
    ${DownloadButton} {
      width: auto;
      padding: 0 15px;
    }
  }

  ${media1300} {
    ${TableRow} {
      grid-gap: 20px;
      justify-content: space-between;
    }
  }

  ${media900} {
    ${TableRow} {
      grid-template-columns:
        79px
        minmax(auto, 192px)
        65px
        minmax(auto, 218px)
        106px;
    }
  }
`
