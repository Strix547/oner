import styled from 'styled-components'

import { createMedia } from 'styled'

import { TextField } from 'ui/TextField/TextField.styled'
import { RadioGroup } from 'ui/RadioGroup/RadioGroup.styled'
import { SelectFormControl } from 'ui/Select/Select.styled'

const media1200 = createMedia(1200)
const media500 = createMedia(500)

export const StepFields = styled.div`
  margin-top: 20px;
  padding: 0 60px 30px;
  box-sizing: border-box;

  ${TextField}:not(:last-child), ${RadioGroup}:not(:last-child), ${SelectFormControl}:not(:last-child) {
    margin-bottom: 20px;
  }

  ${media1200} {
    margin-top: 0;
    padding: 0 30px 20px;
  }

  ${media500} {
    padding: 0 20px 20px;
  }
`
