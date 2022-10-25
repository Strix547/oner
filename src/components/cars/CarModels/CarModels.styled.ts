import styled from '@emotion/styled'

import { Wrapper, Letter } from 'styled/components'
import { media } from 'styled/media'

import { TextField } from 'ui/TextField/TextField.styled'

const media1360 = media.createMedia(1360)
const media1000 = media.createMedia(1000)
const media650 = media.createMedia(650)

export { Wrapper, Letter }

export const CarModels = styled.div`
  padding: 30px;
  background: #fff;

  ${media1360} {
    padding: 30px 0;
  }
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

export const ModelsByLetter = styled.div`
  margin-top: 30px;
`

export const ModelsRow = styled.div`
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`

export const ModelsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px 90px;
  margin-top: 24px;

  ${media1000} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px 90px;
  }

  ${media650} {
    grid-template-columns: 1fr;
  }
`

export const ModelLink = styled.a`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
`

export const ModelLinkName = styled.span`
  font-weight: 500;
  color: var(--color-primary);
`

export const ModelLinkYear = styled.span`
  font-size: 14px;
  color: #55556d;
`
