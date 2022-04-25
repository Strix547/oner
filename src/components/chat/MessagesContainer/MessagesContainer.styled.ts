import styled, { css } from 'styled-components'

import { scrollStyles } from 'styled/scroll'

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

export const ChatMessagesContainer = styled.div`
  height: 376px;
  padding-right: 20px;
  overflow-y: auto;

  ${scrollStyles('gray')}
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
  padding: 15px 47px 15px 15px;
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
  bottom: 5px;
  color: #7a7680;
  font-size: 14px;
  line-height: 18px;
`

export const MessagesDate = styled.span`
  width: auto;
  margin: 20px auto;
  padding: 4px 10px 2px;
  border-radius: 6px;
  background: #f4f5f7;
  font-weight: 500;
`

export const FileContainer = styled.div``

export const MessageImg = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }
`

export const MessageFileLink = styled.a`
  color: var(--color-primary);
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`
