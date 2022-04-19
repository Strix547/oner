import styled from 'styled-components'

import { Skeleton } from 'ui'
import { Button } from 'ui/Button/Button.styled'

export const ShopesStep = styled.div`
  .text-field-input-root {
    & > ymaps {
      width: 100% !important;
      top: 48.5px !important;
      left: -1px !important;

      // root
      & > ymaps > ymaps {
        max-height: 200px;
        padding: 0;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05) !important;
        border: 1px solid #dedee2;
        border-radius: 6px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;

        // item
        & > ymaps > ymaps {
          // row
          & > ymaps {
            padding: 0 20px;

            // words
            ymaps {
              font-family: 'TTCommons';
              font-size: 16px;
              font-weight: 400;
              color: var(--color-black);
            }
          }
        }
      }
    }
  }
`

export const ButtonsRow = styled.div`
  display: flex;
  margin-top: 20px;

  ${Button} {
    width: 200px;

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`

export const Map = styled.div`
  margin-bottom: 20px;

  ${Skeleton} {
    height: 240px;
  }
`
