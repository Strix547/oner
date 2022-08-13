import styled from 'styled-components'

import { List, ListItem, Label, Value, Link } from 'styled/components'
import { media } from 'styled/media'

import { Select } from 'ui/Select/Select.styled'

const media800 = media.createMedia(800)
const media600 = media.createMedia(600)

export { List, ListItem, Label, Value, Link }

export const PaymentTypeCard = styled.div`
  ${ListItem} ${Link} {
    margin-top: 5px;
  }

  ${media800} {
    ${List} {
      display: grid;
      grid-template-columns: 1fr 1fr;
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

      ${ListItem}:nth-child(1) {
        order: 1;
      }

      ${ListItem}:nth-child(2) {
        order: 3;
      }

      ${ListItem}:nth-child(3) {
        order: 4;
      }

      ${ListItem}:nth-child(4) {
        order: 2;
      }
    }
  }
`

export const SelectsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${Select} {
    max-width: 800px;
  }
`

export const PayedStatus = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 103px;
  height: 30px;
  color: #34ae65;
  background: rgba(52, 174, 101, 0.1);
  border-radius: 6px;

  span {
    margin-top: 4px;
    margin-left: 5px;
  }
`
