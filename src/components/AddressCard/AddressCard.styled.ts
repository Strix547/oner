import styled from '@emotion/styled'

export const AddressCard = styled.li``

export const Address = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;

  p {
    &:nth-child(2),
    &:nth-child(3) {
      color: #505255;
    }

    &:nth-child(2) {
      margin-top: 10px;
      white-space: normal;
    }

    &:nth-child(3) {
      margin-top: 5px;
    }
  }
`
