import styled from '@emotion/styled'

import { Box } from 'styled/components'

import { Button } from 'ui/Button/Button.styled'

export const FindedCarCard = styled(Box)`
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;

  ${Button} {
    margin-top: 20px;
  }
`

export const CarName = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;

  span {
    font-size: 20px;

    &:first-child {
      font-weight: 600;
    }
  }
`

export const AttributesList = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px 5px;
  align-items: center;
`

export const AttrRow = styled.li`
  display: flex;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

export const AttrRowName = styled.div`
  font-size: 18px;
  font-weight: 500;
`

export const AttrRowValue = styled.div`
  max-width: 300px;
`
