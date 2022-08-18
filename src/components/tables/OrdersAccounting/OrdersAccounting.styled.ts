import styled from 'styled-components'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'

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

const media600 = media.createMedia(600)

export { Link, TableCard, TableCardTop, TableCardContent, TableCardRows, TableCardActions }

export const OrdersAccountingTable = styled.div`
  ${Table} {
    font-size: 16px;
  }

  ${TableRow} {
    grid-template-columns:
      96px
      1fr
      200px;
  }

  ${media600} {
    ${Table} {
      display: none;
    }

    ${TableCardsList} {
      display: block;
    }
  }
`

export const DocumentsCell = styled.div``

export const DocumentsAccordion = styled(MuiAccordion)`
  background: transparent;
  box-shadow: none;
  border-bottom: none;

  &::before {
    display: none;
  }

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`

export const DocumentsAccordionSummary = styled(MuiAccordionSummary)`
  min-height: 24px;
  padding: 0;

  .accordion-summary-content {
    display: flex;
    align-items: center;
    margin: 0;
    margin-right: 5px;

    span {
      margin-top: 6px;
      margin-left: 10px;
    }
  }

  .accordion-expand-icon-container {
    transform: rotate(90deg);

    svg {
      margin-left: 3px;
    }
  }
`

export const DocumentsAccordionDetails = styled(MuiAccordionDetails)`
  margin-top: 15px;
  padding: 0;
`

export const Document = styled.div`
  display: flex;
  align-items: center;

  span {
    width: 135px;
    margin-top: 3px;
    margin-left: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`
