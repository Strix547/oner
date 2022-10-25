import styled from '@emotion/styled'

import { media } from 'styled/media'

import { TextField } from 'ui/TextField/TextField.styled'
import { Skeleton } from 'ui/Skeleton/Skeleton.styled'

const media460 = media.createMedia(460)

export const SparePartsUnits = styled.div`
  padding: 30px 40px;
  background: #fff;
  border: 1px solid #e3e3e8;
  box-shadow: 0px 2px 5px rgba(38, 34, 45, 0.03);
  border-radius: 6px;
  overflow: hidden;

  ${media.mobile} {
    padding: 30px 20px;
  }

  ${media460} {
    ${Skeleton} {
      .react-loading-skeleton {
        width: 100% !important;
      }
    }
  }
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

export const UnitLinks = styled.ul`
  margin-top: 38px;

  li:not(:last-child) {
    margin-bottom: 20px;
  }
`
