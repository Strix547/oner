import styled from 'styled-components'

import { Box } from 'styled/components'
import { media } from 'styled/media'

import { Button } from 'ui/Button/Button.styled'
import { Select, SelectInputLabel } from 'ui/Select/Select.styled'
import { DeliveryTypeSelect } from 'components/common/DeliveryTypeSelect/DeliveryTypeSelect.styled'
import { PaymentTypeSelect } from 'components/common/PaymentTypeSelect/PaymentTypeSelect.styled'

const media720 = media.createMedia(720)

export const CustomerOrderDetails = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  & > ${Button} {
    height: 42px;
  }

  ${DeliveryTypeSelect}, ${PaymentTypeSelect} {
    ${Select} {
      .select {
        padding: 6px 32px 3px 15px;
        font-size: 16px;
      }

      .select-icon {
        top: 5px;
      }
    }

    ${SelectInputLabel} {
      font-size: 16px;
      transform: translate(15px, 9px) scale(1);

      &.input-label-shrink {
        transform: translate(15px, -7px) scale(1);
      }
    }
  }

  ${media720} {
    flex-direction: column-reverse;
    align-items: flex-start;

    & > ${Button} {
      margin-bottom: 20px;
    }
  }
`

export const Left = styled.div`
  display: grid;
  grid-template-columns: 115px 1fr;
  grid-gap: 20px 40px;
  align-items: center;
  font-size: 18px;
  line-height: 22px;

  ${media720} {
    grid-template-columns: 1fr;
    grid-gap: 5px;
  }
`

export const Label = styled.span`
  color: #55556d;
`

export const Value = styled.span`
  font-weight: 500;

  ${media720} {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`

export const ValueEditable = styled(Value)`
  display: flex;
  align-items: center;

  ${Button} {
    width: 24px;
    height: 24px;
    padding: 0;
    margin-left: 10px;
    margin-top: -4px;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
