import styled from 'styled-components'

import { List, ListItem, Label, Value } from 'styled/components'
import { media } from 'styled/media'

import { Button } from 'ui/Button/Button.styled'
import { Skeleton } from 'ui/Skeleton/Skeleton.styled'

const media600 = media.createMedia(600)

export { List, ListItem, Label, Value }

export const CustomerInfoCard = styled.div`
  ${media.tablet} {
    ${List} {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 20px 30px;

      ${ListItem}:nth-child(1) {
        order: 1;
      }

      ${ListItem}:nth-child(2) {
        order: 2;
      }

      ${ListItem}:nth-child(3) {
        order: 4;
      }

      ${ListItem}:nth-child(4) {
        order: 3;
      }
    }
  }

  ${media600} {
    ${List} {
      grid-template-columns: 1fr;
    }
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  max-width: 800px;

  ${Button} {
    width: 120px;
  }
`

export const SkeletonGrid = styled.div`
  width: 100%;

  ${Skeleton} > span {
    display: grid;
    grid-gap: 20px;
  }
`
