import styled from '@emotion/styled'
import MuiMasonry from '@mui/lab/Masonry'

import { Letter } from 'styled/components'
import { media } from 'styled/media'

import { Skeleton, SkeletonItem } from 'ui/Skeleton/Skeleton.styled'

const media1100 = media.createMedia(1100)
const media800 = media.createMedia(800)
const media610 = media.createMedia(610)

export { Letter }

export const CarBrandsList = styled.div``

export const Masonry = styled(MuiMasonry)`
  ${media1100} {
    & > * {
      width: calc(33.33% - 20px);
    }
  }

  ${media800} {
    & > * {
      width: calc(50% - 20px);
      margin: 5px 10px;
    }
  }

  ${media610} {
    margin: 0;

    & > * {
      width: 100%;
      margin: 5px 0;
    }
  }
`

export const BrandsLetterCard = styled.div`
  display: flex;
  gap: 20px;
  padding: 30px;
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(38, 34, 45, 0.08);
  border-radius: 10px;
  border: 1px solid transparent;
  box-sizing: border-box;
  transition: 0.3s border box-shadow;

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

export const BrandLink = styled.a`
  font-size: 18px;
  line-height: 22px;
  color: #55556d;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: var(--color-primary);
  }
`

export const MasonrySkeleton = styled.div`
  ${Skeleton} > span {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;

    ${SkeletonItem} > span {
      border-radius: 10px;
    }
  }
`
