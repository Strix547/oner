import React, { RefObject } from 'react'
import Image from 'next/image'

import * as S from './SlideNav.styled'

import ArrowRightIcon from 'public/icons/arrows/sign-right.svg'

type Ref =
  | ((instance: HTMLButtonElement | null) => void)
  | RefObject<HTMLButtonElement>
  | null
  | undefined

interface SlideNavProps {
  prevRef: Ref
  nextRef: Ref
}

export const SlideNav = ({ prevRef, nextRef }: SlideNavProps) => {
  return (
    <>
      <S.SlidePrevButton ref={prevRef}>
        <Image src={ArrowRightIcon} />
      </S.SlidePrevButton>

      <S.SlideNextButton ref={nextRef}>
        <Image src={ArrowRightIcon} />
      </S.SlideNextButton>
    </>
  )
}
