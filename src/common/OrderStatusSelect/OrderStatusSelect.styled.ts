import styled from 'styled-components'

import { Select, SelectInputLabel } from 'ui/Select/Select.styled'

export const OrderStatusSelect = styled.div`
  ${Select} {
    width: 280px;
    background: #fff;

    .select {
      border: 1px solid #c5c3c8;
      font-size: 16px;
      padding: 9px 44px 6px 20px;

      &-icon {
        top: 8px;
      }
    }
  }

  ${SelectInputLabel} {
    font-size: 16px;
    transform: translate(15px, 12px) scale(1);

    &.input-label-shrink {
      transform: translate(15px, -7px) scale(1);
    }
  }
`
