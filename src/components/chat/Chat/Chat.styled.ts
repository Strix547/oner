import styled, { css } from 'styled-components'

import { ChatInput } from '../Input/Input.styled'

import { Button } from 'ui/Button/Button.styled'

type Sender = 'me' | 'companion'

interface MessageType {
  sender: 'me' | 'companion'
}

const getMessageTypeStyles = (sender: Sender) => {
  if (sender === 'me') {
    return css`
      align-self: flex-start;
      background: rgba(46, 16, 102, 0.15);
    `
  } else {
    return css`
      align-self: flex-end;
      background: #f4f5f7;
    `
  }
}

export const Chat = styled.div`
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
    width: auto;
    height: 36px;
    padding: 10px 14px 8px;
    color: #3d3d4b;
    border: 1px solid #c5c3c8;
    border-radius: 6px;
    font-size: 14px;
    line-height: 18px;
  }
`

export const Content = styled.div`
  height: calc(100% - 50px);
  padding: 20px 0 20px 20px;
  box-sizing: border-box;

  ${ChatInput} {
    margin-top: 20px;
    margin-right: 20px;
  }
`

export const MessagesContainer = styled.div`
  height: 376px;
  padding-right: 20px;
  overflow-y: auto;
`

export const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const Message = styled.div<MessageType>`
  position: relative;
  max-width: 500px;
  width: auto;
  padding: 15px 60px 15px 15px;
  box-shadow: 0px 0px 2px rgba(51, 65, 80, 0.03);
  border-radius: 6px;
  box-sizing: border-box;

  p {
    max-width: 100%;
    white-space: normal;
  }

  ${({ sender }) => getMessageTypeStyles(sender)}
`

export const MessageTime = styled.span`
  position: absolute;
  right: 10px;
  bottom: 7px;
  color: #7a7680;
  font-size: 14px;
  line-height: 18px;
`
