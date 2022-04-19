import styled from 'styled-components'

import { createMedia } from 'styled'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
  box-sizing: border-box;

  ${createMedia(666)} {
    padding: 0 15px;
  }
`
