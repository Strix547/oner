import styled from 'styled-components'

import { createMedia } from 'styled'

const media1200 = createMedia(1200)

export const Button = styled.button`
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: #ffffff;
  border: none;
  box-shadow: 0px 4px 10px rgba(46, 16, 102, 0.25);
  transform: translateY(-50%);
  border-radius: 10px;
  cursor: pointer;
  z-index: 10;

  &.swiper-button-disabled {
    display: none;
  }

  ${media1200} {
    display: none;
  }
`

export const SlidePrevButton = styled(Button)`
  left: 5px;

  img {
    transform: rotate(-180deg);
  }
`

export const SlideNextButton = styled(Button)`
  right: 5px;
`
