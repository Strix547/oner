import styled from 'styled-components'

import { Box } from 'styled/components'
import { media } from 'styled/media'

import { Button } from 'ui/Button/Button.styled'

export { Box }

export const AccountPersonalInfoPage = styled.div``

export const Form = styled.form`
  max-width: 400px;
  padding: 30px;

  & > div:not(:last-child) {
    margin-bottom: 20px;
  }

  ${Button} {
    max-width: 187px;
    font-size: 16px;
  }

  ${media.mobile} {
    padding: 30px 20px;
  }
`
