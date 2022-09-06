import styled from 'styled-components'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'

import { TextField } from 'ui/TextField/TextField.styled'

export const SparePartsCategories = styled.div`
  padding: 30px 40px;
  background: #fff;
  border: 1px solid #e3e3e8;
  box-shadow: 0px 2px 5px rgba(38, 34, 45, 0.03);
  border-radius: 6px;
`

export const SearchRow = styled.div`
  max-width: 350px;

  ${TextField} {
    .text-field-input-root {
      .text-field-input {
        font-size: 16px;
        line-height: 20px;
        padding: 14px 4px 9px 10px;
      }

      .input-adornment {
        svg {
          fill: #92979e;
        }
      }
    }
  }
`

export const CategoriesGroups = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 30px;
`

export const CategoryLink = styled.a`
  font-size: 18px;
  line-height: 22px;
  color: var(--color-primary);

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`

export const Accordion = styled(MuiAccordion)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: none;

  &::before {
    display: none;
  }

  & ~ ${CategoryLink} {
    margin-left: 10px;

    &:first-of-type {
      margin-top: 10px;
    }
  }
`

export const ExpandIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid #dedee2;
  border-radius: 4px;
  box-sizing: border-box;
  transition: 0.3s;
`

export const AccordionSummary = styled(MuiAccordionSummary)`
  flex-direction: row-reverse;
  padding: 8px 18px 8px 8px;
  min-height: 24px;
  transition: 0.3s;

  &:hover {
    background: rgba(107, 89, 204, 0.1);
    border-radius: 6px;

    .accordion-summary-content {
      p {
        color: var(--color-primary);
      }
    }

    ${ExpandIcon} {
      border-color: transparent;

      svg path {
        stroke: var(--color-primary);
      }
    }
  }

  .accordion-summary-content {
    margin: 0 0 0 10px;

    p {
      font-size: 18px;
      line-height: 22px;
      color: #3d3d4b;
      transition: 0.3s;
    }
  }

  .accordion-expand-icon-container {
    transform: rotate(0deg);
  }

  &.accordion-summary-expanded {
  }
`

export const AccordionDetails = styled(MuiAccordionDetails)`
  padding: 12px 20px 15px 42px;
`
