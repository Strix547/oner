import styled from 'styled-components'

import { media } from 'styled/media'

export const AccountPageTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  h2 {
    font-family: 'TTCommons';
    line-height: 30px;
  }

  ${media.mobile} {
    font-size: 20px;
  }
`
