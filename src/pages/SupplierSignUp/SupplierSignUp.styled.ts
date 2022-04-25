import styled from 'styled-components'

import { Box } from 'styled/components'
import { createMedia } from 'styled'

import { RadioGroup, RadioGroupFormControlLabel } from 'ui/RadioGroup/RadioGroup.styled'
import { Content } from 'components/PageLayout/PageLayout.styled'

const media1200 = createMedia(1200)
const media900 = createMedia(900)
const media500 = createMedia(500)

export const SupplierSignUpPage = styled.div`
  ${Content} {
    display: grid;
    grid-template-columns: 407px 1fr;
    grid-gap: 20px;
    align-items: flex-start;
  }

  ${media1200} {
    ${Content} {
      grid-template-columns: auto 1fr;
    }
  }

  ${media900} {
    ${Content} {
      grid-template-columns: 100%;
    }
  }
`

export const StepperBox = styled(Box)`
  padding: 40px 40px 39px 70px;

  ${media1200} {
    padding: 20px 20px 20px 30px;
  }

  ${media500} {
    padding: 20px;
  }
`

export const StepBoxForm = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 539px;

  h2,
  h4 {
    text-overflow: unset;
    white-space: normal;
  }

  ${media1200} {
    min-height: 500px;
  }

  ${media900} {
    min-height: auto;

    h4 {
      font-size: 18px;
      line-height: 22px;
    }
  }

  ${media500} {
    h4 {
      font-size: 16px;
    }
  }
`

export const StepTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 60px 0;

  h2 {
    font-family: 'TTCommons';
    line-height: 30px;
  }

  span {
    color: #7a7680;
  }

  ${media1200} {
    padding: 20px 30px;
  }

  ${media500} {
    flex-direction: column-reverse;
    align-items: flex-start;
    padding: 30px 20px 20px;

    h2 {
      margin-top: 5px;
      font-size: 18px;
      line-height: 22px;
    }
  }
`

export const RadioGroupRow = styled.div`
  &:not(:last-child) {
    margin-bottom: 40px;
  }

  ${RadioGroup} {
    margin-top: 10px;
  }

  ${media500} {
    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }
`

export const RadioGroupColumn = styled.div`
  margin-top: 20px;

  ${RadioGroup} {
    flex-direction: column;
  }

  ${RadioGroupFormControlLabel} {
    &:not(:last-child) {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }

  ${media500} {
    margin-top: 15px;
  }
`
