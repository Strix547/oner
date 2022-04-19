import { useRef } from 'react'
import Image from 'next/image'
import Typography from '@mui/material/Typography'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'

import { SlideNav } from 'common'

import * as S from './MainSlider.styled'

import productImg from 'public/img/main-slider/product.png'
import SliderMaskBg from 'public/img/main-slider/slider-mask.svg'
import SliderMaskTabletBg from 'public/img/main-slider/slider-mask-tablet.svg'
import SliderMaskMobileBg from 'public/img/main-slider/slider-mask-mobile.svg'

export const MainSlider = () => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const slide = (
    <SwiperSlide>
      <S.Slide>
        <S.SlideLeft>
          <Typography variant="h1">
            Оригинальные автозапчасти со скидкой
            <S.Discount>15%</S.Discount>
          </Typography>

          <Typography variant="h4">Акция действует с 1 по 30 июня 2021</Typography>
        </S.SlideLeft>

        <S.SlideImg>
          <Image src={productImg} />
        </S.SlideImg>

        <S.Background>
          <S.SliderMaskDesk>
            <Image src={SliderMaskBg} layout="fixed" height={420} />
          </S.SliderMaskDesk>

          <S.SliderMaskTablet>
            <Image src={SliderMaskTabletBg} layout="responsive" />
          </S.SliderMaskTablet>

          <S.SliderMaskMobile>
            <Image src={SliderMaskMobileBg} layout="responsive" />
          </S.SliderMaskMobile>
        </S.Background>
      </S.Slide>
    </SwiperSlide>
  )

  return (
    <S.MainSlider>
      <Swiper
        modules={[Navigation, Pagination]}
        loop
        pagination
        slidesPerView={1}
        spaceBetween={20}
        onInit={({ params, navigation }) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          params.navigation.prevEl = prevRef.current
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          params.navigation.nextEl = nextRef.current
          navigation.init()
          navigation.update()
        }}
      >
        {slide}
        {slide}
        {slide}

        <SlideNav prevRef={prevRef} nextRef={nextRef} />
      </Swiper>
    </S.MainSlider>
  )
}
