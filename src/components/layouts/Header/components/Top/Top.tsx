import Link from 'next/link'
import Image from 'next/image'

import { LocationChoose } from 'components'
import { Skeleton } from 'ui'
import { SparePartSearch, HamburgerMenu, Phone, UserEntry } from '..'

import { ROUTE_NAMES } from 'core'
import { useAuth } from 'hooks'
import { NavItem } from '../../Header.types'
import { getRoleHomeRoutePath } from 'utils'

import * as S from './Top.styled'

import logo from 'public/img/logo/logo.png'
import logoMobile from 'public/img/logo/logo-mobile.png'
import logoGear from 'public/img/logo/logo-gear.png'
import logoGearMobile from 'public/img/logo/logo-gear-mobile.png'

import UserIcon from 'public/icons/user.svg'
import ShoppingCartIcon from 'public/icons/shopping-cart.svg'
import BellIcon from 'public/icons/bell.svg'

interface HeaderTopProps {
  nav: NavItem[]
}

export const HeaderTop = ({ nav }: HeaderTopProps) => {
  const { isAuth, isAccountLoading, user } = useAuth()

  const role = user?.role.title
  const shoppingCartItemsCount = 5

  return (
    <S.HeaderTop>
      <S.TopWrapper>
        <HamburgerMenu nav={nav} />

        <S.Logo>
          <Link href={ROUTE_NAMES.MAIN}>
            <a>
              <S.LogoImg>
                <Image
                  src={logo}
                  layout="fill"
                  // layout="fixed"
                  // width={147}
                  // height={40}
                  alt="oner"
                  priority
                  quality={100}
                />
              </S.LogoImg>

              <S.LogoImgMobile>
                <Image
                  src={logoMobile}
                  layout="fill"
                  // layout="fixed"
                  // width={85.5}
                  // height={23}
                  alt="oner"
                  priority
                  quality={100}
                />
              </S.LogoImgMobile>

              <S.LogoGear>
                <S.LogoGearImg>
                  <Image
                    src={logoGear}
                    layout="fill"
                    // layout="fixed"
                    // width={40}
                    // height={40}
                    alt="oner"
                    priority
                    quality={100}
                  />
                </S.LogoGearImg>

                <S.LogoGearImgMobile>
                  <Image
                    src={logoGearMobile}
                    layout="fill"
                    // layout="fixed"
                    // width={24}
                    // height={24}
                    alt="oner"
                    priority
                    quality={100}
                  />
                </S.LogoGearImgMobile>
              </S.LogoGear>
            </a>
          </Link>
        </S.Logo>

        <SparePartSearch />

        <S.TopRight>
          <LocationChoose />

          <Phone />

          {isAuth && (
            <S.Notifications>
              <BellIcon />
            </S.Notifications>
          )}

          <Link href={ROUTE_NAMES.SHOPPING_CART} passHref>
            <S.ShoppingCartLinkMobile>
              <ShoppingCartIcon />

              <S.ShoppingCartItemsCount>{shoppingCartItemsCount}</S.ShoppingCartItemsCount>
            </S.ShoppingCartLinkMobile>
          </Link>

          <UserEntry />

          {!isAccountLoading ? (
            <S.UserEntryMobile>
              <Link href={isAuth ? getRoleHomeRoutePath(role) : ROUTE_NAMES.SIGN_IN} passHref>
                <a>
                  <UserIcon />
                </a>
              </Link>
            </S.UserEntryMobile>
          ) : (
            <S.UserEntryMobile>
              <Skeleton width={24} height={24} />
            </S.UserEntryMobile>
          )}
        </S.TopRight>
      </S.TopWrapper>
    </S.HeaderTop>
  )
}
