import styled, { css } from 'styled-components'

import { Radio, RadioGroupFormControlLabel } from 'ui/RadioGroup/RadioGroup.styled'

export { Radio, RadioGroupFormControlLabel }

interface RequisitesCardProps {
  asRadio: boolean
}

export const RequisitesCard = styled.li<RequisitesCardProps>`
  ${({ asRadio }) =>
    asRadio &&
    css`
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0 20px;
      border: 1px solid #e3e3e8;
      border-radius: 6px;
      box-sizing: border-box;

      ${RadioGroupFormControlLabel} {
        & > span {
          &:first-child {
            margin-right: 0;
          }

          &:last-child {
            margin-right: 10px;
          }
        }
      }
    `}
`

export const Left = styled.div`
  display: flex;
  padding: 20px 0;
`

export const CardIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: #ffffff;
  border: 1px solid #f4f5f7;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  flex-shrink: 0;
`

export const Info = styled.div`
  padding-top: 5px;
  margin-left: 20px;

  // name
  p:first-child {
    white-space: normal;
    text-overflow: unset;
  }

  p:nth-child(2) {
    margin-top: 5px;
    color: #55556d;
  }
`

export const Right = styled.div`
  display: flex;
`
