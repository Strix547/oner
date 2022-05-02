import styled, { css } from 'styled-components'

import { createMedia } from 'styled/media'

import { Button } from 'ui'
import { ChatDialog } from '../Dialog/Dialog.styled'
import { ChatList } from '../List/List.styled'

const media900 = createMedia(900)

interface ContainerProps {
  isChatOpen: boolean
}

export const Chat = styled.div``

export const Container = styled.div<ContainerProps>`
  display: flex;
  width: 100%;
  height: 535px;
  background: #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.02);
  border-radius: 6px;

  ${media900} {
    ${ChatList} {
      width: 100%;
      border-right: none;
    }

    ${ChatDialog} {
      display: none;
    }

    ${({ isChatOpen }) =>
      isChatOpen &&
      css`
        ${ChatList} {
          display: none;
        }

        ${ChatDialog} {
          display: block;
        }
      `}
  }
`

export const SelectChatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  h4 {
    font-weight: 400;
  }

  ${media900} {
    display: none;
  }
`

export const BackToListButton = styled(Button)`
  display: none;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 10px;

  &.button-text {
    color: #7a7680;
  }

  svg {
    margin-right: 5px;
    transform: rotate(180deg);
  }

  ${media900} {
    display: flex;
  }
`
