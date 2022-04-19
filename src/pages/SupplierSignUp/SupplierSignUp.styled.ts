import styled from 'styled-components'

import { Box } from 'styled/components'

import { RadioGroup, RadioGroupFormControlLabel } from 'ui/RadioGroup/RadioGroup.styled'
import { Content } from 'components/PageLayout/PageLayout.styled'

export const SupplierSignUpPage = styled.div`
  ${Content} {
    display: grid;
    grid-template-columns: 407px 1fr;
    grid-gap: 20px;
    align-items: flex-start;
  }
`

export const StepperBox = styled(Box)`
  padding: 40px 40px 39px 70px;
`

export const StepBoxForm = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 539px;
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
`

export const RadioGroupRow = styled.div`
  &:not(:last-child) {
    margin-bottom: 40px;
  }

  ${RadioGroup} {
    margin-top: 10px;
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
      margin-bottom: 20px;
    }
  }
`
