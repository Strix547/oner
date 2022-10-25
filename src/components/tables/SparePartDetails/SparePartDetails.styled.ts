import styled from '@emotion/styled'

import { media } from 'styled/media'

import { Button } from 'ui/Button/Button.styled'

const media540 = media.createMedia(540)

export const SparePartDetailsTable = styled.div``

export const Table = styled.div`
  background: #ffffff;
  border: 1px solid #dedee2;
  box-shadow: 0px 2px 5px rgba(38, 34, 45, 0.03);
  border-radius: 6px;

  ${media540} {
    display: none;
  }
`

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 14px 68px 1fr 110px;
  grid-gap: 30px;
  align-items: center;
  padding: 9px 20px;
  min-height: 50px;
  box-sizing: border-box;
`

export const TableCell = styled.div`
  font-size: 14px;
`

export const TableHead = styled.div`
  border-bottom: 1px solid #dedee2;

  ${TableCell} {
    font-size: 14px;
    line-height: 18px;
    color: #55556d;
  }
`

export const TableBody = styled.div`
  ${TableRow} {
    position: relative;
    transition: 0.3s;

    &:not(:last-child)::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 20px;
      width: calc(100% - 40px);
      height: 1px;
      background: #e3e3e8;
      transition: 0.3s;
    }

    &:hover {
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1), 0px 0px 20px rgba(0, 0, 0, 0.05);

      &::before {
        background: transparent;
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: -1px;
        width: 100%;
        height: 1px;
        background: #fff;
      }
    }
  }
`

export const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  ${Button} {
    width: 70px;
    height: 32px;
    padding: 0;
    background: rgba(89, 70, 215, 0.1);
    border: 1px solid #5946d7;
    border-radius: 8px;
    font-size: 14px;
    color: var(--color-primary);

    span {
      margin-top: 2px;
    }

    &:hover {
      color: #fff;
      background: var(--color-primary);
    }
  }
`

export const DetailNumber = styled.span`
  font-weight: 500;
  color: var(--color-primary);
`

export const DetailName = styled.span`
  color: #1b1d1f;
`

export const TableCards = styled.div`
  display: none;
  flex-direction: column;

  ${media540} {
    display: flex;
  }
`

export const TableCard = styled.div`
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(38, 34, 45, 0.03), 0px 2px 10px rgba(38, 34, 45, 0.02);
  border-radius: 6px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

export const TableCardRow = styled.div`
  display: grid;
  grid-template-columns: 86px 1fr;
  grid-gap: 44px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

export const TableCardCell = styled.div`
  font-size: 14px;

  &:first-child {
    color: #55556d;
  }
`
