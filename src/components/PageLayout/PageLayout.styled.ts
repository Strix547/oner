import styled from 'styled-components'

import { createMedia } from 'styled/media'
import { Wrapper } from 'styled/components'

const media1200 = createMedia(1200)

export { Wrapper }

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  & > ${Wrapper} {
    h1:first-child {
      margin-top: 30px;
    }
  }

  footer {
    margin-top: auto;
  }
`

export const Content = styled.div`
  padding-top: 30px;
  padding-bottom: 60px;

  ${media1200} {
    padding-bottom: 40px;
  }
`
