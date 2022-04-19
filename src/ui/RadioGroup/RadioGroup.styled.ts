import styled from 'styled-components'
import MuiRadioGroup from '@mui/material/RadioGroup'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import MuiRadio from '@mui/material/Radio'

export const RadioGroup = styled(MuiRadioGroup)`
  flex-direction: row;
  flex-wrap: nowrap;
`

export const RadioGroupFormControlLabel = styled(MuiFormControlLabel)`
  margin: 0;
  font-weight: 500;

  &:not(:last-child) {
    margin-right: 20px;
  }

  & > span:last-child {
    padding-top: 3px;
  }
`

export const Radio = styled(MuiRadio)`
  padding: 0;
  margin-right: 10px;

  &:hover {
    background: #fff;
  }
`
