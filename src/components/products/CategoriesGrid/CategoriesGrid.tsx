import Link from 'next/link'
import Image from 'next/image'
import Typography from '@mui/material/Typography'

import { ROUTE_NAMES } from 'core'

import * as S from './CategoriesGrid.styled'

import forSuppliersBg from 'public/img/for-suppliers-bg.jpg'
import UserWithChartIcon from 'public/icons/user-with-chart.svg'
import ArrowRightIcon from 'public/icons/arrows/long-right.svg'

import BrakersIcon from 'public/icons/brakers.svg'
import EngineIcon from 'public/icons/engine.svg'
import CarGarageIcon from 'public/icons/car-garage.svg'
import FrontDoorIcon from 'public/icons/front-door.svg'
import SafetyBeltIcon from 'public/icons/safety-belt.svg'
import GlassWasherIcon from 'public/icons/glass-washer.svg'
import CanisterIcon from 'public/icons/canister.svg'
import WheelIcon from 'public/icons/wheel.svg'
import AccumulatorIcon from 'public/icons/accumulator.svg'
import ShortLightIcon from 'public/icons/short-light.svg'

export const ProductsCategoriesGrid = () => {
  const categories = [
    {
      title: 'Оригинальные запчасти',
      amount: 730,
      link: ROUTE_NAMES.ORIGINAL_SPARE_PARTS,
      icon: <BrakersIcon />
    },
    {
      title: 'Неоригинальные запчасти',
      amount: 730,
      link: ROUTE_NAMES.NOT_ORIGINAL_SPARE_PARTS,
      icon: <EngineIcon />
    },
    {
      title: 'Запчасти ВАЗ, ГАЗ, КАМАЗ',
      amount: 730,
      link: ROUTE_NAMES.VAZ_GAZ_KAMAZ_SPARE_PARTS,
      icon: <CarGarageIcon />
    },
    {
      title: 'Кузовные запчасти',
      amount: 730,
      link: ROUTE_NAMES.CAR_BODY_SPARE_PARTS,
      icon: <FrontDoorIcon />
    },
    {
      title: 'Запчасти для ТО',
      amount: 730,
      link: ROUTE_NAMES.MAINTENANCE_SPARE_PARTS,
      icon: <SafetyBeltIcon />
    },
    {
      title: 'Автостёкла',
      amount: 730,
      link: ROUTE_NAMES.AUTO_GLASSES,
      icon: <GlassWasherIcon />
    },
    {
      title: 'Автомасла',
      amount: 730,
      link: ROUTE_NAMES.CAR_OILS,
      icon: <CanisterIcon />
    },
    {
      title: 'Автохимия',
      amount: 730,
      link: ROUTE_NAMES.CAR_CHEMISTRY,
      icon: <CanisterIcon />
    },
    {
      title: 'Диски',
      amount: 730,
      link: ROUTE_NAMES.WHEELS,
      icon: <WheelIcon />
    },
    {
      title: 'Аккумуляторы',
      amount: 730,
      link: ROUTE_NAMES.ACCUMULATORS,
      icon: <AccumulatorIcon />
    },
    {
      title: 'Автолампы',
      amount: 730,
      link: ROUTE_NAMES.CAR_LAMPS,
      icon: <ShortLightIcon />
    }
  ]

  const categoriesItems = categories.map(({ title, amount, link, icon }) => {
    return (
      <S.SectionItem key={title}>
        <Link href={link} passHref>
          <a>
            <S.Icon>{icon}</S.Icon>

            <S.Right>
              <Typography variant="h4">{title}</Typography>
              <S.Amount>{amount} товаров</S.Amount>
            </S.Right>
          </a>
        </Link>
      </S.SectionItem>
    )
  })

  return (
    <S.ProductsCategoriesGrid>
      {categoriesItems}

      <S.ForSuppliersItem>
        <Link href="/" passHref>
          <a style={{ background: `url(${forSuppliersBg.src}) no-repeat center/cover` }}>
            <S.Icon>
              <UserWithChartIcon />
            </S.Icon>

            <S.Right>
              <Typography variant="h4">Поставщикам</Typography>

              <S.ForSuppliersItemArrow>
                <ArrowRightIcon />
              </S.ForSuppliersItemArrow>
            </S.Right>
          </a>
        </Link>
      </S.ForSuppliersItem>
    </S.ProductsCategoriesGrid>
  )
}
