import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { Button } from 'ui/Button/Button.styled'

interface Mark {
  left: string
  top: string
}

export const SparePartView = styled.div`
  position: relative;
  width: 100%;
  height: 780px;
  background: #fff;
  overflow: hidden;

  img {
    display: block;
  }
`

export const Tools = styled.div`
  position: absolute;
  top: 15px;
  left: 30px;
  z-index: 100;
`

export const ZoomControls = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #c5c3c8;
  font-size: 18px;
  font-family: 'TTCommons';
  font-weight: 500;
  color: var(--color-black);
  background: #fff;

  ${Button} {
    padding: 0;
  }

  & > div:nth-child(2) {
    padding: 0 5px;
  }
`

export const Img = styled.div``

export const MarkContainer = styled.div<Mark>`
  position: absolute;

  ${({ left, top }) =>
    left &&
    top &&
    css`
      left: ${left}px;
      top: ${top}px;
    `}

  &:hover {
    & + span {
      visibility: visible;
    }
  }
`

export const Mark = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  padding-top: 8px;
  border: 5px solid var(--color-primary);
  background: #efedfb;
  font-size: 48px;
  font-weight: 500;
  border-radius: 4px;
  box-sizing: border-box;
  transition: 0.3;

  &:hover {
    color: #fff;
    background: var(--color-primary);
  }
`

export const Popover = styled.span<Mark>`
  visibility: hidden;
  position: absolute;
  z-index: 10;
  margin-top: -80px;
  padding: 8px 16px 2px;
  font-size: 48px;
  color: #fff;
  background: #3d3d4b;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin-left: 33px;
  transform: translateX(-50%);
  opacity: 0.9;
  /* transition: 0.3s; */

  ${({ left, top }) =>
    left &&
    top &&
    css`
      left: ${left}px;
      top: ${top}px;
    `}

  svg {
    position: absolute;
    left: 50%;
    bottom: -11px;
    margin-left: -5px;
    transform: scale(3);
  }
`
