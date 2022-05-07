import styled from 'styled-components'

import { media } from 'styled/media'
import { Box } from 'styled/components'
import { Tabs, Tab } from 'ui'

import { Button } from 'ui/Button/Button.styled'
import { TextField } from 'ui/TextField/TextField.styled'

const media500 = media.createMedia(500)

export { Box }

export const SignInPage = styled.div`
  ${Box} {
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
  }
`

export const Top = styled.div`
  padding: 20px 0;
  text-align: center;
`

export const Form = styled.form`
  padding: 30px 50px;
  border-top: 1px solid #e3e3e8;
  border-bottom: 1px solid #e3e3e8;

  ${Tabs} {
    margin-bottom: 30px;
  }

  ${Tab} {
    width: 50%;

    &:not(:last-child) {
      margin-right: 0;
    }
  }

  ${TextField}:not(:last-of-type) {
    margin-bottom: 20px;
  }

  ${Button} {
    margin-top: 20px;
  }

  ${media500} {
    padding: 30px 20px;
  }
`

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;

  p,
  a {
    font-size: 18px;
  }

  a {
    margin-left: 5px;
    font-weight: 500;
  }
`
