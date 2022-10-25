import styled from '@emotion/styled'

import { media } from 'styled/media'

import { Button } from 'ui/Button/Button.styled'

const media800 = media.createMedia(800)
const media380 = media.createMedia(380)

export const OrderActions = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 15px;

  ${Button} {
    min-height: 40px;
    height: 100%;
    padding: 5px 19.5px;
    font-size: 16px;
    line-height: 20px;
    color: #3d3d4b;
    border: 1px solid #c5c3c8;
  }

  ${media800} {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  ${media380} {
    flex-direction: column;
    width: 100%;

    ${Button} {
      width: 100%;
    }
  }
`
