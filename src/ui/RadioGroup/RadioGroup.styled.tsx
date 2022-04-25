import styled from 'styled-components'
import MuiRadioGroup, { RadioGroupProps as MuiRadioGroupProps } from '@mui/material/RadioGroup'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import MuiRadio from '@mui/material/Radio'

interface RadioGroupProps extends MuiRadioGroupProps {
  direction: 'row' | 'column'
}

export const RadioGroup = styled(MuiRadioGroup)`
  flex-direction: row;
  /* flex-wrap: nowrap; */
  grid-gap: 10px 30px;
`

export const RadioGroupFormControlLabel = styled(MuiFormControlLabel)`
  margin: 0;
  font-weight: 500;

  & > span:last-child {
    padding-top: 3px;
    text-overflow: unset;
    white-space: normal;
  }
`

export const Radio = styled(MuiRadio)`
  padding: 0;
  margin-right: 10px;

  &:hover {
    background: #fff;
  }
`
