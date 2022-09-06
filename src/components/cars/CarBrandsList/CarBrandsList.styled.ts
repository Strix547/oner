import styled from 'styled-components'

import { Letter } from 'styled/components'

export { Letter }

export const CarBrandsList = styled.div``

export const BrandsLetterCard = styled.div`
  display: flex;
  gap: 20px;
  padding: 30px;
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(38, 34, 45, 0.08);
  border-radius: 10px;
  border: 1px solid transparent;
  box-sizing: border-box;
  transition: 0.3s;

  ${Letter} {
    flex-shrink: 0;
  }

  &:hover {
    border: 1px solid #dedee2;
    box-shadow: none;
  }
`

export const BrandsList = styled.ul`
  li:not(:last-child) {
    margin-bottom: 10px;
  }
`

export const Brand = styled.span`
  font-size: 18px;
  line-height: 22px;
  color: #55556d;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: var(--color-primary);
  }
`
