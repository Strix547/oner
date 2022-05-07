import styled from 'styled-components'

import { media } from 'styled/media'

import { Skeleton } from 'ui'
import { Button } from 'ui/Button/Button.styled'

const media500 = media.createMedia(500)

export const ShopesStep = styled.div`
  .text-field-input-root {
    // menu list suggests
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

  ${media500} {
    flex-direction: column;

    ${Button} {
      &:not(:last-child) {
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  }
`

export const Map = styled.div`
  margin-bottom: 20px;
  overflow: hidden;

  ${Skeleton} {
    height: 240px;
  }

  // yandex map container
  & > div {
    & > ymaps {
      width: 100% !important;

      & > ymaps {
        width: 100% !important;

        & > ymaps {
          width: 100% !important;
        }
      }
    }
  }
`
