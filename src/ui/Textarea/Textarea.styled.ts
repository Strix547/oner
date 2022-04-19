import styled from 'styled-components'
import MuiTextarea from '@mui/material/TextareaAutosize'

export const Textarea = styled(MuiTextarea)`
  width: 100%;
  min-height: 200px;
  padding: 13px 20px;
  border-radius: 6px;
  font-family: 'TTCommons';
  font-size: 18px;
  line-height: 22px;
  border: 1px solid #dedee2;
  color: var(--color-black);
  box-sizing: border-box;
  resize: none;

  &::placeholder {
    color: #55556d;
  }

  &:focus {
    outline: none;
  }
`
