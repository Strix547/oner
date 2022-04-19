import styled from 'styled-components'

import { TextField } from 'ui/TextField/TextField.styled'
import { RadioGroup } from 'ui/RadioGroup/RadioGroup.styled'
import { SelectFormControl } from 'ui/Select/Select.styled'

export const StepFields = styled.div`
  margin-top: 20px;
  padding: 0 60px 30px;
  box-sizing: border-box;

  ${TextField}:not(:last-child), ${RadioGroup}:not(:last-child), ${SelectFormControl}:not(:last-child) {
    margin-bottom: 20px;
  }
`
