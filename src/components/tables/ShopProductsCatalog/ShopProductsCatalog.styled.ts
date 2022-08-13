import styled from 'styled-components'

import { Box } from 'styled/components'
import { media } from 'styled/media'

import { TableRow, TableHead, TableHeadCell, TableCell, Table } from 'ui/Table/Table.styled'

const media860 = media.createMedia(860)
const media550 = media.createMedia(550)
const media400 = media.createMedia(400)

export const ShopProductsCatalogTable = styled(Box)`
  ${Table} {
    font-size: 16px;
  }

  ${TableRow} {
    grid-template-columns:
      170px
      minmax(150px, 1fr)
      90px
      85px
      95px;
  }

  ${TableHead} {
    /* border-bottom: none; */

    ${TableRow}:nth-child(2) {
      margin: 10px 10px 0;
      padding: 0 10px;
      background: #f4f5f7;
      border-radius: 8px;

      ${TableHeadCell} {
        color: #3d3d4b;

        &:first-child {
          font-weight: 500;
          color: var(--color-black);
        }
      }
    }
  }

  ${media860} {
    ${Table}, p {
      font-size: 14px;
    }

    ${TableRow} {
      grid-template-columns:
        minmax(140px, 170px)
        minmax(40px, 90px)
        minmax(48px, 85px)
        minmax(49px, 95px);
      justify-content: space-between;

      ${TableHeadCell}:nth-child(2), ${TableCell}:nth-child(2) {
        display: none;
      }
    }
  }

  ${media550} {
    ${TableHead} ${TableRow} {
      padding: 0 10px;
    }

    ${TableRow} {
      grid-gap: 15px;
      padding: 10px;

      &:not(:last-child)::before {
        left: 10px;
        width: calc(100% - 20px);
      }
    }
  }

  ${media400} {
    ${TableHead} ${TableRow} {
      padding: 0 5px;
    }

    ${TableRow} {
      grid-gap: 10px;
      padding: 5px;

      &:not(:last-child)::before {
        left: 5px;
        width: calc(100% - 10px);
      }
    }
  }
`

export const DeliveryPeriod = styled.span`
  display: flex;
  align-items: center;

  svg {
    margin-left: 10px;
  }

  ${media.mobile} {
    svg {
      margin-left: 5px;
    }
  }
`

export const FirstCell = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & > p {
    color: var(--color-primary);
  }
`
