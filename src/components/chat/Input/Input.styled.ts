import styled from 'styled-components'

import { Button } from 'ui'
import { TextField } from 'ui/TextField/TextField.styled'

export const ChatInput = styled.form`
  position: relative;
  height: 48px;
  background: #ffffff;
  border: 1px solid #c5c3c8;
  border-radius: 6px;
  box-sizing: border-box;

  ${TextField} {
    .text-field-input-root {
      padding-left: 72px;
      padding-right: 54px;
    }

    .text-field-input {
      font-size: 16px;

      &::placeholder {
        color: #92979e;
      }
    }

    fieldset {
      display: none;
    }
  }
`

export const SendButton = styled(Button)`
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: 3px;
  right: 3px;
`

export const Attachments = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  display: flex;
  justify-content: space-between;
  width: 58px;
  height: 24px;
  transform: translateY(-50%);
  z-index: 10;

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`
