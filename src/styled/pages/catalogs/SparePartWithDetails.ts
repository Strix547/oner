import styled from 'styled-components'

import { media } from 'styled/media'

const media1000 = media.createMedia(1000)

export const SparePartWithDetailsPage = styled.div``

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  ${media1000} {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
`
