import styled from '@emotion/styled'

import { Box } from 'styled/components'
import { media } from 'styled/media'

import { Select } from 'ui/Select/Select.styled'
import { Skeleton } from 'ui/Skeleton/Skeleton.styled'
import { Button } from 'ui/Button/Button.styled'

const media1100 = media.createMedia(1100)

export const CarSearchByParams = styled(Box)`
  padding: 25px 60px;

  h4 {
    line-height: 30px;
  }

  p {
    margin-top: 5px;
    white-space: normal;
  }

  & > ${Button} {
    margin-top: 20px;
  }

  ${media1100} {
    padding: 30px 20px 25px;
  }

  ${media.tablet} {
    flex-direction: column;
    padding: 30px 20px;
  }

  ${media.mobile} {
    h4 {
      font-size: 18px;
    }
  }
`

export const Form = styled.form`
  display: grid;
  gap: 20px;
  margin-top: 10px;
  max-width: 466px;

  ${Select}:not(:last-of-type) {
    margin-bottom: 20px;
  }

  ${Button} {
    max-width: 255px;
  }
`

export const SkeletonGrid = styled.div`
  width: 100%;

  ${Skeleton} > span {
    display: grid;
    grid-gap: 20px;
  }
`
