import Link from 'next/link'

import { LocationChoose } from 'components'
import { SparePartSearch, HamburgerMenu, Phone, UserEntry } from '../../components'

import { ROUTE_NAMES } from 'core'
import { useAuth } from 'hooks'
import { NavItem } from '../../Header.types'

import * as S from './Top.styled'

import logo from 'public/img/logo.png'
import logoMobile from 'public/img/logo-mobile.png'
import logoGear from 'public/img/logo-gear.png'
import logoGearMobile from 'public/img/logo-gear-mobile.png'

import UserIcon from 'public/icons/user.svg'
import ShoppingCartIcon from 'public/icons/shopping-cart.svg'

interface HeaderTopProps {
  nav: NavItem[]
}

export const HeaderTop = ({ nav }: HeaderTopProps) => {
  const { isAuth } = useAuth()

  const shoppingCartItemsCount = 5

  return (
    <S.HeaderTop>
      <S.TopWrapper>
        <HamburgerMenu nav={nav} />

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

        <SparePartSearch />

        <S.TopRight>
          <LocationChoose />

          <Phone />

          <Link href={ROUTE_NAMES.SHOPPING_CART} passHref>
            <S.ShoppingCartLinkMobile>
              <ShoppingCartIcon />

              <S.ShoppingCartItemsCount>{shoppingCartItemsCount}</S.ShoppingCartItemsCount>
            </S.ShoppingCartLinkMobile>
          </Link>

          <UserEntry />

          <S.UserEntryMobile>
            <Link href={isAuth ? ROUTE_NAMES.ACCOUNT_PERSONAL_INFO : ROUTE_NAMES.SIGN_IN} passHref>
              <a>
                <UserIcon />
              </a>
            </Link>
          </S.UserEntryMobile>
        </S.TopRight>
      </S.TopWrapper>
    </S.HeaderTop>
  )
}
