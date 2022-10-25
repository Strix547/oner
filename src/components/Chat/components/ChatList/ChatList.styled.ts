import styled from '@emotion/styled'

import { scrollStyles } from 'styled/scroll'

export const ChatList = styled.ul`
  width: 280px;
  height: 100%;
  padding: 10px;
  border-right: 1px solid #e3e3e8;
  box-sizing: border-box;

  ${scrollStyles('gray')}

  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-weight: 400;
  }
`

export const ChatItem = styled.li`
  position: relative;
  height: 75px;
  padding: 15px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background: #f4f5f7;
  }

  & > p {
    max-width: 191px;
    margin-top: 5px;
    font-size: 14px;
    line-height: 18px;
    color: #70747b;
  }
`

export const ChatItemTop = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Title = styled.span`
  font-weight: 500;
  line-height: 22px;
  color: #3d3d4b;
`

export const Date = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: #55556d;
`

export const UnreadMessageCounter = styled.div`
  position: absolute;
  right: 15.5px;
  bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 21px;
  height: 20px;
  background: #38a865;
  border-radius: 50%;
  box-sizing: border-box;

  span {
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    color: #fff;
  }
`
