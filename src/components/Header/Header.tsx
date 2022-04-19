import React from 'react'
import Link from 'next/link'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import { FormProvider, useForm } from 'react-hook-form'
import { Autocomplete } from 'ui'
import Image from 'next/image'

import { ROUTE_NAMES } from 'core'
import { useAuth } from 'hooks'

import * as S from './Header.styled'

import logo from 'public/img/logo.png'
import logoMobile from 'public/img/logo-mobile.png'
import logoGear from 'public/img/logo-gear.png'
import logoGearMobile from 'public/img/logo-gear-mobile.png'

import LoupeIcon from 'public/icons/loupe.svg'
import LocationIcon from 'public/icons/location.svg'
import PhoneIcon from 'public/icons/phone.svg'
import UserIcon from 'public/icons/user.svg'
import GridIcon from 'public/icons/grid.svg'
import ShoppingCartIcon from 'public/icons/shopping-cart.svg'

import OriginalPartsIcon from 'public/icons/categories/original-parts.svg'
import BodyPartsIcon from 'public/icons/categories/body-parts.svg'
import OilsIcon from 'public/icons/categories/oils.svg'
import AccumulatorsIcon from 'public/icons/categories/accumulators.svg'
import NotOriginalPartsIcon from 'public/icons/categories/not-original-parts.svg'
import MaintenancePartsIcon from 'public/icons/categories/maintenance-parts.svg'
import ChemistryIcon from 'public/icons/categories/chemistry.svg'
import LampsIcon from 'public/icons/categories/lamps.svg'
import VazGazKamazPartsIcon from 'public/icons/categories/vaz-gaz-kamaz-parts.svg'
import AutoGlassesIcon from 'public/icons/categories/auto-glasses.svg'
import WheelsIcon from 'public/icons/categories/wheels.svg'

