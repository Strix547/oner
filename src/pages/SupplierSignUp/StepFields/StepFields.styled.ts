import styled from 'styled-components'

import { media } from 'styled/media'

import { TextField } from 'ui/TextField/TextField.styled'
import { RadioGroup } from 'ui/RadioGroup/RadioGroup.styled'
import { SelectFormControl } from 'ui/Select/Select.styled'

const media500 = media.createMedia(500)

export const StepFields = styled.div`
  margin-top: 20px;
  padding: 0 60px 30px;
  box-sizing: border-box;

  ${TextField}:not(:last-child), ${RadioGroup}:not(:last-child), ${SelectFormControl}:not(:last-child) {
    margin-bottom: 20px;
  }

  ${media.laptop} {
    margin-top: 0;
    padding: 0 30px 20px;
  }

  ${media500} {
    padding: 0 20px 20px;
  }
`
