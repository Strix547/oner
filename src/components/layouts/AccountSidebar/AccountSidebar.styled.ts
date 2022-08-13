import styled from 'styled-components'

import { Button } from 'ui'

import { Box } from 'styled/components'

interface LinkItemProps {
  active?: boolean
}

export const AccountSidebar = styled(Box).attrs({ as: 'aside' })`
  padding: 10px;
  background: #ffffff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`

export const LinkItem = styled.li<LinkItemProps>`
  height: 50px;
  padding-left: 20px;
  border-radius: 12px;
  transition: 0.3s;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    span {
      margin-top: 4px;
      margin-left: 15px;
      color: #3d3d4b;
      line-height: 20px;
    }
  }

  background: ${({ active }) => (active ? '#F4F5F7' : '#fff')};
`

export const Divider = styled.div`
  width: calc(100% - 20px);
  height: 1px;
  margin: 0 auto 10px;
  background: #e3e3e8;
  box-sizing: border-box;
`

export const LogoutButton = styled(Button)`
  justify-content: flex-start;
  padding: 0;
  margin-left: 3px;

  &.button-text {
    height: 100%;
    color: var(--color-red);

    span:last-child {
      margin-left: 8px;
      margin-top: 4px;
    }
  }
`
