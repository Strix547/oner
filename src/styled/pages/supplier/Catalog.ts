import styled from 'styled-components'

import { media } from 'styled/media'

import { TextField } from 'ui/TextField/TextField.styled'

export const SearchRow = styled.div`
  width: 350px;
  margin-bottom: 15px;

  ${TextField} {
    background: #fff;

    .text-field-input-root {
      height: 48px;
    }

    .input-adornment {
      margin-top: -3px;

      svg {
        fill: #92979e;
      }
    }
  }

  ${media.tablet} {
    width: 100%;
    margin-bottom: 20px;
  }
`
