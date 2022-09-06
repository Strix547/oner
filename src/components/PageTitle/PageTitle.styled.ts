import styled from 'styled-components'

import { media } from 'styled/media'

export const PageTitle = styled.div`
  margin-bottom: 20px;

  h1 {
    white-space: normal;
  }

  ${media.mobile} {
    h1 {
      font-size: 20px;
      line-height: 26px;
    }
  }
`
