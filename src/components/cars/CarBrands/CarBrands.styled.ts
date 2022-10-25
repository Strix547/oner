import styled from '@emotion/styled'

import { Wrapper, Letter } from 'styled/components'
import { media } from 'styled/media'

import { TextField } from 'ui/TextField/TextField.styled'

const media1000 = media.createMedia(1000)
const media650 = media.createMedia(650)

export { Wrapper, Letter }

export const CarBrands = styled.div`
  width: 100%;
  background: #fff;
  padding-top: 30px;
  padding-bottom: 60px;
`

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  ${TextField} {
    max-width: 350px;

    .text-field-input-root {
      .text-field-input {
        padding: 15px 4px 11px 10px;
        font-size: 16px;
      }
    }

    .input-adornment {
      svg {
        fill: #92979e;
      }
    }
  }

  ${media650} {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    ${TextField} {
      max-width: 100%;
    }
  }
`

export const BrandsGrid = styled.div`
  margin-top: 30px;

  & > div {
    margin: -40px -80px;

    & > * {
      margin: 40px 80px;
      width: calc(25% - 160px);
    }
  }

  ${media1000} {
    /* & > div > * {
      width: calc(33.33% - 80px);
    } */
  }
`

export const BrandColumn = styled.div`
  display: flex;
  gap: 20px;

  ${Letter} {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border: none;
    background: rgba(89, 70, 215, 0.1);
    font-size: 20px;
    font-weight: 600;
  }
`

export const BrandsList = styled.ul`
  li:not(:last-child) {
    margin-bottom: 5px;
  }
`

export const BrandLink = styled.a`
  color: #3d3d4b;
  line-height: 20px;
  transition: 0.3s;

  &:hover {
    color: var(--color-primary);
  }
`