export const Header = () => {
  const { isAuth } = useAuth()
  const useFormProps = useForm()

  const city = 'Санкт-Петербург'
  const shoppingCartItemsCount = 5

  const categories = [
    {
      label: 'Оригинальные запчасти',
      link: ROUTE_NAMES.ORIGINAL_SPARE_PARTS,
      icon: <Image src={OriginalPartsIcon} />
    },
    {
      label: 'Кузовные запчасти',
      link: ROUTE_NAMES.CAR_BODY_SPARE_PARTS,
      icon: <Image src={BodyPartsIcon} />
    },
    { label: 'Автомасла', link: ROUTE_NAMES.CAR_OILS, icon: <Image src={OilsIcon} /> },
    {
      label: 'Аккумуляторы',
      link: ROUTE_NAMES.ACCUMULATORS,
      icon: <Image src={AccumulatorsIcon} />
    },
    {
      label: 'Неоригинальные запчасти',
      link: ROUTE_NAMES.NOT_ORIGINAL_SPARE_PARTS,
      icon: <Image src={NotOriginalPartsIcon} />
    },
    {
      label: 'Запчасти для ТО',
      link: ROUTE_NAMES.MAINTENANCE_SPARE_PARTS,
      icon: <Image src={MaintenancePartsIcon} />
    },
    { label: 'Автохимия', link: ROUTE_NAMES.CAR_CHEMISTRY, icon: <Image src={ChemistryIcon} /> },
    { label: 'Автолампы', link: ROUTE_NAMES.CAR_LAMPS, icon: <Image src={LampsIcon} /> },
    {
      label: 'Запчасти ВАЗ, ГАЗ, КАМАЗ',
      link: ROUTE_NAMES.VAZ_GAZ_KAMAZ_SPARE_PARTS,
      icon: <Image src={VazGazKamazPartsIcon} />
    },
    { label: 'Автостёкла', link: ROUTE_NAMES.AUTO_GLASSES, icon: <Image src={AutoGlassesIcon} /> },
    { label: 'Диски', link: ROUTE_NAMES.WHEELS, icon: <Image src={WheelsIcon} /> }
  ]

  const nav = [
    { label: 'Запчасти для ТО', link: ROUTE_NAMES.MAINTENANCE_SPARE_PARTS },
    { label: 'Автомасла', link: ROUTE_NAMES.CAR_OILS },
    { label: 'Оригинальные запчасти', link: ROUTE_NAMES.ORIGINAL_SPARE_PARTS },
    { label: 'Неоригинальные запчасти', link: ROUTE_NAMES.NOT_ORIGINAL_SPARE_PARTS },
    { label: 'Лампочки', link: ROUTE_NAMES.CAR_LAMPS },
    { label: 'Аккумуляторы', link: ROUTE_NAMES.ACCUMULATORS }
  ]

  const navItems = nav.map(({ label, link }) => {
    return (
      <S.NavItem key={label}>
        <Link href={link}>{label}</Link>
      </S.NavItem>
    )
  })

  const vinAutocomplete = (
    <S.VinAutocomplete>
      <Autocomplete
        name="sparePartNumber"
        options={[]}
        rules={{ required: false }}
        renderInput={(props) => (
          <S.TextField
            {...props}
            placeholder="Введите номер запчасти или VIN"
            InputProps={{
              classes: {
                root: 'autocomplete-input-root'
              },
              endAdornment: (
                <InputAdornment position="end" classes={{ root: 'autocomplete-end-adornment' }}>
                  <Image src={LoupeIcon} />
                </InputAdornment>
              )
            }}
          />
        )}
      />
    </S.VinAutocomplete>
  )

  return (
    <FormProvider {...useFormProps}>
      <S.Header>
        <S.Top>
          <S.TopWrapper>
            <S.MenuButtonMobile>
              <span />
              <span />
              <span />
            </S.MenuButtonMobile>

            <S.Logo>
              <Link href={ROUTE_NAMES.MAIN}>
                <a>
                  <S.LogoImg src={logo.src} alt="лого" />
                  <S.LogoImgMobile src={logoMobile.src} alt="лого" />

                  <S.LogoGear>
                    <S.LogoGearImg src={logoGear.src} alt="лого шестерня" />
                    <S.LogoGearImgMobile src={logoGearMobile.src} alt="лого шестерня" />
                  </S.LogoGear>
                </a>
              </Link>
            </S.Logo>

            {vinAutocomplete}

            <S.TopRight>
              <S.City>
                <Image src={LocationIcon} />

                <span>{city}</span>
              </S.City>

              <S.PhoneLink href="tel:73472294645">
                <Image src={PhoneIcon} />

                <span>+ 7 (347) 229-46-45</span>
              </S.PhoneLink>

              <Link href={ROUTE_NAMES.SHOPPING_CART} passHref>
                <S.ShoppingCartLinkMobile>
                  <Image src={ShoppingCartIcon} />
                  <S.ShoppingCartItemsCount>{shoppingCartItemsCount}</S.ShoppingCartItemsCount>
                </S.ShoppingCartLinkMobile>
              </Link>

              <S.Entry>
                <Image src={UserIcon} />

                {isAuth ? (
                  <Link href={ROUTE_NAMES.ACCOUNT_PERSONAL_INFO} passHref>
                    <a>
                      <span>Личный кабинет</span>
                    </a>
                  </Link>
                ) : (
                  <>
                    <Link href={ROUTE_NAMES.SIGN_IN} passHref>
                      <a>
                        <span>Вход</span>
                      </a>
                    </Link>

                    <span>/</span>

                    <Link href={ROUTE_NAMES.SIGN_UP} passHref>
                      <a>
                        <span>Регистрация</span>
                      </a>
                    </Link>
                  </>
                )}
              </S.Entry>

              <S.EntryMobile>
                <Link
                  href={isAuth ? ROUTE_NAMES.ACCOUNT_PERSONAL_INFO : ROUTE_NAMES.SIGN_IN}
                  passHref
                >
                  <a>
                    <Image src={UserIcon} />
                  </a>
                </Link>
              </S.EntryMobile>
            </S.TopRight>
          </S.TopWrapper>
        </S.Top>

        <S.Bottom>
          <S.BottomWrapper>
            <S.CategoriesButton>
              <Image src={GridIcon} />
              <span>Все категории</span>
            </S.CategoriesButton>

            <S.Nav>
              <ul>{navItems}</ul>
            </S.Nav>

            {vinAutocomplete}

            <Link href={ROUTE_NAMES.SHOPPING_CART} passHref>
              <S.ShoppingCart>
                <Image src={ShoppingCartIcon} />
                <span>Корзина</span>
                <S.ShoppingCartItemsCount>{shoppingCartItemsCount}</S.ShoppingCartItemsCount>
              </S.ShoppingCart>
            </Link>
          </S.BottomWrapper>
        </S.Bottom>
      </S.Header>
    </FormProvider>
  )
}
