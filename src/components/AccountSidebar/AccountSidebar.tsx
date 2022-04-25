import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { ROUTE_NAMES } from 'core'
import { useAuth } from 'hooks'

import * as S from './AccountSidebar.styled'

import ProfileIcon from 'public/icons/profile.svg'
import CartIcon from 'public/icons/cart.svg'
import AddressIcon from 'public/icons/address.svg'
import CreditCardIcon from 'public/icons/credit-card.svg'
import ChatIcon from 'public/icons/chat-2.svg'
import LogoutIcon from 'public/icons/logout.svg'

export const AccountSidebar = () => {
  const { pathname } = useRouter()
  const { logout } = useAuth()

  const nav = [
    {
      label: 'Персональная информация',
      href: ROUTE_NAMES.ACCOUNT_PERSONAL_INFO,
      icon: <ProfileIcon />
    },
    {
      label: 'История заказов',
      href: ROUTE_NAMES.ACCOUNT_ORDER_HISTORY,
      icon: <CartIcon />
    },
    { label: 'Мои адреса', href: ROUTE_NAMES.ACCOUNT_ADDRESSES, icon: <AddressIcon /> },
    {
      label: 'Мои реквизиты',
      href: ROUTE_NAMES.ACCOUNT_REQUISITES,
      icon: <CreditCardIcon />
    },
    { label: 'Мои чаты', href: ROUTE_NAMES.ACCOUNT_CHATS, icon: <ChatIcon /> }
  ]

  const navLinkItems = nav.map(({ label, href, icon }) => {
    return (
      <S.LinkItem key={href} active={href === pathname}>
        <Link href={href} passHref>
          <a>
            {icon}
            <span>{label}</span>
          </a>
        </Link>
      </S.LinkItem>
    )
  })

  return (
    <S.AccountSidebar>
      <ul>
        {navLinkItems}

        <S.Divider />

        <S.LinkItem
          onClick={() => {
            logout()
          }}
        >
          <S.LogoutButton variant="text">
            <LogoutIcon />

            <span>Выйти</span>
          </S.LogoutButton>
        </S.LinkItem>
      </ul>
    </S.AccountSidebar>
  )
}
