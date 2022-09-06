import styled from 'styled-components'

import { Box, Link } from 'styled/components'

import { TextField } from 'ui/TextField/TextField.styled'

export { Link }

export const CarModelSearch = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 60px;

  h4 {
    line-height: 30px;
  }
`

const SearchItemBase = styled.div`
  flex-grow: 1;

  ${TextField} {
    margin-top: 10px;

    .text-field-input-root {
      padding-right: 5px;

      .text-field-input {
        font-size: 16px;
        padding-top: 17px;
        padding-bottom: 13px;
        line-height: 20px;
      }
    }

    .input-adornment {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      max-height: 100%;
      background: rgba(107, 89, 204, 0.1);
      box-shadow: 0px 2px 5px rgba(38, 34, 45, 0.03);
      border-radius: 6px;
      transition: 0.3s;

      svg {
        transition: 0.3s;
      }

      &:hover {
        background: var(--color-primary);
        cursor: pointer;

        svg {
          fill: #fff;
        }
      }
    }
  }
`

export const VinSearch = styled(SearchItemBase)``

export const BodyNumberSearch = styled(SearchItemBase)``

export const Divider = styled.div`
  width: 1px;
  height: 118px;
  background: #e8e3e3;
  margin: 0 70px;
  align-self: flex-start;
`

export const ExampleRow = styled.div`
  display: flex;
  margin-top: 10px;

  span,
  ${Link} {
    font-size: 14px;
    line-height: 18px;
  }

  span:first-child {
    margin-right: 3px;
    font-weight: 500;
    color: #7a7680;
  }

  ${Link} {
    font-weight: 400;
    cursor: pointer;
  }
`
