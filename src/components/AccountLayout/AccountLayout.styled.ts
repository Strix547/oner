import styled, { css } from 'styled-components'

import { Button } from 'ui'
import { AccountSidebar } from 'components/AccountSidebar/AccountSidebar.styled'

import { media } from 'styled/media'

interface ContentProps {
  isMenuOpen: boolean
}

export const AccountLayout = styled.div``

export const Right = styled.div``

export const Content = styled.div<ContentProps>`
  display: grid;
  align-items: flex-start;
  grid-template-columns: 290px 1fr;
  grid-gap: 30px;

  ${media.laptop} {
    grid-template-columns: 1fr;

    ${AccountSidebar} {
      display: none;
    }

    ${({ isMenuOpen }) =>
      isMenuOpen &&
      css`
        ${AccountSidebar} {
          display: block;
        }

        ${Right} {
          display: none;
        }
      `}
  }
`

export const Top = styled.div`
  margin-bottom: 15px;

  h2 {
    font-family: 'TTCommons';
    line-height: 30px;
  }
`

export const TopRight = styled.div``

export const BackToMenuButton = styled(Button)`
  display: none;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 20px;

  &.button-text {
    color: #7a7680;
  }

  svg {
    margin-right: 5px;
    transform: rotate(180deg);
  }

  ${media.laptop} {
    display: flex;
  }
`
