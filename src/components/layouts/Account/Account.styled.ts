import styled, { css } from 'styled-components'

import { Button } from 'ui'

import { Wrapper } from 'styled/components'
import { AccountSidebar } from 'components/layouts/AccountSidebar/AccountSidebar.styled'
import { media } from 'styled/media'

export { Wrapper }

export const Right = styled.div`
  height: 100%;
`

export const Content = styled.div`
  display: grid;
  align-items: flex-start;
  grid-template-columns: 290px minmax(auto, 940px);
  grid-gap: 30px;
  flex-grow: 1;

  ${media.laptop} {
    grid-template-columns: 1fr;

    ${AccountSidebar} {
      display: none;
    }
  }
`

export const BackToMenuButton = styled(Button)`
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 0;

  &.button-text {
    color: #7a7680;
  }

  .button-start-icon {
    margin-right: 5px;
  }

  svg {
    transform: rotate(180deg);
  }
`

export const BackToMenu = styled.div`
  display: none;
  margin-bottom: 20px;

  ${media.laptop} {
    display: block;
  }
`
