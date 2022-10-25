import { Fragment } from 'react'

import Link from 'next/link'

import { Button } from 'ui'

import { FindedCarByVinOrBodyNumber } from 'types/catalogs'

import * as S from './FindedCarCard.styled'
import { ROUTE_NAMES } from 'core'

interface FindedCarCardProps {
  car: FindedCarByVinOrBodyNumber
}

export const FindedCarCard = ({ car }: FindedCarCardProps) => {
  const attrsRows = car.attributes.map(({ name, value }) => {
    return (
      <Fragment key={name}>
        <S.AttrRowName>{name}:</S.AttrRowName>
        <S.AttrRowValue>{value}</S.AttrRowValue>
      </Fragment>
    )
  })

  return (
    <Link
      href={`${ROUTE_NAMES.ORIGINAL_SPARE_PARTS_CATEGORIES}/?brand=${car.brand}&catalog=${car.catalog}&ssd=${car.ssd}&vehicleId=${car.vehicleId}`}
      passHref
    >
      <S.FindedCarCard as="a">
        <S.CarName>
          <span>{car.brand}</span>
          <span>{car.name}</span>
        </S.CarName>

        <S.AttributesList>{attrsRows}</S.AttributesList>

        <Button>Выбрать</Button>
      </S.FindedCarCard>
    </Link>
  )
}
