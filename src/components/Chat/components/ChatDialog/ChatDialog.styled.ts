import styled from '@emotion/styled'

import { media } from 'styled/media'

import { MessageInput } from '../MessageInput/MessageInput.styled'
import { Button } from 'ui/Button/Button.styled'

const media560 = media.createMedia(560)

export const ChatDialog = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-left: 20px;
  padding-right: 10px;
  border-bottom: 1px solid #e3e3e8;
  box-sizing: border-box;

  p {
    font-weight: 600;
    color: #3d3d4b;
  }

  ${Button} {
    height: 36px;
    padding: 10px 14px 8px;
    color: #3d3d4b;
    border: 1px solid #c5c3c8;
    border-radius: 6px;
    font-size: 14px;
    line-height: 18px;
  }
`

export const Dialog = styled.div`
  height: calc(100% - 50px);
  padding: 20px 0 20px 20px;
  box-sizing: border-box;

  ${MessageInput} {
    margin-top: 20px;
    margin-right: 20px;
  }
`

export const DialogueEnded = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-left: 20px;
  border-top: 1px solid #e3e3e8;
  background: #f4f5f7;
  box-sizing: border-box;

  ${media560} {
    flex-direction: column;
    padding-left: 0;
    padding-top: 10px;
    height: 73px;

    p {
      margin-bottom: 10px;
    }
  }
`

export const SupportLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 132px;
  height: 32px;
  margin-left: 10px;
  border: 1px solid var(--color-primary);
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(38, 34, 45, 0.03);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary);
  box-sizing: border-box;

  ${media560} {
    margin-left: 0;
  }
`
