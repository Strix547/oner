import styled from 'styled-components'

import { createMedia } from 'styled'

import { Button as SlideButton } from 'common/SlideNav/SlideNav.styled'

const media1200 = createMedia(1200)
const media780 = createMedia(780)
const media760 = createMedia(760)
const media666 = createMedia(666)
const media560 = createMedia(560)
const media470 = createMedia(470)

export const MainSlider = styled.div`
  .swiper {
    width: 100%;
    padding: 0 19px;
    margin-left: -19px;

    &-slide {
      position: relative;
      overflow: hidden;
    }

    &-pagination {
      position: absolute;
      bottom: 50px;
      left: 85px;
      display: flex;
      justify-content: space-between;
      width: 220px;
      height: 4px;
      z-index: 10;

      &-bullet {
        width: 60px;
        height: 4px;
        border-radius: 30px;
        background: var(--color-primary);
        opacity: 0.3;
        transition: 0.3s;

        &-active {
          opacity: 1;
        }
      }
    }
  }

  ${media1200} {
    ${SlideButton} {
      display: flex;
    }

    .swiper {
      &-pagination {
        left: 50%;
        bottom: 30px;
        transform: translateX(-50%);
      }
    }
  }

  ${media666} {
    .swiper {
      padding: 0 15px;
      margin-left: -15px;
    }
  }

  ${media470} {
    .swiper {
      &-pagination {
        bottom: 20px;
      }
    }

    ${SlideButton} {
      left: 0;

      &:last-child {
        left: auto;
        right: 0;
      }
    }
  }
`

export const Slide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 420px;
  border: 5px solid rgba(69, 56, 136, 0.2);
  border-radius: 34px;
  padding-left: 60px;
  padding-right: 75px;
  background: #efedf8;
  overflow: hidden;
  box-sizing: border-box;

  h1 {
    max-width: 627px;
    white-space: normal;
    color: #2e1066;
  }

  h4 {
    margin-top: 30px;
    font-weight: 400;
  }

  ${media1200} {
    height: 230px;
    padding: 40px 32px 0 40px;
    align-items: flex-start;

    h1 {
      max-width: 441px;
      font-size: 35px;
      line-height: 40.25px;
    }

    h4 {
      margin-top: 10px;
    }
  }

  ${media780} {
    h1 {
      font-size: 32px;
      line-height: 38px;
    }
  }

  ${media760} {
    height: 200px;
    padding: 30px 30px 23px;
    align-items: center;

    h1 {
      font-size: 20px;
      font-weight: 600;
      line-height: 26px;
    }
  }

  ${media560} {
    align-items: flex-start;

    h1 {
      max-width: 260px;
    }

    h4 {
      font-size: 14px;
      line-height: 18px;
      color: #3d3d4b;
    }
  }

  ${media470} {
    h4 {
      max-width: 126px;
      white-space: normal;
    }
  }
`

export const Discount = styled.span`
  margin-left: 10px;
  padding: 10px 15px 0;
  color: #ff783e;
  background: #fff7f4;
  box-shadow: 0px 10px 30px rgba(255, 120, 62, 0.2);
  border-radius: 10px;

  ${media760} {
    height: 28px;
    border-radius: 6px;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
  }
`

export const SlideImg = styled.div`
  position: relative;
  z-index: 10;

  ${media1200} {
    max-width: 214px;
  }

  ${media760} {
    display: flex;
    align-items: center;
    height: 100%;
    max-width: 123px;
  }

  ${media470} {
    position: absolute;
    top: 66px;
    right: 27px;
    max-width: 123px;
    height: auto;
  }
`

export const SlideLeft = styled.div`
  z-index: 20;
`

export const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 1260px;
  height: 420px;
  border-radius: 34px;
  overflow: hidden;

  svg {
    width: 100%;
    height: auto;
    border-radius: 34px;
    overflow: hidden;
  }

  ${media1200} {
    width: 100%;
    height: 230px;

    svg {
    }
  }

  ${media760} {
    height: 200px;
  }
`

export const BackgroundDesk = styled(Background)`
  ${media1200} {
    display: none;
  }
`

export const BackgroundTablet = styled(Background)`
  display: none;

  ${media1200} {
    display: block;
  }

  ${media760} {
    display: none;
  }
`

export const BackgroundMobile = styled(Background)`
  display: none;

  ${media760} {
    display: block;
  }

  ${media470} {
    width: 100%;
  }
`
