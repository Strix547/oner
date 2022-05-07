import { useState, MouseEvent } from 'react'
import Popper from '@mui/material/Popper'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import Image from 'next/image'

import { Backdrop } from 'ui'

import { ROUTE_NAMES } from 'core'

import * as S from './AllCategories.styled'

import GridIcon from 'public/icons/grid.svg'

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
import oilsBannerImg from 'public/img/banners/oils-2.png'

export const AllCategories = () => {
  const [popperAnchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const isPopperOpen = Boolean(popperAnchorEl)

  const categories = [
    {
      label: 'Оригинальные запчасти',
      link: ROUTE_NAMES.ORIGINAL_SPARE_PARTS,
      icon: <BrakersIcon />
    },
    {
      label: 'Неоригинальные запчасти',
      link: ROUTE_NAMES.NOT_ORIGINAL_SPARE_PARTS,
      icon: <EngineIcon />
    },
    {
      label: 'Запчасти ВАЗ, ГАЗ, КАМАЗ',
      link: ROUTE_NAMES.VAZ_GAZ_KAMAZ_SPARE_PARTS,
      icon: <CarGarageIcon />
    },
    {
      label: 'Кузовные запчасти',
      link: ROUTE_NAMES.CAR_BODY_SPARE_PARTS,
      icon: <FrontDoorIcon />
    },
    {
      label: 'Запчасти для ТО',
      link: ROUTE_NAMES.MAINTENANCE_SPARE_PARTS,
      icon: <SafetyBeltIcon />
    },
    { label: 'Автостёкла', link: ROUTE_NAMES.AUTO_GLASSES, icon: <GlassWasherIcon /> },
    { label: 'Автомасла', link: ROUTE_NAMES.CAR_OILS, icon: <CanisterIcon /> },
    { label: 'Автохимия', link: ROUTE_NAMES.CAR_CHEMISTRY, icon: <CanisterIcon /> },
    { label: 'Диски', link: ROUTE_NAMES.WHEELS, icon: <WheelIcon /> },
    {
      label: 'Аккумуляторы',
      link: ROUTE_NAMES.ACCUMULATORS,
      icon: <AccumulatorIcon />
    },
    { label: 'Автолампы', link: ROUTE_NAMES.CAR_LAMPS, icon: <ShortLightIcon /> }
  ]

  const togglePopper = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(popperAnchorEl ? null : e.currentTarget)
  }

  const closePopper = () => {
    setAnchorEl(null)
  }

  const categoriesItems = categories.map(({ label, link, icon }) => {
    return (
      <S.CategoryItem key={label}>
        <Link href={link} passHref>
          <S.CategoryLink>
            <S.CategoryItemIcon>{icon}</S.CategoryItemIcon>
            <Typography component="span">{label}</Typography>
          </S.CategoryLink>
        </Link>
      </S.CategoryItem>
    )
  })

  return (
    <S.AllCategories>
      <S.CategoriesButton open={isPopperOpen} onClick={togglePopper}>
        <GridIcon />
        <span>Все категории</span>
      </S.CategoriesButton>

      <Backdrop
        open={isPopperOpen}
        onClick={() => {
          if (popperAnchorEl) {
            closePopper()
          }
        }}
      >
        <Popper
          open={isPopperOpen}
          anchorEl={popperAnchorEl}
          placement="bottom-start"
          disablePortal
        >
          <S.AllCategoriesContainer>
            <S.AllCategoriesBox>
              <S.Categories>{categoriesItems}</S.Categories>

              <S.OilsBanner>
                <Typography>
                  Автомасла №1 <br /> от официальных <br /> дилеров
                </Typography>
                <Image src={oilsBannerImg} alt="баннер" layout="fill" />
              </S.OilsBanner>
            </S.AllCategoriesBox>
          </S.AllCategoriesContainer>
        </Popper>
      </Backdrop>
    </S.AllCategories>
  )
}
